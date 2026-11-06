import { Link } from 'react-router-dom'
import { IoArrowForward, IoDownloadOutline } from 'react-icons/io5'
import asadImg from '../../images/asad.webp'
import Counter from '../../components/counter/Counter'
import { projects } from '../../data/projects'
import { TESTIMONIALS } from '../../data/testimonials'
import { SKILL_COUNT } from '../../data/skills'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Home.module.scss'

// Saytning asosiy bo'limlariga tez o'tish
const SECTIONS = [
  { to: '/services', key: 'services' },
  { to: '/projects', key: 'projects' },
  { to: '/blog', key: 'blog' },
  { to: '/shop', key: 'shop' },
]

// Raqamlar bloki: loyihalar va ko'nikmalar soni o'zi hisoblanadi
const STATS = [
  { value: projects.length, key: 'projects' },
  { value: SKILL_COUNT, key: 'tech' },
  { value: 7, key: 'months' },
  { value: 56, key: 'lessons' },
]

function Home() {
  const { t, tr } = useLang()

  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.text}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            {t('home.status')}
          </p>
          <h1 className={styles.name}>Asadbek Oybekov</h1>
          <p className={styles.role}>{t('home.role')}</p>

          <p className={styles.intro}>{t('home.intro')}</p>

          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryBtn}>
              {t('common.viewProjects')} <IoArrowForward aria-hidden="true" />
            </Link>
            <a href="/Asadbek_Oybekov_CV.pdf" download className={styles.secondaryBtn}>
              <IoDownloadOutline aria-hidden="true" /> {t('common.downloadCv')}
            </a>
          </div>
        </div>

        <div className={styles.photoWrap}>
          <div className={styles.frame}>
            <img src={asadImg} alt="Asadbek Oybekov" className={styles.photo} />
          </div>
        </div>
      </section>

      <section className={styles.stats} aria-labelledby="stats-title">
        <h2 id="stats-title" className={styles.visuallyHidden}>{t('home.stats.title')}</h2>
        <ul className={styles.statsList}>
          {STATS.map((s) => (
            <li key={s.key} className={styles.stat}>
              <span className={styles.statValue}>
                <Counter value={s.value} suffix={s.key === 'projects' || s.key === 'tech' ? '+' : ''} />
              </span>
              <span className={styles.statLabel}>{t(`home.stats.${s.key}`)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.sections}>
        <h2 className={styles.sectionsTitle}>{t('home.sectionsTitle')}</h2>
        <ul className={styles.list}>
          {SECTIONS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={styles.row}>
                <span className={styles.rowTitle}>{t(`home.sections.${item.key}.title`)}</span>
                <span className={styles.rowText}>{t(`home.sections.${item.key}.text`)}</span>
                <IoArrowForward className={styles.rowArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Fikrlar faqat src/data/testimonials.js da kamida bittasi bo'lsa ko'rinadi */}
      {TESTIMONIALS.length > 0 && (
        <section className={styles.testimonials} aria-labelledby="testimonials-title">
          <h2 id="testimonials-title" className={styles.sectionsTitle}>{t('home.testimonialsTitle')}</h2>
          <ul className={styles.quotes}>
            {TESTIMONIALS.map((item) => (
              <li key={item.name} className={styles.quote}>
                <blockquote className={styles.quoteText}>“{tr(item.text)}”</blockquote>
                <div className={styles.quoteAuthor}>
                  <span className={styles.avatar} aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.quoteName}>
                        {item.name}
                      </a>
                    ) : (
                      <span className={styles.quoteName}>{item.name}</span>
                    )}
                    <span className={styles.quoteRole}>{tr(item.role)}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default Home
