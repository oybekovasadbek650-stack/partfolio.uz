import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { IoArrowForward, IoChevronBack, IoChevronDown, IoChevronForward, IoOpenOutline } from 'react-icons/io5'
import Gallery from './Gallery'
import styles from './Projects.module.scss'

// src/images/projects/ ichidagi barcha papkalardagi rasmlarni avtomatik yuklaydi.
// Har bir loyiha uchun bitta papka: masalan src/images/projects/weather/1.png, 2.png ...
// Rasmlar nomi bo'yicha tartiblanadi (1, 2, 3 ...), birinchisi asosiy rasm bo'ladi.
const imageFiles = import.meta.glob('../../images/projects/*/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

function imagesFor(folder) {
  return Object.keys(imageFiles)
    .filter((path) => path.split('/').at(-2) === folder)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((path) => imageFiles[path])
}

// ⬇️ Yangi loyiha qo'shish uchun:
//   1) src/images/projects/ ichida yangi papka oching (masalan "weather") va rasmlarni tashlang
//   2) shu ro'yxatga yana bitta { ... } qo'shing va folder: 'weather' deb yozing
const PROJECTS = [
  {
    title: 'Shaxsiy portfolio',
    description:
      "Siz hozir ko'rib turgan sayt. Ichida API bilan ishlaydigan demo do'kon, mahsulot sahifasi va Telegramga xabar yuboradigan aloqa formasi bor.",
    features: [
      'Qidiruv, kategoriya va sahifalash',
      'Mahsulot sahifasi: rasmlar, reyting, sharhlar',
      'Telegram bot orqali ishlaydigan forma',
      'Har qanday ekranga moslashuv',
    ],
    tech: ['React', 'React Router', 'SCSS', 'Vite', 'Vercel'],
    folder: 'portfolio',
    live: { to: '/shop', label: "Demo do'konni ko'rish" },
    github: 'https://github.com/oybekovasadbek650-stack/partfolio.uz',
  },
  {
    title: 'Algora',
    description:
      "Sun'iy intellekt asosidagi talaba yordamchisi g'oyasini taqdim etish uchun yaratilgan interaktiv prezentatsiya sayti. PowerPoint o'rniga brauzerda ochiladigan, scroll bilan boshqariladigan 9 ta slayd.",
    features: [
      'Sahifa aylantirilganda oldinga-orqaga yuradigan video fon',
      'Canvas bilan chizilgan jonli fon, animatsion grafik va raqamlar',
      "Klaviatura bilan boshqarish: strelkalar, 1–9, F — to'liq ekran, P — PDF",
      "Ma'ruza rejimi va slaydlar bo'yicha progress ko'rsatkichi",
    ],
    tech: ['React', 'Vite', 'Canvas API', 'CSS', 'Vercel'],
    folder: 'algora',
    live: { href: 'https://tajriba-six.vercel.app/', label: 'Saytni ochish' },
    github: 'https://github.com/oybekovasadbek650-stack/tajriba',
  },
  {
    title: 'Eslatmalar',
    description:
      "Eslatmalarni yozish, tahrirlash va o'chirish mumkin bo'lgan qulay ilova. Ma'lumotlar brauzerda saqlanadi, sahifani yangilasangiz ham yo'qolmaydi.",
    features: [
      "Eslatma qo'shish, tahrirlash va o'chirish",
      "Jadval va ro'yxat ko'rinishi o'rtasida almashish",
      'Eslatmalar bo\'yicha qidiruv',
      "Ikki til: o'zbekcha va ruscha",
    ],
    tech: ['React', 'CSS', 'LocalStorage', 'Vite', 'Vercel'],
    folder: 'eslatma',
    live: { href: 'https://todolist-rouge-two.vercel.app/', label: 'Saytni ochish' },
    github: null,
  },
  {
    title: 'Toychi.uz',
    description:
      "Onlayn to'y taklifnomasi. Mehmon muhrni bosib taklifnomani ochadi, to'ygacha qolgan vaqtni ko'radi va kelish-kelmasligini shu yerning o'zida tasdiqlaydi.",
    features: [
      'Muhrni bosib ochiladigan animatsion taklifnoma',
      "To'ygacha qolgan kun, soat, daqiqa va soniya hisoblagichi",
      'Juftlikning suratlari galereyasi',
      'Kelishni tasdiqlash formasi va fon musiqasi',
    ],
    tech: ['React', 'CSS', 'Vite', 'Vercel'],
    folder: 'toychi.uz',
    live: { href: 'https://toychi-uz.vercel.app/', label: 'Saytni ochish' },
    github: 'https://github.com/oybekovasadbek650-stack/toychi_uz',
  },
  {
    title: 'Where the Sky Begins',
    description:
      "Tog'lar mavzusidagi landing sahifa: katta hero rasm, toza tipografiya va qulay navigatsiya.",
    features: [
      'Til tanlash (EN)',
      "Yorug' va qorong'u rejim",
      "About, Catalog va Contacts bo'limlari",
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    folder: 'mountain',
    live: { href: 'https://oybekovasadbek650-stack.github.io/GITHUPGA-YANGGILIK-/', label: 'Saytni ochish' },
    github: 'https://github.com/oybekovasadbek650-stack/GITHUPGA-YANGGILIK-',
  },
  {
    title: 'Cinemas',
    description:
      "Film va seriallar tomosha qilish platformasi uchun landing sahifa: katta hero banner, filmlar katalogi va kolleksiyalar.",
    features: [
      "Filmlar, seriallar, multfilmlar va kolleksiyalar bo'limlari",
      'Hero bannerda "Watch now" va "Download" tugmalari',
      'Marvel, Star Wars kabi franshiza kolleksiyalari',
      'Google Play va App Store havolalari',
    ],
    tech: ['HTML', 'CSS', 'Vercel'],
    folder: 'cinemas',
    live: { href: 'https://sinemas-lovat.vercel.app/', label: 'Saytni ochish' },
    github: 'https://github.com/oybekovasadbek650-stack/uy-ishi',
  },
  {
    title: 'dBurger',
    description:
      "Burgerxona uchun onlayn buyurtma sahifasi: mahsulotlarni savatchaga qo'shish va umumiy narxni hisoblash.",
    features: [
      'Mahsulot kartochkalari narxlari bilan',
      "Savatchaga qo'shish va mahsulot sonini ko'rsatish",
      'Umumiy narxni avtomatik hisoblash',
      'Telefon ekraniga moslashuv',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    folder: 'burger',
    live: { href: 'https://d-burger-kohl.vercel.app/', label: 'Saytni ochish' },
    github: null,
  },
  {
    title: 'November',
    description:
      "Yaqin inson uchun maxsus tayyorlangan sovg'a-sayt. Ichkariga faqat 4 ta savolga to'g'ri javob bergan odam kira oladi, keyin uni musiqa va maxfiy xat kutib turadi.",
    features: [
      "4 ta savoldan iborat \"maxfiy kirish\" va progress ko'rsatkichi",
      'Aylanadigan vinil plastinkali musiqa pleyeri',
      'Bosganda ochiladigan animatsion xat',
      'Uchib yuruvchi yuraklar va yulduzli fon animatsiyasi',
    ],
    tech: ['React', 'CSS', 'Vite', 'Vercel'],
    folder: 'novermber',
    live: { href: 'https://november-3.vercel.app/', label: 'Saytni ochish' },
    github: 'https://github.com/oybekovasadbek650-stack/november-3',
  },
]

function LiveButton({ live }) {
  if (live.to) {
    return (
      <Link to={live.to} className={styles.primaryBtn}>
        {live.label} <IoArrowForward aria-hidden="true" />
      </Link>
    )
  }
  return (
    <a href={live.href} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
      {live.label} <IoOpenOutline aria-hidden="true" />
    </a>
  )
}

// Har bir loyiha kamida necha millisekund ko'rinib turadi (7000 = 7 soniya)
const AUTOPLAY_MS = 7000
// Loyiha ichidagi har bir rasm necha millisekund ko'rinadi
const IMAGE_MS = 2500

// Har bir loyihaning rasmlari (bir marta hisoblanadi)
const PROJECT_IMAGES = PROJECTS.map((p) => imagesFor(p.folder))

// Loyiha barcha rasmlari ko'rsatib bo'linguncha ekranda turadi
const durationFor = (i) => Math.max(AUTOPLAY_MS, PROJECT_IMAGES[i].length * IMAGE_MS)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Projects() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  // Telefonda "Batafsil" ochilgan loyiha (null = hammasi yopiq)
  const [expanded, setExpanded] = useState(null)
  const touchX = useRef(null)
  const count = PROJECTS.length

  // Boshqa loyihaga o'tganda ochiq "Batafsil" yopiladi
  const go = (step) => {
    setExpanded(null)
    setIndex((i) => (i + step + count) % count)
  }
  const goTo = (i) => {
    setExpanded(null)
    setIndex(i)
  }

  const autoplay = !prefersReducedMotion
  // O'qiyotgan paytda ("Batafsil" ochiq) loyiha o'zi almashib ketmaydi
  const paused = hovered || focused || touched || expanded !== null

  const onTouchStart = (e) => {
    setTouched(true)
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(diff) > 50) go(diff < 0 ? 1 : -1)
    }
    touchX.current = null
    // Telefonda tegingandan keyin bir oz kutib, keyin yana o'zi aylanadi
    setTimeout(() => setTouched(false), 4000)
  }

  return (
    <main className={styles.projects}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>Loyihalar</h1>
          <p className={styles.lead}>
            O'zim yaratgan saytlar. Har birini ochib ko'rishingiz yoki GitHub'da kodini
            o'qishingiz mumkin.
          </p>
        </div>

        <div className={styles.navControls}>
          <span className={styles.slideCounter}>
            <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(count).padStart(2, '0')}
          </span>
          <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label="Oldingi loyiha">
            <IoChevronBack aria-hidden="true" />
          </button>
          <button type="button" className={styles.navBtn} onClick={() => go(1)} aria-label="Keyingi loyiha">
            <IoChevronForward aria-hidden="true" />
          </button>
        </div>
      </header>

      <section
        className={styles.carousel}
        aria-roledescription="carousel"
        aria-label="Loyihalar"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
        tabIndex={0}
      >
        <div className={styles.slides} style={{ transform: `translateX(-${index * 100}%)` }}>
        {PROJECTS.map((project, i) => (
          <article
            key={project.title}
            className={styles.card}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}: ${project.title}`}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className={styles.preview}>
              <div className={styles.browserBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Gallery
                images={PROJECT_IMAGES[i]}
                title={project.title}
                active={i === index}
                autoplay={autoplay && !paused}
                interval={IMAGE_MS}
              />
            </div>

            <div className={expanded === i ? `${styles.body} ${styles.bodyOpen}` : styles.body}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <p className={styles.description}>{project.description}</p>

              <ul className={styles.features} id={`features-${i}`}>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              {/* Faqat telefonda ko'rinadi: to'liq matn va imkoniyatlarni ochib-yopadi */}
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() => setExpanded((e) => (e === i ? null : i))}
                aria-expanded={expanded === i}
                aria-controls={`features-${i}`}
              >
                {expanded === i ? 'Yopish' : 'Batafsil'} <IoChevronDown aria-hidden="true" />
              </button>

              <ul className={styles.tech} aria-label="Texnologiyalar">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className={styles.actions}>
                <LiveButton live={project.live} />
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn} aria-label="GitHub">
                    <FaGithub aria-hidden="true" /> <span className={styles.btnText}>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
        </div>
      </section>

      <div className={styles.carouselFooter}>
        <div className={styles.projectDots}>
          {PROJECTS.map((project, i) => (
            <button
              key={project.title}
              type="button"
              className={i === index ? styles.projectDotActive : styles.projectDot}
              onClick={() => goTo(i)}
              aria-label={`${project.title} loyihasiga o'tish`}
              aria-current={i === index}
            />
          ))}
        </div>

        {autoplay && (
          <div className={styles.progress} aria-hidden="true">
            {/* Chiziq to'lib bo'lganda keyingi loyihaga o'tadi. key o'zgarsa animatsiya qaytadan boshlanadi */}
            <span
              key={index}
              className={styles.progressBar}
              style={{
                animationDuration: `${durationFor(index)}ms`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onAnimationEnd={() => go(1)}
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default Projects