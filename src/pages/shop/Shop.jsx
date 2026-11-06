import styles from './Shop.module.scss'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../api/api'
import ProductCard from './ProductCard/ProductCard'
import CategoryDropdown from './CategoryDropdown/CategoryDropdown'

function Shop() {
  const [search, setSearch] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const { data: products = [], isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    retry: 1,
  })

  const translations = {
    'soat': 'watches',
    'telefon': 'phone',
    'noutbuk': 'laptop',
    'kompyuter': 'laptop',
    'sumka': 'bags',
    'aynak': 'sunglasses',
    'koylak': 'dress',
    'kurtka': 'shirts',
    'parfyum': 'fragrances',
    'atir': 'fragrances',
    'kosmetika': 'beauty',
    'sochiq': 'skin-care',
    'moshina': 'vehicle',
    'avtomobil': 'vehicle',
    'oshxona': 'kitchen',
    'mebel': 'furniture',
    'gilam': 'home-decoration',
    'ziynat': 'jewellery',
    'taqinchoq': 'jewellery',
    'oyoq kiyim': 'shoes',
    'motosikl': 'motorcycle',
    'planshet': 'tablets',
    'oziq ovqat': 'groceries',
  }

  const categories = [
    { label: 'Barchasi', value: 'all' },
    { label: 'Kosmetika', value: 'beauty' },
    { label: 'Parfyum', value: 'fragrances' },
    { label: 'Mebel', value: 'furniture' },
    { label: 'Soatlar', value: 'watches' },
    { label: 'Taqinchoq', value: 'jewellery' },
    { label: 'Oyoq kiyim', value: 'shoes' },
  ]

  const filtered = products.filter(product => {
    const query = submittedSearch.toLowerCase().trim()

    const matchedKey = Object.keys(translations).find(key =>
      key.includes(query) || query.includes(key)
    )
    const translatedWord = matchedKey ? translations[matchedKey] : null

    const matchesSearch =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      (translatedWord && product.category.includes(translatedWord))

    const matchesCategory =
      activeCategory === 'all' || product.category.includes(activeCategory)

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = () => {
    setSubmittedSearch(search)
    setCurrentPage(1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Yuklanayotganda: mahsulot o'rnida bo'sh kartochkalar (skeleton)
  if (isLoading) {
    return (
      <section className={`${styles.grid} ${styles.gridTop}`} aria-busy="true" aria-label="Mahsulotlar yuklanmoqda">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={styles.skeleton} aria-hidden="true">
            <span className={styles.skeletonImg} />
            <span className={styles.skeletonLine} />
            <span className={styles.skeletonLineShort} />
          </div>
        ))}
      </section>
    )
  }

  // Internet yoki API ishlamasa: tushunarli xabar va qayta urinish tugmasi
  if (isError) {
    return (
      <div className={styles.state} role="alert">
        <h2>Mahsulotlarni yuklab bo'lmadi</h2>
        <p>
          Internet aloqasini tekshiring yoki birozdan keyin qayta urinib ko'ring.
          Mahsulotlar dummyjson.com demo API'sidan olinadi.
        </p>
        <button type="button" className={styles.searchBtn} onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Yuklanmoqda...' : 'Qayta urinish'}
        </button>
      </div>
    )
  }


  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Qidirish..."
            aria-label="Mahsulot qidirish"
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchBtn}>
            Qidirish
          </button>
        </div>

        <CategoryDropdown
          options={categories}
          value={activeCategory}
          onChange={(value) => { setActiveCategory(value); setCurrentPage(1) }}
        />
      </div>

      {paginated.length === 0 && (
        <div className={styles.empty}>
          <p>Hech narsa topilmadi. Boshqa so'z bilan qidirib ko'ring.</p>
        </div>
      )}

      <section className={styles.grid}>
        {paginated.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            img={product.thumbnail}
            title={product.title}
            price={product.price}
          />
        ))}
      </section>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
            Orqaga
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>
            Oldinga
          </button>
        </div>
      )}
    </>
  )
}

export default Shop