import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { IoArrowBack, IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'
import { getProductById } from '../../../api/api'
import { useCart } from '../../../context/CartContext'
import { useLang } from '../../../i18n/LanguageContext'
import styles from './ProductDetail.module.scss'

const LOCALES = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' }

function Stars({ value }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => {
        if (value >= n) return <IoStar key={n} />
        if (value >= n - 0.5) return <IoStarHalf key={n} />
        return <IoStarOutline key={n} />
      })}
    </span>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const { t, lang } = useLang()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  })

  // Sahifa ochilganda tepaga qaytish va rasmni birinchisiga qo'yish
  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveImage(0)
  }, [id])

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.state}>{t('common.loading')}</p>
      </main>
    )
  }

  if (isError || !product) {
    return (
      <main className={styles.page}>
        <div className={styles.state}>
          <p>{t('product.notFound')}</p>
          <Link to="/shop" className={styles.back}>
            <IoArrowBack /> {t('product.back')}
          </Link>
        </div>
      </main>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const hasDiscount = product.discountPercentage > 0
  const oldPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null
  const reviews = product.reviews ?? []

  const details = [
    { label: t('product.brand'), value: product.brand },
    { label: t('product.warranty'), value: product.warrantyInformation },
    { label: t('product.shipping'), value: product.shippingInformation },
    { label: t('product.returns'), value: product.returnPolicy },
    { label: t('product.minOrder'), value: product.minimumOrderQuantity && t('product.pcs', { n: product.minimumOrderQuantity }) },
  ].filter((d) => d.value)

  return (
    <main className={styles.page}>
      <Link to="/shop" className={styles.back}>
        <IoArrowBack /> {t('product.back')}
      </Link>

      <article className={styles.card}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={images[activeImage]} alt={product.title} />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={t('projects.image', { n: i + 1 })}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.rating}>
            <Stars value={product.rating} />
            <span>
              {product.rating.toFixed(1)} ({t('product.reviewsCount', { n: reviews.length })})
            </span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            {hasDiscount && (
              <>
                <span className={styles.oldPrice}>${oldPrice}</span>
                <span className={styles.discount}>-{Math.round(product.discountPercentage)}%</span>
              </>
            )}
          </div>

          <p className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
            {product.stock > 0 ? t('product.inStock', { n: product.stock }) : t('product.outOfStock')}
          </p>

          <p className={styles.description}>{product.description}</p>

          <button
            type="button"
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
            disabled={added || product.stock === 0}
          >
            {added ? t('product.added') : t('shop.add')}
          </button>

          {details.length > 0 && (
            <dl className={styles.details}>
              {details.map((d) => (
                <div key={d.label} className={styles.detailRow}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </article>

      {reviews.length > 0 && (
        <section className={styles.reviews}>
          <h2 className={styles.reviewsTitle}>{t('product.reviews')}</h2>
          <ul className={styles.reviewList}>
            {reviews.map((r, i) => (
              <li key={i} className={styles.review}>
                <div className={styles.reviewHead}>
                  <strong>{r.reviewerName}</strong>
                  <Stars value={r.rating} />
                </div>
                <p>{r.comment}</p>
                <time dateTime={r.date}>{new Date(r.date).toLocaleDateString(LOCALES[lang])}</time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default ProductDetail