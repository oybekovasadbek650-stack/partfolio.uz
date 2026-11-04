import { Link } from 'react-router-dom'
import { IoArrowForward } from 'react-icons/io5'
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
          <h1 className={styles.name}>Asadbek Oybekov</h1>
          <p className={styles.role}>Front-end Developer</p>

          <p className={styles.intro}>
           Hozirda Toshkent shahrida yashayman! 
          </p>

          <div className={styles.actions}>
            <Link to="/projects" className={styles.primaryBtn}>
              Loyihalarni ko'rish <IoArrowForward aria-hidden="true" />
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Bog'lanish
            </Link>
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