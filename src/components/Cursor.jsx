import { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'
import styles from './buildIntro.module.scss'

const EASE = [0.22, 1, 0.36, 1]

// Bitta animatsion kursor: `from` nuqtadan boshlab `steps` bo'yicha ketma-ket harakatlanadi.
// step: { to: {x, y}, duration, delay?, onStart?, onDone? }
function Cursor({ label, color, from, steps }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let stopped = false
    const run = async () => {
      for (const step of steps) {
        const delay = step.delay ?? 0
        if (delay) await new Promise((resolve) => setTimeout(resolve, delay * 1000))
        if (stopped) return
        step.onStart?.()
        await animate(
          scope.current,
          { x: step.to.x, y: step.to.y, opacity: 1 },
          { duration: step.duration, ease: EASE, opacity: { duration: 0.2 } },
        )
        if (stopped) return
        step.onDone?.()
      }
    }
    run()
    return () => {
      stopped = true
    }
    // Yo'nalish faqat bir marta, kursor paydo bo'lganda o'ynaydi
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      ref={scope}
      className={styles.cursor}
      style={{ '--cursor-color': color }}
      initial={{ x: from.x, y: from.y, opacity: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <svg className={styles.arrow} viewBox="0 0 20 24" aria-hidden="true">
        <path d="M1 1 L1 18 L5.5 13.8 L8.5 20.5 L11.2 19.3 L8.3 12.8 L14.5 12.8 Z" />
      </svg>
      <span className={styles.label}>{label}</span>
    </motion.div>
  )
}

export default Cursor
