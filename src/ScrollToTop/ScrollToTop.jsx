import { useState, useEffect } from 'react'
import { IoArrowUp } from 'react-icons/io5'
import { useLang } from '../i18n/LanguageContext'
import styles from './ScrollToTop.module.scss'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <button
      type="button"
      className={styles.scrollBtn}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('float.scrollTop')}
    >
      <IoArrowUp />
    </button>
  )
}

export default ScrollToTop
