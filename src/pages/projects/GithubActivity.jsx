import { useQuery } from '@tanstack/react-query'
import { FaGithub } from 'react-icons/fa'
import { IoStarOutline, IoOpenOutline } from 'react-icons/io5'
import { GITHUB_USER } from '../../data/projects'
import { useLang } from '../../i18n/LanguageContext'
import { useTheme } from '../../context/ThemeContext'
import styles from './GithubActivity.module.scss'

// GitHub'ning ochiq API'sidan oxirgi yangilangan repozitoriylar olinadi (token kerak emas)
async function getRepos() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=12`)
  if (!res.ok) throw new Error(`GitHub: ${res.status}`)
  const repos = await res.json()
  return repos.filter((r) => !r.fork).slice(0, 6)
}

// Til nomi uchun kichik rangli nuqta
const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
}

const LOCALES = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' }

function GithubActivity() {
  const { t, lang } = useLang()
  const { theme } = useTheme()

  const { data: repos = [], isLoading, isError } = useQuery({
    queryKey: ['github-repos'],
    queryFn: getRepos,
    staleTime: 1000 * 60 * 30,
    retry: 1,
  })

  // Commit grafigi ghchart.rshah.org xizmatidan rasm sifatida olinadi (rang — sayt oltini)
  const chartColor = theme === 'light' ? '9a7339' : 'c9a876'
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString(LOCALES[lang], { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <section className={styles.github} aria-labelledby="github-title">
      <div className={styles.head}>
        <div>
          <h2 id="github-title" className={styles.title}>{t('github.title')}</h2>
          <p className={styles.lead}>{t('github.lead')}</p>
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileBtn}
        >
          <FaGithub aria-hidden="true" /> {t('github.profile')}
        </a>
      </div>

      <div className={styles.chart}>
        <img
          src={`https://ghchart.rshah.org/${chartColor}/${GITHUB_USER}`}
          alt={t('github.chartAlt')}
          loading="lazy"
          className={styles.chartImg}
        />
      </div>

      <h3 className={styles.subtitle}>{t('github.repos')}</h3>

      {isError && <p className={styles.state}>{t('github.error')}</p>}

      <ul className={styles.repos} aria-busy={isLoading}>
        {isLoading &&
          Array.from({ length: 6 }, (_, i) => <li key={i} className={styles.skeleton} aria-hidden="true" />)}

        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repo}>
              <span className={styles.repoName}>
                {repo.name} <IoOpenOutline aria-hidden="true" />
              </span>
              <span className={styles.repoDesc}>{repo.description || t('github.noDescription')}</span>
              <span className={styles.repoMeta}>
                {repo.language && (
                  <span className={styles.repoLang}>
                    <span
                      className={styles.langDot}
                      style={{ background: LANG_COLORS[repo.language] ?? 'var(--gold)' }}
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className={styles.repoLang}>
                    <IoStarOutline aria-hidden="true" /> {repo.stargazers_count}
                  </span>
                )}
                <span>{t('github.updated', { date: formatDate(repo.pushed_at) })}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default GithubActivity
