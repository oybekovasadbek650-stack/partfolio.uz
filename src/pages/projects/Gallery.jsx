import { useEffect, useRef, useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Projects.module.scss'

// Bir nechta rasmni slayder ko'rinishida ko'rsatadi.
// Strelkalar, pastdagi nuqtalar va telefonda barmoq bilan surish ishlaydi.
// active — shu loyiha hozir ekranda; autoplay — rasmlar o'zi almashadimi; interval — har rasm necha ms.
function Gallery({ images, title, active = true, autoplay = false, interval = 2500 }) {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const touchX = useRef(null)
  const count = images.length

  // Loyiha ekrandan ketganda galereya boshiga qaytadi — keyingi safar 1-rasmdan boshlanadi
  useEffect(() => {
    if (!active) setIndex(0)
  }, [active])

  // Rasmlar o'zi almashadi. index ham bog'liqlikda: qo'lda almashtirilsa, taymer qaytadan boshlanadi
  useEffect(() => {
    if (!active || !autoplay || count < 2) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearTimeout(t)
  }, [active, autoplay, count, interval, index])

  const go = (step) => setIndex((i) => (i + step + count) % count)

  if (count === 0) {
    return <div className={styles.noImage}>{title}</div>
  }

  // stopPropagation: rasmni surganda butun loyiha karuseli surilib ketmasin
  const onTouchStart = (e) => {
    e.stopPropagation()
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    e.stopPropagation()
    if (touchX.current === null) return
    const diff = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1)
    touchX.current = null
  }

  return (
    <div
      className={styles.gallery}
      onTouchStart={count > 1 ? onTouchStart : undefined}
      onTouchEnd={count > 1 ? onTouchEnd : undefined}
      onKeyDown={(e) => {
        if (count < 2) return
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      tabIndex={count > 1 ? 0 : undefined}
      aria-roledescription={count > 1 ? 'carousel' : undefined}
      aria-label={count > 1 ? t('projects.imagesOf', { title }) : undefined}
    >
      <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={t('projects.screenshot', { title, n: i + 1 })}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== index}
            draggable="false"
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => go(-1)} aria-label={t('projects.prevImage')}>
            <IoChevronBack aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => go(1)} aria-label={t('projects.nextImage')}>
            <IoChevronForward aria-hidden="true" />
          </button>

          <span className={styles.counter}>
            {index + 1} / {count}
          </span>

          <div className={styles.dots}>
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={i === index ? styles.dotActive : styles.dot}
                style={i === index && active && autoplay ? { '--dot-ms': `${interval}ms` } : undefined}
                onClick={() => setIndex(i)}
                aria-label={t('projects.image', { n: i + 1 })}
                aria-current={i === index}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Gallery
