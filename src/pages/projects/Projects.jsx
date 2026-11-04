import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { IoArrowForward, IoOpenOutline } from 'react-icons/io5'
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
    github: null, // GitHub havolasi bo'lsa shu yerga yozing
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
    github: null,
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
    github: null,
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

function Projects() {
  return (
    <main className={styles.projects}>
      <header className={styles.head}>
        <h1 className={styles.title}>Loyihalar</h1>
        <p className={styles.lead}>
          O'zim yaratgan saytlar. Har birini ochib ko'rishingiz yoki GitHub'da kodini
          o'qishingiz mumkin.
        </p>
      </header>

      <div className={styles.list}>
        {PROJECTS.map((project) => (
          <article key={project.title} className={styles.card}>
            <div className={styles.preview}>
              <div className={styles.browserBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Gallery images={imagesFor(project.folder)} title={project.title} />
            </div>

            <div className={styles.body}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <p className={styles.description}>{project.description}</p>

              <ul className={styles.features}>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <ul className={styles.tech} aria-label="Texnologiyalar">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className={styles.actions}>
                <LiveButton live={project.live} />
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                    <FaGithub aria-hidden="true" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Projects