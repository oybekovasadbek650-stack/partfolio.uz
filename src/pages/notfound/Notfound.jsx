import { Link, useLocation } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Notfound.module.scss'

function Notfound() {
  const { pathname } = useLocation()
  const { t } = useLang()

  return (
    <main className={styles.notfound}>
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 className={styles.title}>{t('notfound.title')}</h1>
      <p className={styles.text}>
        {t('notfound.before')}
        <code className={styles.path}>{pathname}</code>
        {t('notfound.after')}
      </p>

      <div className={styles.actions}>
        <Link to="/" className={styles.primaryBtn}>
          <IoArrowBack aria-hidden="true" /> {t('notfound.home')}
        </Link>
        <Link to="/projects" className={styles.secondaryBtn}>
          {t('notfound.projects')}
        </Link>
      </div>
    </main>
  )
}

export default Notfound
