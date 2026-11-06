import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { IoArrowForward, IoChevronBack, IoChevronDown, IoChevronForward, IoOpenOutline } from 'react-icons/io5'
import Gallery from './Gallery'
import GithubActivity from './GithubActivity'
import { projects as PROJECTS } from '../../data/projects'
import { useLang } from '../../i18n/LanguageContext'
import styles from './Projects.module.scss'

// ⬇️ Loyihalar ro'yxati endi src/data/projects.js faylida

export function LiveButton({ live, className }) {
  const { t } = useLang()
  const label = t(live.labelKey ?? 'common.openSite')
  if (live.to) {
    return (
      <Link to={live.to} className={className}>
        {label} <IoArrowForward aria-hidden="true" />
      </Link>
    )
  }
  return (
    <a href={live.href} target="_blank" rel="noopener noreferrer" className={className}>
      {label} <IoOpenOutline aria-hidden="true" />
    </a>
  )
}

// Har bir loyiha kamida necha millisekund ko'rinib turadi (7000 = 7 soniya)
const AUTOPLAY_MS = 7000
// Loyiha ichidagi har bir rasm necha millisekund ko'rinadi
const IMAGE_MS = 2500

// Loyiha barcha rasmlari ko'rsatib bo'linguncha ekranda turadi
const durationFor = (i) => Math.max(AUTOPLAY_MS, PROJECTS[i].images.length * IMAGE_MS)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Projects() {
  const { t, tr } = useLang()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  // Telefonda "Batafsil" ochilgan loyiha (null = hammasi yopiq)
  const [expanded, setExpanded] = useState(null)
  const touchX = useRef(null)
  const count = PROJECTS.length

  // Boshqa loyihaga o'tganda ochiq "Batafsil" yopiladi
  const go = (step) => {
    setExpanded(null)
    setIndex((i) => (i + step + count) % count)
  }
  const goTo = (i) => {
    setExpanded(null)
    setIndex(i)
  }

  const autoplay = !prefersReducedMotion
  // O'qiyotgan paytda ("Batafsil" ochiq) loyiha o'zi almashib ketmaydi
  const paused = hovered || focused || touched || expanded !== null

  const onTouchStart = (e) => {
    setTouched(true)
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchX.current
      if (Math.abs(diff) > 50) go(diff < 0 ? 1 : -1)
    }
    touchX.current = null
    // Telefonda tegingandan keyin bir oz kutib, keyin yana o'zi aylanadi
    setTimeout(() => setTouched(false), 4000)
  }

  return (
    <main className={styles.projects}>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>{t('projects.title')}</h1>
          <p className={styles.lead}>{t('projects.lead')}</p>
        </div>

        <div className={styles.navControls}>
          <span className={styles.slideCounter}>
            <strong>{String(index + 1).padStart(2, '0')}</strong> / {String(count).padStart(2, '0')}
          </span>
          <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label={t('projects.prev')}>
            <IoChevronBack aria-hidden="true" />
          </button>
          <button type="button" className={styles.navBtn} onClick={() => go(1)} aria-label={t('projects.next')}>
            <IoChevronForward aria-hidden="true" />
          </button>
        </div>
      </header>

      <section
        className={styles.carousel}
        aria-roledescription="carousel"
        aria-label={t('projects.carousel')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === 'ArrowRight') go(1)
          if (e.key === 'ArrowLeft') go(-1)
        }}
        tabIndex={0}
      >
        <div className={styles.slides} style={{ transform: `translateX(-${index * 100}%)` }}>
        {PROJECTS.map((project, i) => (
          <article
            key={project.slug}
            className={styles.card}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${count}: ${project.title}`}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className={styles.preview}>
              <div className={styles.browserBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Gallery
                images={project.images}
                title={project.title}
                active={i === index}
                autoplay={autoplay && !paused}
                interval={IMAGE_MS}
              />
            </div>

            <div className={expanded === i ? `${styles.body} ${styles.bodyOpen}` : styles.body}>
              <h2 className={styles.cardTitle}>
                <Link to={`/projects/${project.slug}`} className={styles.cardTitleLink}>
                  {project.title}
                </Link>
              </h2>
              <p className={styles.description}>{tr(project.description)}</p>

              <ul className={styles.features} id={`features-${i}`}>
                {project.features.map((f) => (
                  <li key={f.uz}>{tr(f)}</li>
                ))}
              </ul>

              {/* Faqat telefonda ko'rinadi: to'liq matn va imkoniyatlarni ochib-yopadi */}
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() => setExpanded((e) => (e === i ? null : i))}
                aria-expanded={expanded === i}
                aria-controls={`features-${i}`}
              >
                {expanded === i ? t('projects.close') : t('projects.more')} <IoChevronDown aria-hidden="true" />
              </button>

              <ul className={styles.tech} aria-label={t('projects.tech')}>
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className={styles.actions}>
                <LiveButton live={project.live} className={styles.primaryBtn} />
                <Link to={`/projects/${project.slug}`} className={`${styles.secondaryBtn} ${styles.detailsBtn}`}>
                  {t('projects.details')}
                </Link>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${styles.secondaryBtn} ${styles.githubBtn}`}>
                    <FaGithub aria-hidden="true" className={styles.githubIcon} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
        </div>
      </section>

      <div className={styles.carouselFooter}>
        <div className={styles.projectDots}>
          {PROJECTS.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              className={i === index ? styles.projectDotActive : styles.projectDot}
              onClick={() => goTo(i)}
              aria-label={t('projects.goTo', { title: project.title })}
              aria-current={i === index}
            />
          ))}
        </div>

        {autoplay && (
          <div className={styles.progress} aria-hidden="true">
            {/* Chiziq to'lib bo'lganda keyingi loyihaga o'tadi. key o'zgarsa animatsiya qaytadan boshlanadi */}
            <span
              key={index}
              className={styles.progressBar}
              style={{
                animationDuration: `${durationFor(index)}ms`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
              onAnimationEnd={() => go(1)}
            />
          </div>
        )}
      </div>

      <GithubActivity />
    </main>
  )
}

export default Projects
