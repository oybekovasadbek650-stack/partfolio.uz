import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import translations from './translations'

// Saytning tili: o'zbekcha (asosiy), ruscha va inglizcha.
// t('home.title')   — translations.js dagi interfeys matnlari
// tr({ uz, ru, en }) — ma'lumotlar ichidagi (loyihalar, xizmatlar, blog) tarjimalar
const LanguageContext = createContext(null)
const STORAGE_KEY = 'lang'

export const LANGUAGES = [
  { code: 'uz', label: 'UZ', name: "O'zbekcha" },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
]

const CODES = LANGUAGES.map((l) => l.code)

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (CODES.includes(saved)) return saved
  } catch {
    // xotira bloklangan
  }
  // Brauzer tili ruscha yoki inglizcha bo'lsa — shuni tanlaymiz, aks holda o'zbekcha
  const browser = (navigator.language || 'uz').slice(0, 2).toLowerCase()
  if (browser === 'ru' || browser === 'en') return browser
  return 'uz'
}

// "home.stats.title" kabi kalit bo'yicha ichma-ich obyektdan qiymat topish
function lookup(dict, key) {
  return key.split('.').reduce((obj, part) => (obj == null ? undefined : obj[part]), dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // jim o'tkazib yuboramiz
    }
  }, [lang])

  const setLang = useCallback((code) => {
    if (CODES.includes(code)) setLangState(code)
  }, [])

  const t = useCallback(
    (key, vars) => {
      let value = lookup(translations[lang], key) ?? lookup(translations.uz, key)
      if (value === undefined) return key
      if (typeof value === 'string' && vars) {
        value = value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '')
      }
      return value
    },
    [lang]
  )

  const tr = useCallback(
    (field) => {
      if (field == null || typeof field !== 'object' || Array.isArray(field)) return field
      return field[lang] ?? field.uz
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang faqat LanguageProvider ichida ishlaydi')
  return ctx
}
