import styles from './navbar.module.scss'
import { Link, NavLink } from 'react-router-dom'
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

  // Hozirgi sahifa havolasi oltin rangda ko'rinadi
  const linkClass = ({ isActive }) =>
    `${styles.navbar__pages_link} ${isActive ? styles.navbar__pages_link_active : ''}`

  const ctaClass = ({ isActive }) =>
    `${styles.navbar__cta} ${isActive ? styles.navbar__cta_active : ''}`

  const cartClass = ({ isActive }) =>
    `${styles.navbar__cart} ${isActive ? styles.navbar__cart_active : ''}`

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        {/* Logo bosilsa bosh sahifaga qaytadi */}
        <Link to="/" aria-label="Bosh sahifa">
          <img src={logo} alt="A.DEV logo" className={styles.navbar__logo_img} />
        </Link>
      </div>

      <div className={styles.navbar__pages}>
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
      </div>
    </nav>
  )
}

export default Navbar