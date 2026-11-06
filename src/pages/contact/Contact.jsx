import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaTelegramPlane, FaGithub } from 'react-icons/fa'
import { IoMail, IoLocationSharp, IoCheckmarkCircle } from 'react-icons/io5'
import { SERVICES } from '../../data/services'
import { TELEGRAM_URL } from '../../data/projects'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Contact.module.scss'

// ⬇️ O'zingizning ma'lumotlaringizni shu yerga yozing
const CONTACTS = [
  { icon: FaTelegramPlane, label: 'Telegram', value: '@oybekovasadbek', href: TELEGRAM_URL },
  { icon: IoMail, label: 'Email', value: 'oybekovasadbek650@gmail.com', href: 'mailto:oybekovasadbek650@gmail.com' },
  { icon: FaGithub, label: 'GitHub', value: 'oybekovasadbek650-stack', href: 'https://github.com/oybekovasadbek650-stack' },
  { icon: IoLocationSharp, labelKey: 'contact.address', valueKey: 'contact.addressValue' },
]

const EMPTY_FORM = { name: '', contact: '', message: '', company: '' }

// Xatolar matn emas, kalit sifatida saqlanadi — til almashsa ham to'g'ri ko'rinadi
function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'contact.errName'
  if (!form.contact.trim()) errors.contact = 'contact.errContact'
  if (form.message.trim().length < 10) errors.message = 'contact.errMessage'
  return errors
}

function Contact() {
  const { t, tr } = useLang()
  const [searchParams] = useSearchParams()
  // Xizmatlar sahifasidan kelinsa (/contact?service=landing), xabar oldindan yozib qo'yiladi
  const [form, setForm] = useState(() => {
    const service = SERVICES.find((s) => s.id === searchParams.get('service'))
    return service ? { ...EMPTY_FORM, message: t('services.prefill', { service: tr(service.title) }) } : EMPTY_FORM
  })
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
          <h1 className={styles.title}>{t('contact.title')}</h1>
          <p className={styles.lead}>{t('contact.lead')}</p>

          <ul className={styles.links}>
            {CONTACTS.map(({ icon: Icon, label: rawLabel, value: rawValue, labelKey, valueKey, href }) => {
              const label = labelKey ? t(labelKey) : rawLabel
              const value = valueKey ? t(valueKey) : rawValue
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
                <li key={rawLabel ?? labelKey}>
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
              <h2>{t('contact.successTitle')}</h2>
              <p>{t('contact.successText')}</p>
              <button type="button" className={styles.secondaryBtn} onClick={() => setStatus('idle')}>
                {t('contact.again')}
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <h2 className={styles.formTitle}>{t('contact.formTitle')}</h2>

              <div className={styles.field}>
                <label htmlFor="contact-name">{t('contact.name')}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder={t('contact.namePh')}
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className={errors.name ? styles.invalid : ''}
                />
                {errors.name && <span className={styles.error}>{t(errors.name)}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-contact">{t('contact.contactLabel')}</label>
                <input
                  id="contact-contact"
                  name="contact"
                  type="text"
                  placeholder={t('contact.contactPh')}
                  value={form.contact}
                  onChange={handleChange}
                  aria-invalid={!!errors.contact}
                  className={errors.contact ? styles.invalid : ''}
                />
                {errors.contact && <span className={styles.error}>{t(errors.contact)}</span>}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message">{t('contact.message')}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder={t('contact.messagePh')}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  className={errors.message ? styles.invalid : ''}
                />
                {errors.message && <span className={styles.error}>{t(errors.message)}</span>}
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
                  {t('contact.sendError')}
                </p>
              )}

              <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                {status === 'sending' ? t('common.sending') : t('contact.send')}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}

export default Contact