import { Link } from 'react-router-dom'
import { IoArrowForward, IoDownloadOutline } from 'react-icons/io5'
import diplomImg from '../../images/diplom.jpg'
import { useLang } from '../../i18n/LanguageContext'
import styles from './About.module.scss'

// ⬇️ Matnlar (yo'lim, qisqacha, diplom) — src/i18n/translations.js dagi "about" bo'limida
function About() {
  const { t } = useLang()

  return (
    <main className={styles.about}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t('about.title')}</h1>
        <p className={styles.lead}>{t('about.lead')}</p>
      </header>

      <div className={styles.grid}>
        <section>
          <h2 className={styles.sectionTitle}>{t('about.journeyTitle')}</h2>
          <ol className={styles.timeline}>
            {t('about.journey').map((step) => (
              <li key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.card}>
          <h2 className={styles.sectionTitle}>{t('about.summaryTitle')}</h2>
          <dl className={styles.facts}>
            {t('about.facts').map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions}>
            <Link to="/skills" className={styles.primaryBtn}>
              {t('about.skillsBtn')} <IoArrowForward aria-hidden="true" />
            </Link>
            <a href="/Asadbek_Oybekov_CV.pdf" download className={styles.secondaryBtn}>
              <IoDownloadOutline aria-hidden="true" /> {t('common.downloadCv')}
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.diploma}>
        <h2 className={styles.sectionTitle}>{t('about.diplomaTitle')}</h2>
        <div className={styles.diplomaInner}>
          <a href={diplomImg} target="_blank" rel="noopener noreferrer" className={styles.diplomaImgLink}>
            <img src={diplomImg} alt={t('about.diplomaAlt')} className={styles.diplomaImg} loading="lazy" />
          </a>
          <div>
            <h3 className={styles.diplomaTitle}>{t('about.diplomaSchool')}</h3>
            <p className={styles.diplomaText}>
              {t('about.diplomaBefore')}
              <strong>{t('about.diplomaCourse')}</strong>
              {t('about.diplomaAfter')}
            </p>
            <dl className={styles.facts}>
              {t('about.diploma').map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
