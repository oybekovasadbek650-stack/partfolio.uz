import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoAdd, IoRemove, IoClose, IoBagHandleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { useCart } from '../../context/CartContext'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Cart.module.scss'

const EMPTY_FORM = { name: '', phone: '', company: '' }

function Cart() {
  const { items, setQty, removeItem, clear, count, total } = useCart()
  const { t } = useLang()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const found = {}
    if (form.name.trim().length < 2) found.name = 'cart.errName'
    if (form.phone.replace(/\D/g, '').length < 9) found.phone = 'cart.errPhone'
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error)

      setStatus('success')
      setForm(EMPTY_FORM)
      clear()
    } catch {
      setStatus('error')
    }
  }

  // Buyurtma muvaffaqiyatli yuborilganda
  if (status === 'success') {
    return (
      <main className={styles.cart}>
        <div className={styles.state} role="status">
          <IoCheckmarkCircle className={styles.stateIconGold} aria-hidden="true" />
          <h1>{t('cart.successTitle')}</h1>
          <p>{t('cart.successText')}</p>
          <Link to="/shop" className={styles.primaryBtn}>{t('cart.backToShop')}</Link>
        </div>
      </main>
    )
  }

  // Savat bo'sh bo'lsa
  if (items.length === 0) {
    return (
      <main className={styles.cart}>
        <div className={styles.state}>
          <IoBagHandleOutline className={styles.stateIcon} aria-hidden="true" />
          <h1>{t('cart.emptyTitle')}</h1>
          <p>{t('cart.emptyText')}</p>
          <Link to="/shop" className={styles.primaryBtn}>{t('cart.toShop')}</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.cart}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t('cart.title')}</h1>
        <button type="button" className={styles.clearBtn} onClick={clear}>
          {t('cart.clear')}
        </button>
      </header>

      <div className={styles.grid}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <Link to={`/shop/${item.id}`} className={styles.thumb}>
                <img src={item.thumbnail} alt={item.title} />
              </Link>

              <div className={styles.info}>
                <Link to={`/shop/${item.id}`} className={styles.itemTitle}>{item.title}</Link>
                <span className={styles.unitPrice}>${item.price} {t('cart.perUnit')}</span>
              </div>

              <div className={styles.qty}>
                <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label={t('cart.decrease')}>
                  <IoRemove />
                </button>
                <span aria-live="polite">{item.qty}</span>
                <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label={t('cart.increase')}>
                  <IoAdd />
                </button>
              </div>

              <span className={styles.lineTotal}>${(item.price * item.qty).toFixed(2)}</span>

              <button type="button" className={styles.remove} onClick={() => removeItem(item.id)} aria-label={t('cart.remove', { title: item.title })}>
                <IoClose />
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>{t('cart.summary')}</h2>

          <div className={styles.row}>
            <span>{t('cart.items')}</span>
            <span>{t('cart.pcs', { n: count })}</span>
          </div>
          <div className={`${styles.row} ${styles.totalRow}`}>
            <span>{t('cart.total')}</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="order-name">{t('cart.name')}</label>
              <input
                id="order-name"
                name="name"
                type="text"
                placeholder={t('cart.namePh')}
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                className={errors.name ? styles.invalid : ''}
              />
              {errors.name && <span className={styles.error}>{t(errors.name)}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="order-phone">{t('cart.phone')}</label>
              <input
                id="order-phone"
                name="phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                className={errors.phone ? styles.invalid : ''}
              />
              {errors.phone && <span className={styles.error}>{t(errors.phone)}</span>}
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
                {t('cart.sendError')}
              </p>
            )}

            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? t('common.sending') : t('cart.submit')}
            </button>
          </form>

          <p className={styles.note}>{t('cart.note')}</p>
        </aside>
      </div>
    </main>
  )
}

export default Cart