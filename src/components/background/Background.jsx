import styles from './Background.module.scss'

// Tomchilar bir marta yaratiladi — har renderda qayta random bo'lmaydi
const DROPS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDuration: `${0.6 + Math.random() * 0.8}s`,
  animationDelay: `${Math.random() * 2}s`,
  opacity: 0.15 + Math.random() * 0.3,
}))

function Background() {
  return (
    <div className={styles.rainWrap} aria-hidden="true">
      {DROPS.map(({ id, ...style }) => (
        <span key={id} className={styles.drop} style={style} />
      ))}
    </div>
  )
}

export default Background
