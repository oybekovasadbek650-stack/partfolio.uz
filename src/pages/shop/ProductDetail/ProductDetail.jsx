import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { IoArrowBack, IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'
import { getProductById } from '../../../api/api'
import { useCart } from '../../../context/CartContext'
import styles from './ProductDetail.module.scss'

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
        <p className={styles.state}>Yuklanmoqda...</p>
      </main>
    )
  }

  if (isError || !product) {
    return (
      <main className={styles.page}>
        <div className={styles.state}>
          <p>Bu mahsulot topilmadi.</p>
          <Link to="/shop" className={styles.back}>
            <IoArrowBack /> Do'konga qaytish
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
    { label: 'Brend', value: product.brand },
    { label: 'Kafolat', value: product.warrantyInformation },
    { label: 'Yetkazib berish', value: product.shippingInformation },
    { label: 'Qaytarish', value: product.returnPolicy },
    { label: 'Minimal buyurtma', value: product.minimumOrderQuantity && `${product.minimumOrderQuantity} ta` },
  ].filter((d) => d.value)

  return (
    <main className={styles.page}>
      <Link to="/shop" className={styles.back}>
        <IoArrowBack /> Do'konga qaytish
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
                  aria-label={`${i + 1}-rasm`}
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
              {product.rating.toFixed(1)} ({reviews.length} ta sharh)
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
            {product.stock > 0 ? `Omborda ${product.stock} ta bor` : 'Omborda qolmagan'}
          </p>

          <p className={styles.description}>{product.description}</p>

          <button
            type="button"
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
            disabled={added || product.stock === 0}
          >
            {added ? "✓ Savatga qo'shildi" : "Savatga qo'shish"}
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
          <h2 className={styles.reviewsTitle}>Xaridorlar sharhlari</h2>
          <ul className={styles.reviewList}>
            {reviews.map((r, i) => (
              <li key={i} className={styles.review}>
                <div className={styles.reviewHead}>
                  <strong>{r.reviewerName}</strong>
                  <Stars value={r.rating} />
                </div>
                <p>{r.comment}</p>
                <time dateTime={r.date}>{new Date(r.date).toLocaleDateString('uz-UZ')}</time>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}

export default ProductDetail