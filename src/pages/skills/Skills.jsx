import { Link } from 'react-router-dom'
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiReactrouter, SiNextdotjs,
  SiSass, SiGit, SiGithub, SiVite, SiVercel,
} from 'react-icons/si'
import { IoPhonePortraitOutline, IoCodeSlashOutline, IoArrowForward } from 'react-icons/io5'
import logo from '../../images/SVG/logo.svg'
import styles from './Skills.module.scss'

// ⬇️ Ko'nikmalarni shu yerdan qo'shish yoki o'chirish mumkin
const GROUPS = [
  {
    title: 'Asos',
    text: "Har bir sahifa shu uchtasidan boshlanadi.",
    skills: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'JavaScript', icon: SiJavascript },
    ],
  },
  {
    title: 'React ekotizimi',
    text: 'Komponentlar, sahifalar va ular orasida yurish.',
    skills: [
      { name: 'React', icon: SiReact },
      { name: 'React Router', icon: SiReactrouter },
      { name: 'Next.js', icon: SiNextdotjs },
    ],
  },
  {
    title: 'Stil va dizayn',
    text: 'Toza stillar va har qanday ekranga moslashuv.',
    skills: [
      { name: 'SCSS / Sass', icon: SiSass },
      { name: 'CSS Modules', icon: IoCodeSlashOutline },
      { name: 'Responsive dizayn', icon: IoPhonePortraitOutline },
    ],
  },
  {
    title: 'Asboblar',
    text: "Kod yozish, saqlash va internetga chiqarish.",
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vite', icon: SiVite },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
]

// Aylanadigan ikonkalar: ichki va tashqi halqa
const ORBIT_INNER = [SiHtml5, SiCss, SiJavascript, SiSass]
const ORBIT_OUTER = [SiReact, SiNextdotjs, SiReactrouter, SiGit, SiGithub, SiVite, SiVercel]

function Ring({ icons, className }) {
  return (
    <div className={`${styles.ring} ${className}`}>
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={styles.orbitItem}
          style={{ '--angle': `${(360 / icons.length) * i}deg` }}
        >
          <span className={styles.orbitIcon}>
            <Icon />
          </span>
        </span>
      ))}
    </div>
  )
}

function Orbit() {
  return (
    <div className={styles.orbit} aria-hidden="true">
      <div className={styles.orbitCenter}>
        <img src={logo} alt="" />
      </div>
      <Ring icons={ORBIT_INNER} className={styles.ringInner} />
      <Ring icons={ORBIT_OUTER} className={styles.ringOuter} />
    </div>
  )
}

function Skills() {
  return (
    <main className={styles.skills}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>Ko'nikmalar</h1>
          <p className={styles.lead}>
            Ish jarayonida foydalanadigan texnologiyalarim. Ko'pchiligi shu saytning
            o'zida ishlatilgan.
          </p>
        </div>
        <Orbit />
      </header>

      <div className={styles.grid}>
        {GROUPS.map((group) => (
          <section key={group.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{group.title}</h2>
            <p className={styles.cardText}>{group.text}</p>
            <ul className={styles.list}>
              {group.skills.map(({ name, icon: Icon }) => (
                <li key={name} className={styles.skill}>
                  <Icon className={styles.icon} aria-hidden="true" />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={styles.cta}>
        <p>Bu ko'nikmalar amalda qanday ishlashini loyihalarimda ko'ring.</p>
        <Link to="/projects" className={styles.ctaBtn}>
          Loyihalarni ko'rish <IoArrowForward aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}

export default Skills