import { Link, useLocation } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import styles from './Notfound.module.scss'

function Notfound() {
  const { pathname } = useLocation()

  return (
    <main className={styles.notfound}>
      <p className={styles.code} aria-hidden="true">404</p>
      <h1 className={styles.title}>Sahifa topilmadi</h1>
      <p className={styles.text}>
        <code className={styles.path}>{pathname}</code> manzilida hech narsa yo'q. Balki manzil
        xato yozilgandir yoki sahifa boshqa joyga ko'chirilgan.
      </p>

      <div className={styles.actions}>
        <Link to="/" className={styles.primaryBtn}>
          <IoArrowBack aria-hidden="true" /> Bosh sahifaga qaytish
        </Link>
        <Link to="/projects" className={styles.secondaryBtn}>
          Loyihalar
        </Link>
      </div>
    </main>
  )
}

export default Notfound