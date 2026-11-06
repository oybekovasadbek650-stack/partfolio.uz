import { FaTelegramPlane } from 'react-icons/fa'
import { TELEGRAM_URL } from '../../data/projects'
import { useLang } from '../../i18n/LanguageContext'
import styles from './TelegramButton.module.scss'

// Har bir sahifaning pastki o'ng burchagida turadigan "Telegramda yozish" tugmasi
function TelegramButton() {
  const { t } = useLang()

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label={t('float.telegram')}
    >
      <span className={styles.icon}>
        <FaTelegramPlane aria-hidden="true" />
      </span>
      <span className={styles.label} aria-hidden="true">
        {t('float.telegram')}
      </span>
    </a>
  )
}

export default TelegramButton
