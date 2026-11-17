import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate } from 'framer-motion'
import Cursor from './Cursor'
import styles from './buildIntro.module.scss'

const EASE = [0.22, 1, 0.36, 1] // Cursor.jsx dagi bilan bir xil — rasm va kursor birga yuradi

// "Sayt o'zini o'zi quradi" intro animatsiyasi.
// Hero ichidagi [data-build] elementlar kursor yetib kelganda paydo bo'ladi,
// React kursori oxirida rasmni o'z joyiga sudrab olib keladi.

const STORAGE_KEY = 'buildIntroPlayed'

const CURSORS = [
  { key: 'html', label: 'HTML', color: '#3b82f6' },
  { key: 'scss', label: 'SCSS', color: '#38bdf8' },
  { key: 'js', label: 'JS', color: '#60a5fa' },
  { key: 'react', label: 'React', color: '#3b82f6' },
]

const FLIGHT = 0.8 // kursor uchish vaqti (s)
const STAGGER = 0.15 // kursorlar orasidagi farq (s)
const TO_IMAGE = 0.45 // React kursori tugmalardan rasmga borishi (s)
const DRAG = 0.6 // rasmni sudrash (s)
const REVEAL_MS = 350 // element paydo bo'lish vaqti
const WAIT_MAX_MS = 1000 // Hero'ning o'z kirish animatsiyasini kutish chegarasi
const SAFETY_MS = 4500 // nima bo'lsa ham shu vaqtda hammasi asl holatiga qaytadi

function shouldPlay() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return false
  }
}

// Element va ota-elementlaridagi tugaydigan (cheksiz bo'lmagan) animatsiyalarni kutadi,
// aks holda joy siljib turgan paytda o'lchanib qoladi
function waitForSettle(els) {
  const anims = []
  for (const el of els) {
    for (let node = el; node && node !== document.body; node = node.parentElement) {
      for (const a of node.getAnimations?.() ?? []) {
        if (Number.isFinite(a.effect?.getComputedTiming().endTime)) anims.push(a.finished.catch(() => {}))
      }
    }
  }
  const timeout = new Promise((resolve) => setTimeout(resolve, WAIT_MAX_MS))
  return Promise.race([Promise.all(anims), timeout])
}

// Guruhdagi eng katta element (status va h1 dan — h1) kursor nishoni bo'ladi
function targetPoint(els) {
  let best = null
  for (const el of els) {
    const r = el.getBoundingClientRect()
    if (!best || r.width * r.height > best.width * best.height) best = r
  }
  return { x: best.left + best.width / 2, y: best.top + best.height / 2 }
}

// Kursorlar ekranning turli chetlaridan uchib keladi
function startPoint(i) {
  const w = window.innerWidth
  const h = window.innerHeight
  return [
    { x: -60, y: h * 0.2 },
    { x: w + 60, y: h * 0.15 },
    { x: -60, y: h + 60 },
    { x: w + 60, y: h + 60 },
  ][i % 4]
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

// Rasmning boshlang'ich chetga surilishi: mobilda kichikroq, ekrandan chiqmaydi
function imageOffset(img) {
  const mobile = window.innerWidth <= 900
  const pad = 8
  const vw = document.documentElement.clientWidth
  const r = img.getBoundingClientRect()
  const s = ancestorShift(img)
  const left = r.left - s.x
  const right = r.right - s.x
  const minDx = pad - left
  const maxDx = vw - pad - right
  let dx = mobile ? -24 : -110
  dx = minDx > maxDx ? 0 : Math.min(Math.max(dx, minDx), maxDx)
  const dy = mobile ? 28 : 70
  return { dx, dy }
}

function clearStyles(els) {
  for (const el of els) {
    el.style.removeProperty('opacity')
    el.style.removeProperty('transition')
    el.style.removeProperty('transform')
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

    const groups = CURSORS.map((c) => ({
      ...c,
      els: [...document.querySelectorAll(`[data-build="${c.key}"]`)],
    })).filter((g) => g.els.length > 0)
    const img = document.querySelector('[data-build="image"]')
    if (groups.length === 0) return

    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // saqlab bo'lmasa ham animatsiya baribir bir marta o'ynaydi
    }

    const allEls = groups.flatMap((g) => g.els)
    touchedRef.current = img ? [...allEls, img] : allEls

    // Bo'yashdan oldin: elementlar yashiriladi, rasm chetga suriladi — miltillash bo'lmaydi
    for (const el of allEls) el.style.opacity = '0'
    const offset = img ? imageOffset(img) : null
    if (img) img.style.transform = `translateX(${offset.dx}px) translateY(${offset.dy}px)`

    let cancelled = false
    let dragAnim = null
    let remaining = groups.length

    const reveal = (els) => {
      for (const el of els) {
        el.style.transition = `opacity ${REVEAL_MS}ms ease`
        el.style.opacity = '1'
      }
    }
    const done = () => {
      remaining -= 1
      if (remaining === 0) setLeaving(true)
    }

    waitForSettle(img ? [allEls[0], img] : [allEls[0]]).then(() => {
      if (cancelled) return
      setCursors(
        groups.map((g, i) => {
          const steps = [
            {
              to: targetPoint(g.els),
              duration: FLIGHT,
              delay: i * STAGGER,
              onDone: () => reveal(g.els),
            },
          ]

          if (g.key === 'react' && img) {
            const r = img.getBoundingClientRect()
            const grab = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
            steps.push(
              { to: grab, duration: TO_IMAGE, delay: 0.1 },
              {
                to: { x: grab.x - offset.dx, y: grab.y - offset.dy },
                duration: DRAG,
                delay: 0.1,
                // Rasm kursor bilan bir xil vaqt va egri chiziqda harakatlanadi
                onStart: () => {
                  dragAnim = animate(
                    img,
                    { x: [offset.dx, 0], y: [offset.dy, 0] },
                    { duration: DRAG, ease: EASE },
                  )
                },
              },
            )
          }

          // Kursor yo'lini tugatgach "tayyor" deb belgilanadi
          const last = steps[steps.length - 1]
          const lastDone = last.onDone
          last.onDone = () => {
            lastDone?.()
            done()
          }
          return { key: g.key, label: g.label, color: g.color, from: startPoint(i), steps }
        }),
      )
    })

    // Xavfsizlik: hech narsa yashirin yoki surilgan holda qolib ketmaydi
    const safety = setTimeout(() => {
      dragAnim?.stop()
      clearStyles(touchedRef.current)
      setLeaving(true)
    }, SAFETY_MS)

    return () => {
      cancelled = true
      clearTimeout(safety)
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
            <Cursor key={c.key} label={c.label} color={c.color} from={c.from} steps={c.steps} />
          ))}
      </AnimatePresence>
    </div>,
    document.body,
  )
}

export default BuildIntro
