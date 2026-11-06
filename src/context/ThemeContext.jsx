import { createContext, useContext, useEffect, useState } from 'react'

// Qorong'i / yorug' rejim. Tanlov brauzerda saqlanadi.
// Birinchi kirishda telefon/kompyuter sozlamasiga qaraladi.
// index.html dagi kichik skript rejimni sahifa chizilmasdan oldin qo'yadi — "miltillash" bo'lmaydi.
const ThemeContext = createContext(null)
const STORAGE_KEY = 'theme'
const META_COLORS = { dark: '#0b0b0c', light: '#f7f3ec' }

function initialTheme() {
  const fromDom = document.documentElement.dataset.theme
  if (fromDom === 'light' || fromDom === 'dark') return fromDom
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // xotira bloklangan bo'lsa — tizim sozlamasiga qaraymiz
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme])
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // jim o'tkazib yuboramiz
    }
  }, [theme])

  const toggle = () => {
    const root = document.documentElement
    // Almashish paytida ranglar silliq o'tishi uchun vaqtincha klass qo'yiladi
    root.classList.add('theme-switching')
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    window.setTimeout(() => root.classList.remove('theme-switching'), 400)
  }

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme faqat ThemeProvider ichida ishlaydi')
  return ctx
}
