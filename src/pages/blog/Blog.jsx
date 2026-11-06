import { Link } from 'react-router-dom'
import { IoArrowForward } from 'react-icons/io5'
import { POSTS } from '../../data/posts'
import { useLang } from '../../i18n/LanguageContext'
import { formatDate } from '../../i18n/formatDate'
import styles from './Blog.module.scss'

function Blog() {
  const { t, tr, lang } = useLang()

  return (
    <main className={styles.blog}>
      <header className={styles.head}>
        <h1 className={styles.title}>{t('blog.title')}</h1>
        <p className={styles.lead}>{t('blog.lead')}</p>
      </header>

      <ul className={styles.list}>
        {POSTS.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className={styles.post}>
              <div className={styles.meta}>
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                <span aria-hidden="true">·</span>
                <span>{t('blog.minutes', { n: post.minutes })}</span>
              </div>
              <h2 className={styles.postTitle}>{tr(post.title)}</h2>
              <p className={styles.excerpt}>{tr(post.excerpt)}</p>
              <div className={styles.foot}>
                <ul className={styles.tags}>
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className={styles.read}>
                  {t('blog.read')} <IoArrowForward aria-hidden="true" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Blog
