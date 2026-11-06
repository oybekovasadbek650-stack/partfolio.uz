import styles from './navbar.module.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IoArrowForward, IoBagHandleOutline } from 'react-icons/io5'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../i18n/LanguageContext'
import { LangMenu, LangSegments, ThemeToggle } from './Settings'
import { PAGES } from '../../data/navigation'


function Navbar() {
  const { count } = useCart()
  const { t, lang } = useLang()
  const { pathname } = useLocation()
  // Telefondagi menyu ochiqmi
  const [open, setOpen] = useState(false)
  // Pastga aylantirilganda navbar yashirinadi, tepaga aylantirilganda qaytadi
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Faol sahifa ostidagi oltin "pill" qayerda turishi
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false })
  const listRef = useRef(null)

  // Boshqa sahifaga o'tilganda menyu yopiladi
  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  // Menyu ochiq paytda: Escape bilan yopish va orqadagi sahifa surilmasligi
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Scroll yo'nalishini kuzatish
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      if (Math.abs(y - lastY) < 6) return
      setHidden(y > lastY && y > 120)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pill'ni faol havola ostiga joylash (sahifa, til, oyna o'lchami yoki shrift o'zgarsa)
  useLayoutEffect(() => {
    const place = () => {
      const active = listRef.current?.querySelector('[aria-current="page"]')
      if (!active) {
        setPill((p) => ({ ...p, visible: false }))
        return
      }
      setPill({ left: active.offsetLeft, width: active.offsetWidth, visible: true })
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [pathname, lang])

  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.linkActive : ''}`

  const navClass = [
    styles.navbar,
    open && styles.open,
    hidden && !open && styles.hidden,
    scrolled && styles.scrolled,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={navClass}>
      <nav className={styles.bar} aria-label={t('nav.mainMenu')}>
        {/* Logo bosilsa bosh sahifaga qaytadi */}
        <Link to="/" className={styles.brand} aria-label={t('nav.homeLabel')}>
          <img src="/favicon.svg" alt="" className={styles.brandMark} />
          <span className={styles.brandName}>Asadbek</span>
        </Link>

        {/* Kompyuterda o'rtada qator, telefonda to'liq ekranli menyu */}
        <div className={styles.pages} id="nav-menu">
          <ul className={styles.list} ref={listRef}>
            <span
              className={styles.pill}
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
              aria-hidden="true"
            />
            {PAGES.map((page, i) => (
              <li key={page.to} style={{ '--i': i }}>
                <NavLink to={page.to} className={linkClass}>
                  {t(`nav.${page.key}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Faqat telefondagi menyuda: til, rejim va aloqa tugmasi pastda */}
          <div className={styles.menuBottom}>
            <div className={styles.menuSettings}>
              <LangSegments />
              <ThemeToggle className={styles.menuTheme} />
            </div>
            <Link to="/contact" className={styles.menuCta}>
              {t('nav.contact')} <IoArrowForward aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.extra}>
          {/* Kompyuterda: til va rejim */}
          <div className={styles.settings}>
            <LangMenu />
            <ThemeToggle />
          </div>

          {/* Savat ikonkasi — ustida mahsulotlar soni */}
          <NavLink
            to="/cart"
            className={({ isActive }) => `${styles.cart} ${isActive ? styles.cartActive : ''}`}
            aria-label={t('nav.cart', { count })}
          >
            <IoBagHandleOutline aria-hidden="true" />
            {count > 0 && <span className={styles.badge}>{count > 99 ? '99+' : count}</span>}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `${styles.cta} ${isActive ? styles.ctaActive : ''}`}
          >
            {t('nav.contact')} <IoArrowForward aria-hidden="true" className={styles.ctaIcon} />
          </NavLink>

          {/* Burger tugma — faqat telefonda ko'rinadi */}
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
