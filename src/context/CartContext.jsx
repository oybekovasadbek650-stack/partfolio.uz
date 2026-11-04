import { createContext, useContext, useEffect, useState } from 'react'

// Savat butun saytda umumiy bo'lishi uchun Context ishlatamiz
const CartContext = createContext(null)
const STORAGE_KEY = 'cart'

// Brauzer xotirasidan (localStorage) oldingi savatni o'qish
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // Savat o'zgarganda xotiraga yozib qo'yamiz — sahifa yangilansa ham saqlanadi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // xotira to'lgan yoki bloklangan bo'lsa — jim o'tkazib yuboramiz
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i))
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, thumbnail: product.thumbnail, qty }]
    })
  }

  const setQty = (id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i))
    )
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, setQty, removeItem, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart faqat CartProvider ichida ishlaydi')
  return ctx
}