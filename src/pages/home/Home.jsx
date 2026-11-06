import { Link } from 'react-router-dom'
import { IoArrowForward, IoDownloadOutline } from 'react-icons/io5'
import asadImg from '../../images/asad.webp'
import styles from './Home.module.scss'

// Saytning asosiy bo'limlariga tez o'tish
const SECTIONS = [
  { to: '/skills', title: "Ko'nikmalar", text: 'Qaysi texnologiyalar bilan ishlayman' },
  { to: '/projects', title: 'Loyihalar', text: 'Men yaratgan saytlar va ilovalar' },
  { to: '/shop', title: "Demo do'kon", text: "API, qidiruv, filtr va mahsulot sahifasi" },
]

function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.text}>
          <p className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            Ishga ochiqman
          </p>
          <h1 className={styles.name}>Asadbek Oybekov</h1>
          <p className={styles.role}>Front-end Developer</p>

          <p className={styles.intro}>
            React va Next.js bilan tez ishlaydigan, har qanday ekranga moslashadigan
            web-saytlar yarataman. Toshkentdaman, Junior Front-end lavozimida jamoaga
            qo'shilishga tayyorman.
          </p>

          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryBtn}>
              Loyihalarni ko'rish <IoArrowForward aria-hidden="true" />
            </Link>
            <a href="/Asadbek_Oybekov_CV.pdf" download className={styles.secondaryBtn}>
              <IoDownloadOutline aria-hidden="true" /> CV yuklab olish
            </a>
          </div>
        </div>

        <div className={styles.photoWrap}>
          <div className={styles.frame}>
            <img src={asadImg} alt="Asadbek Oybekov" className={styles.photo} />
          </div>
        </div>
      </section>

      <section className={styles.sections}>
        <h2 className={styles.sectionsTitle}>Saytda nimalar bor</h2>
        <ul className={styles.list}>
          {SECTIONS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className={styles.row}>
                <span className={styles.rowTitle}>{item.title}</span>
                <span className={styles.rowText}>{item.text}</span>
                <IoArrowForward className={styles.rowArrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home