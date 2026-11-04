import { Link, useLocation } from 'react-router-dom'
import { FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { IoMail, IoArrowForward } from 'react-icons/io5'
import logo from '../../images/SVG/logo.svg'
import styles from './footer.module.scss'

const PAGES = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
]

// ⬇️ Ijtimoiy tarmoqlar — kerak bo'lsa qo'shing yoki o'zgartiring
const SOCIALS = [
  { label: 'Telegram', href: 'https://t.me/oybekovasadbek', icon: FaTelegramPlane },
  { label: 'GitHub', href: 'https://github.com/oybekovasadbek650-stack', icon: FaGithub },
  { label: 'Email', href: 'mailto:oybekovasadbek650@gmail.com', icon: IoMail },
]

function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Contact sahifasining o'zida bu chaqiriq ko'rinmaydi */}
        {pathname !== '/contact' && (
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Birga ishlaymizmi?</h2>
            <Link to="/contact" className={styles.ctaBtn}>
              Bog'lanish <IoArrowForward aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className={styles.main}>
          <div className={styles.brand}>
            <Link to="/" aria-label="Bosh sahifa">
              <img src={logo} alt="A.DEV logo" className={styles.logo} />
            </Link>
            <div>
              <p className={styles.name}>Asadbek Oybekov</p>
              <p className={styles.role}>Front-end Developer, Toshkent</p>
            </div>
          </div>

          <nav aria-label="Pastki menyu">
            <ul className={styles.links}>
              {PAGES.map((page) => (
                <li key={page.to}>
                  <Link to={page.to} className={styles.link}>{page.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.socials}>
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} className={styles.social} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <span>© {year} Asadbek Oybekov</span>
          <span>React va SCSS bilan yaratilgan</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer