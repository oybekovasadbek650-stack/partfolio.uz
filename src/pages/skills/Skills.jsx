import { Link } from 'react-router-dom'
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiReactrouter, SiNextdotjs,
  SiGit, SiGithub, SiVite, SiVercel, SiSass,
} from 'react-icons/si'
import { IoArrowForward } from 'react-icons/io5'
import logo from '../../images/SVG/logo.svg'
import { useLang } from '../../i18n/LanguageContext'
import { GROUPS } from '../../data/skills'
import styles from './Skills.module.scss'

// ⬇️ Ko'nikmalar ro'yxati — src/data/skills.js

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
  const { t } = useLang()
  const groupText = t('skills.groups')

  return (
    <main className={styles.skills}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>{t('skills.title')}</h1>
          <p className={styles.lead}>{t('skills.lead')}</p>
        </div>
        <Orbit />
      </header>

      <div className={styles.grid}>
        {GROUPS.map((group, gi) => (
          <section key={gi} className={styles.card}>
            <h2 className={styles.cardTitle}>{groupText[gi]?.title}</h2>
            <p className={styles.cardText}>{groupText[gi]?.text}</p>
            <ul className={styles.list}>
              {group.skills.map(({ name, icon: Icon }) => (
                <li key={name} className={styles.skill}>
                  <Icon className={styles.icon} aria-hidden="true" />
                  <span>{name === 'responsive' ? t('skills.responsive') : name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className={styles.cta}>
        <p>{t('skills.cta')}</p>
        <Link to="/projects" className={styles.ctaBtn}>
          {t('common.viewProjects')} <IoArrowForward aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}

export default Skills