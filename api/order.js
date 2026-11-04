// Vercel serverless funksiya: savatdagi buyurtmani Telegram botga yuboradi.
// Contact formasi bilan bir xil bot ishlatiladi (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).

const clean = (value, max) => String(value ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Faqat POST so\'rov qabul qilinadi' })
  }

  const body = req.body ?? {}

  // Spam-botlar uchun tuzoq
  if (body.company) {
    return res.status(200).json({ ok: true })
  }

  const name = clean(body.name, 100)
  const phone = clean(body.phone, 30)
  const items = Array.isArray(body.items) ? body.items.slice(0, 50) : []

  if (name.length < 2 || phone.replace(/\D/g, '').length < 9 || items.length === 0) {
    return res.status(400).json({ ok: false, error: "Ma'lumotlar to'liq emas" })
  }

  let total = 0
  const lines = items.map((item, i) => {
    const qty = Math.max(1, Math.min(99, parseInt(item.qty, 10) || 1))
    const price = Math.max(0, Number(item.price) || 0)
    total += price * qty
    return `${i + 1}. ${clean(item.title, 120)} × ${qty} = $${(price * qty).toFixed(2)}`
  })

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Server sozlanmagan' })
  }

  const text = [
    "🛒 Yangi buyurtma (demo do'kon)",
    '',
    `👤 Ism: ${name}`,
    `📞 Telefon: ${phone}`,
    '',
    '📦 Mahsulotlar:',
    ...lines,
    '',
    `💰 Jami: $${total.toFixed(2)}`,
  ].join('\n')

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    if (!tg.ok) throw new Error(`Telegram javobi: ${tg.status}`)

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(502).json({ ok: false, error: "Telegramga yuborib bo'lmadi" })
  }
}