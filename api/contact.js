// Vercel serverless funksiya: formadan kelgan xabarni Telegram botga yuboradi.
// Token va chat ID kodda EMAS, Vercel sozlamalarida (Environment Variables) saqlanadi.

const clean = (value, max) => String(value ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Faqat POST so\'rov qabul qilinadi' })
  }

  const body = req.body ?? {}

  // Spam-botlar uchun tuzoq: bu maydon odamga ko'rinmaydi, to'ldirilgan bo'lsa — bot
  if (body.company) {
    return res.status(200).json({ ok: true })
  }

  const name = clean(body.name, 100)
  const contact = clean(body.contact, 100)
  const message = clean(body.message, 2000)

  if (name.length < 2 || !contact || message.length < 10) {
    return res.status(400).json({ ok: false, error: "Maydonlar to'liq to'ldirilmagan" })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Server sozlanmagan' })
  }

  const text = [
    '📩 Portfolio saytidan yangi xabar',
    '',
    `👤 Ism: ${name}`,
    `📞 Aloqa: ${contact}`,
    '',
    '💬 Xabar:',
    message,
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