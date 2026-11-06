import { useEffect, useRef, useState } from 'react'
import { IoMoonOutline, IoSunnyOutline, IoChevronDown, IoCheckmark } from 'react-icons/io5'
import { useTheme } from '../../context/ThemeContext'
import { LANGUAGES, useLang } from '../../i18n/LanguageContext'
import styles from './navbar.module.scss'

// Qorong'i / yorug' rejim tugmasi
export function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const { t } = useLang()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`${styles.iconBtn} ${className}`}
      onClick={toggle}
      aria-label={isDark ? t('nav.toLight') : t('nav.toDark')}
      title={isDark ? t('nav.toLight') : t('nav.toDark')}
    >
      {isDark ? <IoSunnyOutline aria-hidden="true" /> : <IoMoonOutline aria-hidden="true" />}
    </button>
  )
}

// Kompyuterda: "UZ ▾" tugmasi, bosilganda tillar ro'yxati ochiladi
export function LangMenu() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGUAGES.find((l) => l.code === lang)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.langMenu} ref={ref}>
      <button
        type="button"
        className={styles.langBtn}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${current.name}`}
      >
        {current.label}
        <IoChevronDown aria-hidden="true" className={styles.langChevron} />
      </button>

      {open && (
        <ul className={styles.langList}>
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                className={`${styles.langOption} ${l.code === lang ? styles.langOptionActive : ''}`}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
                aria-current={l.code === lang}
              >
                <span>{l.name}</span>
                {l.code === lang && <IoCheckmark aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Telefon menyusida: uchta til yonma-yon
export function LangSegments() {
  const { lang, setLang, t } = useLang()

  return (
    <div className={styles.langSegments} role="group" aria-label={t('nav.language')}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className={l.code === lang ? styles.segmentActive : styles.segment}
          onClick={() => setLang(l.code)}
          aria-pressed={l.code === lang}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
