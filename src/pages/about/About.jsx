import { Link } from 'react-router-dom'
import { IoArrowForward, IoDownloadOutline } from 'react-icons/io5'
import diplomImg from '../../images/diplom.jpg'
import styles from './About.module.scss'

// Mening yo'lim — tartib bilan
const JOURNEY = [
  {
    title: "Sho'rchi, Surxondaryo",
    text: "Tug'ilib o'sgan joyim.",
  },
  {
    title: 'Toshkentga keldim',
    text: "O'qish maqsadida poytaxtga keldim.",
  },
  {
    title: "ProWeb o'quv markazi",
    text: "7 oylik frontend kursini a'lo darajada tamomlab, diplom ishini himoya qildim.",
  },
  {
    title: 'Hozir',
    text: "React, Next.js va SCSS bilan web-saytlar yaratyapman. Siz ko'rib turgan portfolio ham shu ishlarimdan biri.",
  },
]

const FACTS = [
  { label: 'Yoshim', value: '19' },
  { label: 'Asli', value: "Sho'rchi tumani, Surxondaryo" },
  { label: 'Hozir', value: 'Toshkent' },
  { label: "Ta'lim", value: 'ProWeb, 7 oylik frontend kursi' },
  { label: 'Tillar', value: "O'zbek, rus va ingliz (boshlang'ich)" },
  { label: "Yo'nalish", value: 'Front-end Developer' },
]

const DIPLOMA = [
  { label: "Yo'nalish", value: 'Frontend dasturlash' },
  { label: 'Davomiyligi', value: '56 dars (7 oy)' },
  { label: 'Natija', value: "A'lo" },
  { label: 'Berilgan sana', value: '25.09.2026' },
  { label: 'Diplom ID', value: '5395' },
]

function About() {
  return (
    <main className={styles.about}>
      <header className={styles.head}>
        <h1 className={styles.title}>Men haqimda</h1>
        <p className={styles.lead}>
          Salom! Men Asadbek, 19 yoshdaman. Asli Surxondaryo viloyatining Sho'rchi tumanidanman,
          hozir esa o'qish maqsadida Toshkentda yashayman. Eng katta qiziqishim web-saytlar
          yaratish.
        </p>
      </header>

      <div className={styles.grid}>
        <section>
          <h2 className={styles.sectionTitle}>Mening yo'lim</h2>
          <ol className={styles.timeline}>
            {JOURNEY.map((step) => (
              <li key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.card}>
          <h2 className={styles.sectionTitle}>Qisqacha</h2>
          <dl className={styles.facts}>
            {FACTS.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions}>
            <Link to="/skills" className={styles.primaryBtn}>
              Ko'nikmalarim <IoArrowForward aria-hidden="true" />
            </Link>
            <a href="/Asadbek_Oybekov_CV.pdf" download className={styles.secondaryBtn}>
              <IoDownloadOutline aria-hidden="true" /> CV yuklab olish
            </a>
          </div>
        </aside>
      </div>

      <section className={styles.diploma}>
        <h2 className={styles.sectionTitle}>Diplom</h2>
        <div className={styles.diplomaInner}>
          <a href={diplomImg} target="_blank" rel="noopener noreferrer" className={styles.diplomaImgLink}>
            <img
              src={diplomImg}
              alt="ProWeb o'quv markazi diplomi: Oybekov Asadbek, Frontend dasturlash"
              className={styles.diplomaImg}
              loading="lazy"
            />
          </a>
          <div>
            <h3 className={styles.diplomaTitle}>ProWeb o'quv markazi</h3>
            <p className={styles.diplomaText}>
              7 oylik <strong>"Frontend dasturlash"</strong> kursini a'lo darajada tamomlab,
              diplom ishini muvaffaqiyatli himoya qildim. Diplom ishi sifatida shu portfolio
              sayt va API bilan ishlaydigan React ilova yaratdim.
            </p>
            <dl className={styles.facts}>
              {DIPLOMA.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About