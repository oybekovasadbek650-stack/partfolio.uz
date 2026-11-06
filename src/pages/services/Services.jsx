import { Link } from 'react-router-dom'
import { IoArrowForward, IoCheckmark, IoTimeOutline, IoAdd } from 'react-icons/io5'
import { SERVICES, FAQ } from '../../data/services'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Services.module.scss'

function Services() {
  const { t, tr, lang } = useLang()
  // Narx: "$100 dan" (uz) yoki "от $100" (ru) / "from $100" (en)
  const price = (value) => (lang === 'uz' ? `$${value} ${t('services.from')}` : `${t('services.from')} $${value}`)

  return (
    <main className={styles.services}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t('services.title')}</h1>
        <p className={styles.lead}>{t('services.lead')}</p>
      </header>

      <ul className={styles.grid}>
        {SERVICES.map(({ id, icon: Icon, ...s }) => (
          <li key={id} className={styles.card}>
            <span className={styles.icon}>
              <Icon aria-hidden="true" />
            </span>
            <h2 className={styles.cardTitle}>{tr(s.title)}</h2>
            <p className={styles.cardText}>{tr(s.text)}</p>

            <ul className={styles.includes}>
              {s.includes.map((item) => (
                <li key={item.uz}>
                  <IoCheckmark aria-hidden="true" /> {tr(item)}
                </li>
              ))}
            </ul>

            <div className={styles.cardFoot}>
              <div>
                <p className={styles.price}>{price(s.price)}</p>
                <p className={styles.time}>
                  <IoTimeOutline aria-hidden="true" /> {t('services.time')}: {tr(s.time)}
                </p>
              </div>
              {/* Aloqa formasiga xizmat nomi oldindan yozilgan holda o'tadi */}
              <Link to={`/contact?service=${id}`} className={styles.orderBtn}>
                {t('services.order')} <IoArrowForward aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <section className={styles.section} aria-labelledby="process-title">
        <h2 id="process-title" className={styles.sectionTitle}>{t('services.processTitle')}</h2>
        <ol className={styles.process}>
          {t('services.process').map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.sectionTitle}>{t('services.faqTitle')}</h2>
        <div className={styles.faq}>
          {FAQ.map((item) => (
            <details key={item.q.uz} className={styles.faqItem}>
              <summary className={styles.faqQ}>
                {tr(item.q)}
                <IoAdd className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <p className={styles.faqA}>{tr(item.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <h2 className={styles.ctaTitle}>{t('services.ctaTitle')}</h2>
          <p className={styles.ctaText}>{t('services.ctaText')}</p>
        </div>
        <Link to="/contact" className={styles.ctaBtn}>
          {t('common.contact')} <IoArrowForward aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}

export default Services
