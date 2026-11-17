import { useEffect } from 'react'
import { motion, useAnimate } from 'framer-motion'
import styles from './buildIntro.module.scss'

// Bitta animatsion kursor. `plan` — umumiy vaqt jadvali bo'yicha qadamlar:
// plan = { origin: performance.now() vaqti, steps: [{ start (s), values, transition, onStart?, onDone? }] }
// Har bir qadam `origin + start` paytida boshlanadi — shu bilan barcha kursorlar sinxron yuradi.
function Cursor({ label, color, from, plan, exitDuration }) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!plan) return
    let stopped = false
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)))

    const run = async () => {
      for (const step of plan.steps) {
        await wait(plan.origin + step.start * 1000 - performance.now())
        if (stopped) return
        step.onStart?.()
        await animate(scope.current, step.values, step.transition)
        if (stopped) return
        step.onDone?.()
      }
    }
    run()

    return () => {
      stopped = true
    }
  }, [plan, animate, scope])

  return (
    <motion.div
      ref={scope}
      className={styles.cursor}
      style={{ '--cursor-color': color }}
      initial={{ x: from.x, y: from.y, opacity: 0 }}
      exit={{ opacity: 0, transition: { duration: exitDuration } }}
    >
      <svg className={styles.arrow} viewBox="0 0 20 24" aria-hidden="true">
        <path d="M1 1 L1 18 L5.5 13.8 L8.5 20.5 L11.2 19.3 L8.3 12.8 L14.5 12.8 Z" />
      </svg>
      <span className={styles.label}>{label}</span>
    </motion.div>
  )
}

export default Cursor
