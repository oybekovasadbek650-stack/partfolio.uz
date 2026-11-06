import { Link, useParams } from 'react-router-dom'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { POSTS, findPost } from '../../data/posts'
import { useLang } from '../../i18n/LanguageContext'
import { formatDate } from '../../i18n/formatDate'
import Notfound from '../notfound/Notfound'
import styles from './Blog.module.scss'

// Bitta maqola: /blog/:slug
function Post() {
  const { slug } = useParams()
  const { t, tr, lang } = useLang()
  const post = findPost(slug)

  if (!post) return <Notfound />

  const others = POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <main className={styles.blog}>
      <article className={styles.article}>
        <Link to="/blog" className={styles.back}>
          <IoArrowBack aria-hidden="true" /> {t('blog.back')}
        </Link>

        <div className={styles.meta}>
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span aria-hidden="true">·</span>
          <span>{t('blog.minutes', { n: post.minutes })}</span>
        </div>
        <h1 className={styles.articleTitle}>{tr(post.title)}</h1>
        <p className={styles.articleLead}>{tr(post.excerpt)}</p>

        <div className={styles.content}>
          {post.body.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{tr(block.text)}</h2>
            if (block.type === 'code') {
              return (
                <pre key={i} className={styles.code}>
                  <code>{block.code}</code>
                </pre>
              )
            }
            return <p key={i}>{tr(block.text)}</p>
          })}
        </div>
      </article>

      {others.length > 0 && (
        <aside className={styles.more}>
          <h2 className={styles.moreTitle}>{t('blog.more')}</h2>
          <ul className={styles.moreList}>
            {others.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className={styles.moreLink}>
                  <span>{tr(p.title)}</span>
                  <IoArrowForward aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </main>
  )
}

export default Post
