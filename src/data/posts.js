// ⬇️ Blog maqolalari. Yangi maqola qo'shish uchun ro'yxat boshiga yana bitta { ... } qo'shing.
// slug — manzil (/blog/slug), date — YYYY-MM-DD, minutes — o'qish vaqti.
// body — bloklar ro'yxati: { type: 'p' | 'h2', text: { uz, ru, en } } yoki { type: 'code', code: '...' }
export const POSTS = [
  {
    slug: 'vercel-proxy',
    date: '2026-11-04',
    minutes: 4,
    tags: ['Vercel', 'API'],
    title: {
      uz: "API bloklansa ham sayt ishlashi uchun: Vercel rewrite",
      ru: 'Чтобы сайт работал, даже если API заблокирован: Vercel rewrite',
      en: 'Keeping a site working when an API is blocked: Vercel rewrites',
    },
    excerpt: {
      uz: "Demo do'konim ba'zi foydalanuvchilarda ochilmay qoldi. Sababi — provayder va reklama bloklovchilar. Muammoni bitta konfiguratsiya fayli bilan qanday hal qildim.",
      ru: 'У некоторых пользователей мой демо-магазин не открывался из-за провайдеров и блокировщиков рекламы. Как я решил это одним конфигом.',
      en: "For some visitors my demo shop wouldn't load because of ISPs and ad blockers. Here's how I fixed it with one config file.",
    },
    body: [
      {
        type: 'p',
        text: {
          uz: "Portfolio'imdagi demo do'kon mahsulotlarni dummyjson.com'dan oladi. Bir kuni do'stim \"do'kon ochilmayapti\" dedi. Tekshirsam, uning brauzeri dummyjson.com'ga so'rovni umuman yubormayapti — reklama bloklovchi uni to'sib qo'ygan ekan.",
          ru: 'Демо-магазин в моём портфолио берёт товары с dummyjson.com. Однажды друг сказал, что магазин не открывается. Оказалось, его браузер вообще не отправлял запросы на dummyjson.com — их блокировал блокировщик рекламы.',
          en: 'The demo shop in my portfolio gets its products from dummyjson.com. One day a friend told me the shop would not load. It turned out his browser was not sending requests to dummyjson.com at all: an ad blocker was stopping them.',
        },
      },
      { type: 'h2', text: { uz: "G'oya: so'rovni o'z saytim orqali yuborish", ru: 'Идея: отправлять запрос через свой сайт', en: 'The idea: send the request through my own site' } },
      {
        type: 'p',
        text: {
          uz: "Brauzer begona domenga emas, o'z saytimning /dummy manziliga murojaat qilsa, bloklovchi hech narsani to'smaydi. Qolgan ishni Vercel serveri bajaradi: /dummy ga kelgan so'rovni dummyjson.com ga uzatadi.",
          ru: 'Если браузер обращается не к чужому домену, а к адресу /dummy на моём сайте, блокировщику нечего блокировать. Остальное делает сервер Vercel: пересылает запрос с /dummy на dummyjson.com.',
          en: 'If the browser calls /dummy on my own site instead of a third-party domain, the blocker has nothing to block. The Vercel server does the rest, forwarding /dummy requests to dummyjson.com.',
        },
      },
      {
        type: 'code',
        code: `// vercel.json
{
  "rewrites": [
    { "source": "/dummy/:path*", "destination": "https://dummyjson.com/:path*" },
    { "source": "/dummy-cdn/:path*", "destination": "https://cdn.dummyjson.com/:path*" }
  ]
}`,
      },
      {
        type: 'p',
        text: {
          uz: "Kod tomonda esa axios'ga bitta baseURL beraman. Rasmlar manzilini ham /dummy-cdn ga almashtiraman, aks holda mahsulot ochilsa ham rasmlari ko'rinmay qoladi.",
          ru: 'В коде я просто задаю axios один baseURL. Адреса картинок тоже меняю на /dummy-cdn, иначе товары откроются, а фото — нет.',
          en: 'In the code I give axios a single baseURL. I also rewrite image URLs to /dummy-cdn, otherwise the products would load but their images would not.',
        },
      },
      {
        type: 'code',
        code: `const api = axios.create({ baseURL: '/dummy', timeout: 15000 })`,
      },
      { type: 'h2', text: { uz: 'Lokalda ham ishlashi uchun', ru: 'Чтобы работало и локально', en: 'Making it work locally too' } },
      {
        type: 'p',
        text: {
          uz: "vercel.json faqat Vercel'da ishlaydi. Kompyuterda npm run dev qilganda xuddi shu vazifani vite.config.js dagi proxy bajaradi. Natijada kod bir xil, lekin sayt endi bloklovchilar bilan ham ochiladi.",
          ru: 'vercel.json работает только на Vercel. Локально, при npm run dev, ту же задачу выполняет proxy в vite.config.js. Код один и тот же, а сайт теперь открывается и с блокировщиками.',
          en: 'vercel.json only works on Vercel. Locally, when I run npm run dev, a proxy in vite.config.js does the same job. The code stays the same, and the site now loads even with blockers on.',
        },
      },
    ],
  },
  {
    slug: 'cart-context',
    date: '2026-10-27',
    minutes: 3,
    tags: ['React', 'Context'],
    title: {
      uz: 'Sahifa yangilansa ham yo\'qolmaydigan savat',
      ru: 'Корзина, которая не пропадает после перезагрузки',
      en: "A shopping cart that survives a page reload",
    },
    excerpt: {
      uz: "React Context va localStorage yordamida butun saytda umumiy, sahifa yangilansa ham saqlanib qoladigan savat yasash.",
      ru: 'Как с помощью React Context и localStorage сделать общую для всего сайта корзину, которая сохраняется после перезагрузки.',
      en: 'Using React Context and localStorage to build a site-wide cart that is still there after a reload.',
    },
    body: [
      {
        type: 'p',
        text: {
          uz: "Savat bir nechta joyda kerak: navbar'dagi belgi mahsulotlar sonini ko'rsatadi, mahsulot kartasi unga qo'shadi, savat sahifasi esa ro'yxatni chiqaradi. Har bir komponentga props orqali uzatish noqulay, shuning uchun Context ishlatdim.",
          ru: 'Корзина нужна в нескольких местах: значок в навбаре показывает количество, карточка товара добавляет в неё, а страница корзины выводит список. Передавать всё через props неудобно, поэтому я использовал Context.',
          en: 'The cart is needed in several places: the navbar badge shows the count, product cards add to it, and the cart page lists everything. Passing it through props would be painful, so I used Context.',
        },
      },
      {
        type: 'code',
        code: `const [items, setItems] = useState(loadCart)

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(items))
}, [items])`,
      },
      { type: 'h2', text: { uz: 'Nega useState(loadCart)?', ru: 'Почему useState(loadCart)?', en: 'Why useState(loadCart)?' } },
      {
        type: 'p',
        text: {
          uz: "useState ga funksiyaning o'zini beraman, natijasini emas. Shunda localStorage faqat bir marta, birinchi renderda o'qiladi. Har bir o'zgarishdan keyin useEffect savatni qaytadan xotiraga yozib qo'yadi.",
          ru: 'Я передаю в useState саму функцию, а не её результат. Так localStorage читается только один раз, при первом рендере. После каждого изменения useEffect снова записывает корзину в память.',
          en: 'I pass the function itself to useState, not its result, so localStorage is read only once, on the first render. After every change, useEffect writes the cart back to storage.',
        },
      },
      {
        type: 'p',
        text: {
          uz: "Bitta muhim narsa: localStorage ba'zan ishlamaydi (masalan, maxfiy rejimda). Shuning uchun o'qish va yozishni try/catch ichiga oldim — xato bo'lsa savat shunchaki bo'sh boshlanadi, sayt esa buzilmaydi.",
          ru: 'Важный момент: localStorage иногда недоступен (например, в приватном режиме). Поэтому чтение и запись обёрнуты в try/catch: при ошибке корзина просто начинается пустой, а сайт не ломается.',
          en: 'One important detail: localStorage is sometimes unavailable, for example in private mode. So reading and writing are wrapped in try/catch: on an error the cart simply starts empty and the site keeps working.',
        },
      },
    ],
  },
  {
    slug: 'telegram-form',
    date: '2026-10-18',
    minutes: 4,
    tags: ['Vercel', 'Telegram'],
    title: {
      uz: "Saytdagi formadan Telegramga xabar yuborish",
      ru: 'Отправка сообщений с формы сайта в Telegram',
      en: 'Sending website form messages to Telegram',
    },
    excerpt: {
      uz: "Bot tokenini brauzerga chiqarmasdan, Vercel serverless funksiyasi orqali aloqa formasini Telegramga ulash.",
      ru: 'Как подключить форму связи к Telegram через serverless-функцию Vercel, не раскрывая токен бота в браузере.',
      en: 'Connecting a contact form to Telegram through a Vercel serverless function without exposing the bot token.',
    },
    body: [
      {
        type: 'p',
        text: {
          uz: "Eng oson yo'l — brauzerdan to'g'ridan-to'g'ri api.telegram.org ga so'rov yuborish. Lekin unda bot tokeni sayt kodida ko'rinib qoladi va istalgan odam botingiz nomidan xabar yubora oladi.",
          ru: 'Самый простой путь — отправлять запрос на api.telegram.org прямо из браузера. Но тогда токен бота виден в коде сайта, и кто угодно сможет писать от имени вашего бота.',
          en: 'The easiest way is to call api.telegram.org straight from the browser. But then the bot token is visible in the site code, and anyone could send messages as your bot.',
        },
      },
      { type: 'h2', text: { uz: 'Yechim: /api/contact', ru: 'Решение: /api/contact', en: 'The fix: /api/contact' } },
      {
        type: 'p',
        text: {
          uz: "Vercel'da api/ papkasidagi har bir fayl alohida server funksiyasiga aylanadi. Forma ma'lumotni shu funksiyaga yuboradi, funksiya esa tokenni Environment Variables'dan olib, Telegramga uzatadi. Token hech qachon brauzerga chiqmaydi.",
          ru: 'На Vercel каждый файл в папке api/ становится отдельной серверной функцией. Форма отправляет данные в эту функцию, а та берёт токен из Environment Variables и пересылает сообщение в Telegram. Токен никогда не попадает в браузер.',
          en: 'On Vercel, every file in the api/ folder becomes its own server function. The form posts to that function, which reads the token from Environment Variables and forwards the message to Telegram. The token never reaches the browser.',
        },
      },
      {
        type: 'code',
        code: `const token = process.env.TELEGRAM_BOT_TOKEN
const chatId = process.env.TELEGRAM_CHAT_ID

await fetch(\`https://api.telegram.org/bot\${token}/sendMessage\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chatId, text }),
})`,
      },
      { type: 'h2', text: { uz: 'Spam-botlarga qarshi tuzoq', ru: 'Ловушка для спам-ботов', en: 'A trap for spam bots' } },
      {
        type: 'p',
        text: {
          uz: "Formaga odamga ko'rinmaydigan \"company\" maydonini qo'shdim. Odam uni ko'rmaydi va to'ldirmaydi, bot esa hamma maydonni to'ldiradi. Server bu maydon to'la kelsa, xabarni jimgina tashlab yuboradi. Captcha'siz oddiy, lekin samarali usul.",
          ru: 'Я добавил в форму невидимое для человека поле «company». Человек его не видит и не заполняет, а бот заполняет всё подряд. Если поле пришло заполненным, сервер молча отбрасывает сообщение. Просто, без капчи, но работает.',
          en: 'I added a "company" field that people cannot see. A person leaves it empty, but a bot fills in every field. If it arrives filled in, the server quietly drops the message. Simple, no captcha, and it works.',
        },
      },
    ],
  },
]

export const findPost = (slug) => POSTS.find((p) => p.slug === slug)
