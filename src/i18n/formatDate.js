const LOCALES = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' }

// "2026-11-04" -> "4-noyabr, 2026" / "4 ноября 2026 г." / "November 4, 2026"
export function formatDate(iso, lang) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(LOCALES[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
