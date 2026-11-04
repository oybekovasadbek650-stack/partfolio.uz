import { useState } from 'react'
import { FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { IoMail, IoLocationSharp, IoCheckmarkCircle } from 'react-icons/io5'
import styles from './Contact.module.scss'

// ⬇️ O'zingizning ma'lumotlaringizni shu yerga yozing
const CONTACTS = [
  { icon: FaTelegramPlane, label: 'Telegram', value: '@oybekovasadbek', href: 'https://t.me/oybekovasadbek' },
  { icon: IoMail, label: 'Email', value: 'oybekovasadbek650@gmail.com', href: 'mailto:email@example.com' },
  { icon: FaGithub, label: 'GitHub', value: 'oybekovasadbek650-stack', href: 'https://github.com/oybekovasadbek650-stack' },
  { icon: IoLocationSharp, label: 'Manzil', value: "Toshkent, O'zbekiston" },
]

const EMPTY_FORM = { name: '', contact: '', message: '', company: '' }

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Ismingizni yozing'
  if (!form.contact.trim()) errors.contact = 'Email yoki Telegram username yozing'
  if (form.message.trim().length < 10) errors.message = "Xabar kamida 10 ta belgidan iborat bo'lsin"
  return errors
}

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') 

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error)

      setStatus('success')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className={styles.contact}>
      <div className={styles.inner}>
        <section className={styles.intro}>
          <h1 className={styles.title}>Bog'lanish</h1>
          <p className={styles.lead}>
            Loyiha, hamkorlik yoki savolingiz bo'lsa, yozib qoldiring.
            Xabaringiz to'g'ridan-to'g'ri Telegramimga keladi.
          </p>

          <ul className={styles.links}>
            {CONTACTS.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className={styles.icon}><Icon aria-hidden="true" /></span>
                  <span className={styles.linkText}>
                    <span className={styles.linkLabel}>{label}</span>
                    <span className={styles.linkValue}>{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className={styles.link} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div className={styles.link}>{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className={styles.card}>
          {status === 'success' ? (
            <div className={styles.success} role="status">
              <IoCheckmarkCircle className={styles.successIcon} aria-hidden="true" />
              <h2>Xabaringiz yuborildi</h2>
              <p>Rahmat! Tez orada siz qoldirgan manzil orqali javob beraman.</p>
              <button type="button" className={styles.secondaryBtn} onClick={() => setStatus('idle')}>
                Yana xabar yozish
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <h2 className={styles.formTitle}>Xabar yozing</h2>

              <div className={styles.field}>
                <label htmlFor="contact-name">Ism</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Ismingiz"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className={errors.name ? styles.invalid : ''}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-contact">Email yoki Telegram</label>
                <input
                  id="contact-contact"
                  name="contact"
                  type="text"
                  placeholder="@username yoki email"
                  value={form.contact}
                  onChange={handleChange}
                  aria-invalid={!!errors.contact}
                  className={errors.contact ? styles.invalid : ''}
                />
                {errors.contact && <span className={styles.error}>{errors.contact}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">Xabar</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Nima haqida gaplashmoqchisiz?"
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  className={errors.message ? styles.invalid : ''}
                />
                {errors.message && <span className={styles.error}>{errors.message}</span>}
              </div>

              {/* Spam-botlar uchun tuzoq — odamlarga ko'rinmaydi */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className={styles.honeypot}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {status === 'error' && (
                <p className={styles.formError} role="alert">
                  Xabar yuborilmadi. Birozdan keyin qayta urinib ko'ring yoki Telegram orqali yozing.
                </p>
              )}

              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

export default Contact