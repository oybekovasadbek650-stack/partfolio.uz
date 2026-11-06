import styles from './navbar.module.scss'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IoArrowForward, IoBagHandleOutline } from 'react-icons/io5'
import { useCart } from '../../context/CartContext'

const PAGES = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/shop', label: 'Shop' },
]

function Navbar() {
  const { count } = useCart()
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

  // Pill'ni faol havola ostiga joylash (sahifa, oyna o'lchami yoki shrift o'zgarsa)
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
  }, [pathname])

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
      <nav className={styles.bar} aria-label="Asosiy menyu">
        {/* Logo bosilsa bosh sahifaga qaytadi */}
        <Link to="/" className={styles.brand} aria-label="Asadbek Oybekov — bosh sahifa">
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
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Faqat telefondagi menyuda: aloqa tugmasi pastda */}
          <Link to="/contact" className={styles.menuCta}>
            Bog'lanish <IoArrowForward aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.extra}>
          {/* Savat ikonkasi — ustida mahsulotlar soni */}
          <NavLink
            to="/cart"
            className={({ isActive }) => `${styles.cart} ${isActive ? styles.cartActive : ''}`}
            aria-label={`Savat: ${count} ta mahsulot`}
          >
            <IoBagHandleOutline aria-hidden="true" />
            {count > 0 && <span className={styles.badge}>{count > 99 ? '99+' : count}</span>}
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `${styles.cta} ${isActive ? styles.ctaActive : ''}`}
          >
            Contact <IoArrowForward aria-hidden="true" className={styles.ctaIcon} />
          </NavLink>

          {/* Burger tugma — faqat telefonda ko'rinadi */}
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
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
