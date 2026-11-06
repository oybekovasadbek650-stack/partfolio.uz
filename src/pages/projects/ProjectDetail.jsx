import { Link, useParams } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { IoArrowBack, IoArrowForward, IoLockClosedOutline } from 'react-icons/io5'
import Gallery from './Gallery'
import { LiveButton } from './Projects'
import { projects, findProject } from '../../data/projects'
import { useLang } from '../../i18n/LanguageContext'
import Notfound from '../notfound/Notfound'
import styles from './ProjectDetail.module.scss'

// Bitta loyihaning to'liq sahifasi: /projects/:slug
function ProjectDetail() {
  const { slug } = useParams()
  const { t, tr } = useLang()
  const project = findProject(slug)

  if (!project) return <Notfound />

  const index = projects.indexOf(project)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <main className={styles.page}>
      <Link to="/projects" className={styles.back}>
        <IoArrowBack aria-hidden="true" /> {t('project.back')}
      </Link>

      <header className={styles.head}>
        <p className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.lead}>{tr(project.description)}</p>

        <div className={styles.actions}>
          <LiveButton live={project.live} className={styles.primaryBtn} />
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              <FaGithub aria-hidden="true" /> GitHub
            </a>
          ) : (
            <span className={styles.private}>
              <IoLockClosedOutline aria-hidden="true" /> {t('project.noCode')}
            </span>
          )}
        </div>
      </header>

      <div className={styles.preview}>
        <div className={styles.browserBar} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <Gallery images={project.images} title={project.title} />
      </div>

      <div className={styles.grid}>
        <section>
          <h2 className={styles.sectionTitle}>{t('project.features')}</h2>
          <ul className={styles.features}>
            {project.features.map((f) => (
              <li key={f.uz}>{tr(f)}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>{t('project.tech')}</h2>
          <ul className={styles.tech}>
            {project.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
      </div>

      <nav className={styles.pager} aria-label={t('projects.carousel')}>
        <Link to={`/projects/${prev.slug}`} className={styles.pagerLink}>
          <span className={styles.pagerLabel}>
            <IoArrowBack aria-hidden="true" /> {t('project.prev')}
          </span>
          <span className={styles.pagerTitle}>{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className={styles.pagerLabel}>
            {t('project.next')} <IoArrowForward aria-hidden="true" />
          </span>
          <span className={styles.pagerTitle}>{next.title}</span>
        </Link>
      </nav>
    </main>
  )
}

export default ProjectDetail
