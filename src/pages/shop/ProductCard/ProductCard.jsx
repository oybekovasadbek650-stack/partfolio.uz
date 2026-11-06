import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../../context/CartContext'
import { useLang } from '../../../i18n/LanguageContext'
import styles from './ProductCard.module.scss'

function ProductCard({ id, img, title, price }) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { t } = useLang()

  const handleAdd = () => {
    addItem({ id, title, price, thumbnail: img })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={img} alt={title} className={styles.img} loading="lazy" />
      </div>
      <h3 className={styles.title}>
        {/* Link butun kartochkani bosiladigan qiladi (CSS ::after orqali) */}
        <Link to={`/shop/${id}`} className={styles.link}>
          {title}
        </Link>
      </h3>
      <p className={styles.price}>${price}</p>
      <button
        type="button"
        className={`${styles.addBtn} ${added ? styles.added : ''}`}
        onClick={handleAdd}
        disabled={added}
      >
        {added ? t('shop.added') : t('shop.add')}
      </button>
    </div>
  )
}

export default ProductCard