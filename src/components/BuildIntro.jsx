import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate } from 'framer-motion'
import Cursor from './Cursor'
import styles from './buildIntro.module.scss'

// "Sayt o'zini o'zi quradi" intro animatsiyasi.
// 1) Kursorlar ekran markazida doira bo'ylab aylanadi.
// 2) Tarqalib, birinchi ekrandagi har bir [data-build] elementni bittalab quradi.
// 3) Bir nechta kursor rasmni o'z joyiga sudrab olib keladi.

// ===== Barcha vaqt va sozlamalar shu yerda (soniyalarda) =====
const BUILD_CONFIG = {
  circleDuration: 2, // 0–2 s: doira
  buildDuration: 4, // 2–6 s: qurish (rasmni sudrash ham shu ichida)
  flightDuration: 0.6, // kursorning bitta elementga uchishi
  revealDuration: 0.35, // element paydo bo'lishi
  dragDuration: 0.7, // rasmni sudrash
  exitDuration: 0.3, // kursorlar yo'qolishi
  cursorCount: { desktop: 20, mobile: 10 },
  mobileBreakpoint: 768, // shundan kichik ekran — mobil
  dragOffset: { desktop: { x: -110, y: 70 }, mobile: { x: -20, y: 24 } },
  safetyExtra: 1.5, // xavfsizlik = circle + build + exit + safetyExtra
  labels: ['HTML', 'SCSS', 'JS', 'React', 'Git', 'Responsive'],
  colors: ['#3b82f6', '#38bdf8', '#60a5fa'],
}

const STORAGE_KEY = 'buildIntroPlayed'
const EASE = [0.22, 1, 0.36, 1]
const HOLD = 0.15 // kursor elementga yetgach biroz turib qoladi
const GRAB_PAUSE = 0.1 // rasmni "ushlash" pauzasi

// Qurilish tartibi: avval navbar kapsulasi, oxirida rasm
const BUILD_ORDER = [
  'shell', 'logo', 'link', 'settings', 'cart', 'cta', 'burger',
  'status', 'title', 'role', 'intro', 'button', 'telegram', 'image',
]

// Faqat sayt to'g'ridan-to'g'ri bosh sahifada ochilganda o'ynaydi
// (boshqa sahifadan o'tilganda ko'rinib turgan navbar to'satdan yo'qolmasligi uchun)
const IS_INITIAL_HOME = typeof window !== 'undefined' && window.location.pathname === '/'
let playedThisLoad = false

function shouldPlay() {
  if (!IS_INITIAL_HOME || playedThisLoad) return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return false
  }
}

// Birinchi ekranda haqiqatan ko'rinib turgan element — boshqalariga umuman tegilmaydi
function isOnScreen(el) {
  const r = el.getBoundingClientRect()
  if (r.width < 1 || r.height < 1) return false
  if (r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth) return false
  return getComputedStyle(el).visibility !== 'hidden'
}

function collectItems() {
  return [...document.querySelectorAll('[data-build]')]
    .map((el, dom) => ({ el, type: el.dataset.build, dom }))
    .filter((it) => BUILD_ORDER.includes(it.type) && isOnScreen(it.el))
    .sort((a, b) => BUILD_ORDER.indexOf(a.type) - BUILD_ORDER.indexOf(b.type) || a.dom - b.dom)
}

// Ota-elementlarning hozirgi (CSS animatsiya) siljishi — rasmning asl joyini hisoblash uchun
function ancestorShift(el) {
  let x = 0
  let y = 0
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const t = getComputedStyle(node).transform
    if (t && t !== 'none') {
      const m = new DOMMatrixReadOnly(t)
      x += m.m41
      y += m.m42
    }
  }
  return { x, y }
}

// Rasmning boshlang'ich surilishi — gorizontal bo'yicha ekrandan chiqmaydi
function imageOffset(img, mobile) {
  const base = mobile ? BUILD_CONFIG.dragOffset.mobile : BUILD_CONFIG.dragOffset.desktop
  const pad = 8
  const vw = document.documentElement.clientWidth
  const r = img.getBoundingClientRect()
  const s = ancestorShift(img)
  const minDx = pad - (r.left - s.x)
  const maxDx = vw - pad - (r.right - s.x)
  const dx = minDx > maxDx ? 0 : Math.min(Math.max(base.x, minDx), maxDx)
  return { dx, dy: base.y }
}

// Har bir elementga nechta kursor: kamida 1, rasmga 3 (mobilda 2),
// ortiqcha kursorlar avval h1 ga (3 tagacha), keyin kattaroq elementlarga, qolgani rasmga
function cursorCounts(items, total, mobile) {
  const counts = items.map(() => 1)
  const imgIdx = items.findIndex((it) => it.type === 'image')
  const titleIdx = items.findIndex((it) => it.type === 'title')
  if (imgIdx >= 0) counts[imgIdx] = mobile ? 2 : 3

  let spare = total - counts.reduce((a, b) => a + b, 0)
  while (spare > 0 && titleIdx >= 0 && counts[titleIdx] < 3) {
    counts[titleIdx]++
    spare--
  }
  const area = (it) => {
    const r = it.el.getBoundingClientRect()
    return r.width * r.height
  }
  const others = items
    .map((it, i) => i)
    .filter((i) => i !== imgIdx && i !== titleIdx && items[i].type !== 'shell')
    .sort((a, b) => area(items[b]) - area(items[a]))
  for (const i of others) {
    if (spare <= 0) break
    counts[i]++
    spare--
  }
  if (spare > 0 && imgIdx >= 0) counts[imgIdx] += spare
  return counts
}

// Element ustida k ta kursor uchun nuqtalar
function spreadPoints(rect, k, isImage) {
  if (isImage) {
    const grid = [[0.3, 0.3], [0.7, 0.36], [0.5, 0.72], [0.24, 0.66], [0.76, 0.74], [0.5, 0.18]]
    return Array.from({ length: k }, (_, j) => {
      const [fx, fy] = grid[j % grid.length]
      return { x: rect.left + rect.width * fx, y: rect.top + rect.height * fy }
    })
  }
  return Array.from({ length: k }, (_, j) => ({
    x: rect.left + (rect.width * (j + 1)) / (k + 1),
    y: rect.top + rect.height / 2,
  }))
}

// 0–circleDuration: markazdan chiqib doira bo'ylab bir marta aylanish
function circleStep(i, n, center, radius) {
  const K = 24
  const expand = 0.15
  const a0 = (2 * Math.PI * i) / n - Math.PI / 2
  const xs = [center.x]
  const ys = [center.y]
  const times = [0]
  for (let k = 0; k <= K; k++) {
    const a = a0 + (2 * Math.PI * k) / K
    xs.push(center.x + radius * Math.cos(a))
    ys.push(center.y + radius * Math.sin(a))
    times.push(expand + ((1 - expand) * k) / K)
  }
  return {
    start: 0,
    values: { x: xs, y: ys, opacity: [0, 1] },
    transition: {
      duration: BUILD_CONFIG.circleDuration,
      ease: 'linear',
      times,
      opacity: { duration: 0.3 },
    },
  }
}

function hide(el) {
  el.style.transition = 'none'
  el.style.opacity = '0'
}

function reveal(el) {
  el.style.transition = `opacity ${BUILD_CONFIG.revealDuration}s ease`
  el.style.opacity = '1'
}

function clearStyles(els) {
  for (const el of els) {
    el.style.removeProperty('opacity')
    el.style.removeProperty('transition')
    el.style.removeProperty('transform')
    // Bo'sh style="" ham qolmasin — element aynan asl holatiga qaytadi
    if (el.getAttribute('style') === '') el.removeAttribute('style')
  }
}

function BuildIntro() {
  const [play] = useState(shouldPlay)
  const [cursors, setCursors] = useState(null)
  const [leaving, setLeaving] = useState(false)
  const [finished, setFinished] = useState(false)
  const touchedRef = useRef([])

  useLayoutEffect(() => {
    if (!play) return

    const items = collectItems()
    if (items.length === 0) return

    playedThisLoad = true
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // saqlab bo'lmasa ham bu yuklanishda faqat bir marta o'ynaydi
    }

    const cfg = BUILD_CONFIG
    const mobile = window.innerWidth < cfg.mobileBreakpoint
    const total = mobile ? cfg.cursorCount.mobile : cfg.cursorCount.desktop
    const imgItem = items.find((it) => it.type === 'image')
    const offset = imgItem ? imageOffset(imgItem.el, mobile) : null

    // Bo'yashdan oldin: hammasi yashiriladi, rasm chetga suriladi — miltillash bo'lmaydi
    touchedRef.current = items.map((it) => it.el)
    for (const it of items) hide(it.el)
    if (imgItem) imgItem.el.style.transform = `translateX(${offset.dx}px) translateY(${offset.dy}px)`

    const timers = []
    let dragAnim = null
    let done = false

    // Yakun: hamma narsa ko'rinadi, kursorlar yo'qoladi
    const leave = () => {
      if (done) return
      done = true
      for (const it of items) reveal(it.el)
      setLeaving(true)
    }

    // ===== 1-bosqich: doira =====
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const radius = Math.min(window.innerWidth, window.innerHeight) * (mobile ? 0.3 : 0.22)
    const circleOrigin = performance.now()
    const base = Array.from({ length: total }, (_, i) => ({
      id: i,
      label: cfg.labels[i % cfg.labels.length],
      color: cfg.colors[i % cfg.colors.length],
      from: center,
    }))
    setCursors(base.map((c, i) => ({ ...c, plan: { origin: circleOrigin, steps: [circleStep(i, total, center, radius)] } })))

    // ===== 2-bosqich: qurish (joylar shu paytda o'lchanadi — Hero'ning CSS kirish animatsiyalari tugagan) =====
    const startBuild = () => {
      const origin = performance.now()
      const F = cfg.flightDuration
      const counts = cursorCounts(items, total, mobile)
      const pool = base.map(() => ({ freeAt: 0, used: false, steps: [] }))

      // Kerakli vaqtda yetib bora oladigan kursorlar: avval hali ishlamaganlari, keyin eng erta bo'shaganlari
      const pick = (t, k) =>
        pool
          .map((c, i) => ({ c, i }))
          .sort(
            (a, b) =>
              (a.c.freeAt <= t - F ? 0 : 1) - (b.c.freeAt <= t - F ? 0 : 1) ||
              Number(a.c.used) - Number(b.c.used) ||
              a.c.freeAt - b.c.freeAt,
          )
          .slice(0, k)
          .map(({ c }) => c)

      const flyTo = (c, t, point, onDone) => {
        const start = Math.max(c.freeAt, t - F)
        c.steps.push({ start, values: { x: point.x, y: point.y }, transition: { duration: F, ease: EASE }, onDone })
        c.used = true
        c.freeAt = start + F + HOLD
        return start + F
      }

      const rest = items.filter((it) => it !== imgItem)
      const tImg = cfg.buildDuration - cfg.dragDuration - GRAB_PAUSE
      const lastArrival = (imgItem ? tImg : cfg.buildDuration) - 0.3
      const span = Math.max(0, lastArrival - F)
      let end = 0

      rest.forEach((it, i) => {
        const t = F + (rest.length > 1 ? (span * i) / (rest.length - 1) : 0)
        const k = counts[items.indexOf(it)]
        const points = spreadPoints(it.el.getBoundingClientRect(), k, false)
        pick(t, k).forEach((c, j) => {
          const arrival = flyTo(c, t, points[j], j === 0 ? () => reveal(it.el) : undefined)
          end = Math.max(end, arrival + cfg.revealDuration)
        })
      })

      if (imgItem) {
        const k = counts[items.indexOf(imgItem)]
        const grabs = spreadPoints(imgItem.el.getBoundingClientRect(), k, true)
        const chosen = pick(tImg, k)
        const arrivals = chosen.map((c, j) => flyTo(c, tImg, grabs[j], j === 0 ? () => reveal(imgItem.el) : undefined))
        const dragStart = Math.max(...arrivals) + GRAB_PAUSE
        // Rasm va kursorlar bir xil vaqt va egri chiziqda birga harakatlanadi
        chosen.forEach((c, j) => {
          c.steps.push({
            start: dragStart,
            values: { x: grabs[j].x - offset.dx, y: grabs[j].y - offset.dy },
            transition: { duration: cfg.dragDuration, ease: EASE },
            onStart:
              j === 0
                ? () => {
                    dragAnim = animate(
                      imgItem.el,
                      { x: [offset.dx, 0], y: [offset.dy, 0] },
                      { duration: cfg.dragDuration, ease: EASE },
                    )
                  }
                : undefined,
          })
        })
        end = Math.max(end, dragStart + cfg.dragDuration)
      }

      setCursors(base.map((c, i) => ({ ...c, plan: { origin, steps: pool[i].steps } })))
      timers.push(setTimeout(leave, Math.max(end, cfg.buildDuration) * 1000))
    }
    timers.push(setTimeout(startBuild, cfg.circleDuration * 1000))

    // Xavfsizlik: hech narsa yashirin yoki surilgan holda qolib ketmaydi
    const safetyMs = (cfg.circleDuration + cfg.buildDuration + cfg.exitDuration + cfg.safetyExtra) * 1000
    timers.push(
      setTimeout(() => {
        dragAnim?.stop()
        clearStyles(touchedRef.current)
        done = true
        setLeaving(true)
      }, safetyMs),
    )

    return () => {
      for (const id of timers) clearTimeout(id)
      dragAnim?.stop()
      clearStyles(touchedRef.current)
    }
  }, [play])

  // Kursorlar yo'qolgach inline stillar butunlay olib tashlanadi — sayt aynan asl holatiga qaytadi
  const handleExitComplete = useCallback(() => {
    clearStyles(touchedRef.current)
    setFinished(true)
  }, [])

  if (!play || finished || !cursors) return null

  return createPortal(
    <div className={styles.layer} aria-hidden="true">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!leaving &&
          cursors.map((c) => (
            <Cursor
              key={c.id}
              label={c.label}
              color={c.color}
              from={c.from}
              plan={c.plan}
              exitDuration={BUILD_CONFIG.exitDuration}
            />
          ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

export default BuildIntro
