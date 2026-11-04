import styles from './navbar.module.scss'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IoPaperPlaneOutline, IoBagHandleOutline } from 'react-icons/io5'
import { useCart } from '../../context/CartContext'
import logo from '../../images/SVG/logo.svg'

const PAGES = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/shop', label: 'Shop' },
]

function Navbar() {
  const { count } = useCart()
  const { pathname } = useLocation()
  // Telefondagi burger-menyu ochiqmi
  const [open, setOpen] = useState(false)

  // Boshqa sahifaga o'tilganda menyu yopiladi
  useEffect(() => {
    setOpen(false)
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

  // Hozirgi sahifa havolasi oltin rangda ko'rinadi
  const linkClass = ({ isActive }) =>
    `${styles.navbar__pages_link} ${isActive ? styles.navbar__pages_link_active : ''}`

  const ctaClass = ({ isActive }) =>
    `${styles.navbar__cta} ${isActive ? styles.navbar__cta_active : ''}`

  const cartClass = ({ isActive }) =>
    `${styles.navbar__cart} ${isActive ? styles.navbar__cart_active : ''}`

  return (
    <nav className={`${styles.navbar} ${open ? styles.navbar_open : ''}`}>
      <div className={styles.navbar__logo}>
        {/* Logo bosilsa bosh sahifaga qaytadi */}
        <Link to="/" aria-label="Bosh sahifa">
          <img src={logo} alt="A.DEV logo" className={styles.navbar__logo_img} />
        </Link>
      </div>

      {/* Kompyuterda o'rtada qator, telefonda burger bosilganda ochiladigan panel */}
      <div className={styles.navbar__pages} id="nav-menu">
        <ul className={styles.navbar__pages_item}>
          {PAGES.map((page) => (
            <li key={page.to}>
              <NavLink to={page.to} className={linkClass}>
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* O'ng tomondagi Contact tugmasi */}
      <div className={styles.navbar__extra}>
        {/* Savat ikonkasi — ustida mahsulotlar soni */}
        <NavLink to="/cart" className={cartClass} aria-label={`Savat: ${count} ta mahsulot`}>
          <IoBagHandleOutline aria-hidden="true" />
          {count > 0 && <span className={styles.navbar__badge}>{count > 99 ? '99+' : count}</span>}
        </NavLink>
        <NavLink to="/contact" className={ctaClass} aria-label="Contact">
          <IoPaperPlaneOutline className={styles.navbar__cta_icon} aria-hidden="true" />
          <span className={styles.navbar__cta_text}>Contact</span>
        </NavLink>

        {/* Burger tugma — faqat telefonda ko'rinadi */}
        <button
          type="button"
          className={styles.navbar__burger}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Menyuni yopish' : 'Menyuni ochish'}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menyu ochiq paytda orqa fonni bosish uni yopadi */}
      {open && <div className={styles.navbar__backdrop} onClick={() => setOpen(false)} aria-hidden="true" />}
    </nav>
  )
}

export default Navbar
