import { IoRocketOutline, IoBusinessOutline, IoCartOutline, IoHeartOutline } from 'react-icons/io5'

// ⬇️ Xizmatlar va narxlar. Narxni o'zgartirish uchun faqat price ni o'zgartiring.
// price — "dan" boshlanadigan narx (dollarda), time — taxminiy muddat.
export const SERVICES = [
  {
    id: 'landing',
    icon: IoRocketOutline,
    price: 100,
    title: { uz: 'Landing sahifa', ru: 'Лендинг', en: 'Landing page' },
    text: {
      uz: "Bitta mahsulot, xizmat yoki tadbir uchun chiroyli bir sahifali sayt.",
      ru: 'Красивый одностраничный сайт для продукта, услуги или мероприятия.',
      en: 'A polished one-page site for a product, service or event.',
    },
    time: { uz: '3–5 kun', ru: '3–5 дней', en: '3–5 days' },
    includes: [
      { uz: 'Telefon va kompyuterga moslashuv', ru: 'Адаптация под телефон и ПК', en: 'Works on phones and desktops' },
      { uz: 'Telegramga keladigan ariza formasi', ru: 'Форма заявки с отправкой в Telegram', en: 'Lead form that sends to Telegram' },
      { uz: 'Internetga joylash', ru: 'Публикация в интернете', en: 'Publishing online' },
    ],
  },
  {
    id: 'business',
    icon: IoBusinessOutline,
    price: 250,
    title: { uz: 'Biznes sayt', ru: 'Сайт для бизнеса', en: 'Business website' },
    text: {
      uz: "Kompaniya yoki o'quv markaz uchun 5 sahifagacha bo'lgan sayt.",
      ru: 'Сайт до 5 страниц для компании или учебного центра.',
      en: 'A site of up to 5 pages for a company or learning center.',
    },
    time: { uz: '1–2 hafta', ru: '1–2 недели', en: '1–2 weeks' },
    includes: [
      { uz: 'Biz haqimizda, xizmatlar, aloqa sahifalari', ru: 'Страницы «О нас», услуги, контакты', en: 'About, services and contact pages' },
      { uz: 'Ikki yoki uch tilli versiya', ru: 'Версия на двух-трёх языках', en: 'Two or three language versions' },
      { uz: 'Google uchun asosiy SEO sozlamalari', ru: 'Базовая SEO-настройка для Google', en: 'Basic SEO setup for Google' },
    ],
  },
  {
    id: 'shop',
    icon: IoCartOutline,
    price: 400,
    title: { uz: "Internet-do'kon", ru: 'Интернет-магазин', en: 'Online shop' },
    text: {
      uz: "Katalog, savat va buyurtma berish. Buyurtmalar Telegramga keladi.",
      ru: 'Каталог, корзина и оформление заказа. Заказы приходят в Telegram.',
      en: 'Catalog, cart and checkout, with orders sent to Telegram.',
    },
    time: { uz: '2–3 hafta', ru: '2–3 недели', en: '2–3 weeks' },
    includes: [
      { uz: 'Qidiruv, kategoriya va filtrlar', ru: 'Поиск, категории и фильтры', en: 'Search, categories and filters' },
      { uz: 'Mahsulot sahifasi va savat', ru: 'Страница товара и корзина', en: 'Product page and cart' },
      { uz: "Buyurtmalar Telegram botga", ru: 'Заказы в Telegram-бот', en: 'Orders delivered to a Telegram bot' },
    ],
  },
  {
    id: 'invitation',
    icon: IoHeartOutline,
    price: 50,
    title: { uz: 'Onlayn taklifnoma', ru: 'Онлайн-приглашение', en: 'Online invitation' },
    text: {
      uz: "To'y, tug'ilgan kun yoki tadbir uchun animatsion taklifnoma-sayt.",
      ru: 'Анимированный сайт-приглашение на свадьбу, день рождения или событие.',
      en: 'An animated invitation site for a wedding, birthday or event.',
    },
    time: { uz: '2–4 kun', ru: '2–4 дня', en: '2–4 days' },
    includes: [
      { uz: 'Tadbirgacha qolgan vaqt hisoblagichi', ru: 'Обратный отсчёт до события', en: 'Countdown to the event' },
      { uz: 'Suratlar galereyasi va musiqa', ru: 'Галерея фото и музыка', en: 'Photo gallery and music' },
      { uz: 'Kelishni tasdiqlash formasi', ru: 'Форма подтверждения участия', en: 'RSVP form' },
    ],
  },
]

// ⬇️ Ko'p beriladigan savollar (Xizmatlar sahifasi pastida)
export const FAQ = [
  {
    q: { uz: 'Sayt qancha vaqtda tayyor bo\'ladi?', ru: 'Сколько времени занимает разработка?', en: 'How long does it take?' },
    a: {
      uz: "Landing sahifa odatda 3–5 kunda, ko'p sahifali sayt 1–2 haftada, internet-do'kon 2–3 haftada tayyor bo'ladi. Aniq muddatni loyihani muhokama qilgandan keyin aytaman.",
      ru: 'Лендинг обычно готов за 3–5 дней, многостраничный сайт — за 1–2 недели, интернет-магазин — за 2–3 недели. Точный срок назову после обсуждения проекта.',
      en: 'A landing page usually takes 3–5 days, a multi-page site 1–2 weeks, and an online shop 2–3 weeks. I give an exact timeline once we have discussed the project.',
    },
  },
  {
    q: { uz: "To'lov qanday amalga oshiriladi?", ru: 'Как происходит оплата?', en: 'How does payment work?' },
    a: {
      uz: "Odatda 50% ish boshlanishidan oldin, qolgan 50% sayt topshirilganda to'lanadi. Click, Payme yoki naqd — qaysi biri qulay bo'lsa.",
      ru: 'Обычно 50% — до начала работы, оставшиеся 50% — при сдаче сайта. Click, Payme или наличными — как удобнее.',
      en: 'Usually 50% before work starts and the remaining 50% on delivery. Click, Payme or cash, whichever suits you.',
    },
  },
  {
    q: { uz: 'Domen va hosting kerakmi?', ru: 'Нужны ли домен и хостинг?', en: 'Do I need a domain and hosting?' },
    a: {
      uz: "Saytni Vercel'da bepul joylashtiraman. O'z domeningiz (.uz yoki .com) bo'lsa, uni ulab beraman; bo'lmasa, sotib olishda yordam beraman.",
      ru: 'Я бесплатно размещаю сайт на Vercel. Если у вас есть свой домен (.uz или .com), подключу его; если нет — помогу купить.',
      en: "I host the site on Vercel for free. If you have your own domain (.uz or .com), I'll connect it; if not, I'll help you buy one.",
    },
  },
  {
    q: { uz: 'Sayt telefonda ham yaxshi ishlaydimi?', ru: 'Будет ли сайт хорошо работать на телефоне?', en: 'Will the site work well on phones?' },
    a: {
      uz: "Ha. Har bir saytni avval telefon, keyin planshet va kompyuter ekranida tekshiraman.",
      ru: 'Да. Каждый сайт я проверяю на телефоне, планшете и компьютере.',
      en: 'Yes. I test every site on phones, tablets and desktops.',
    },
  },
  {
    q: { uz: "Keyinchalik o'zgartirish kiritsa bo'ladimi?", ru: 'Можно ли потом вносить изменения?', en: 'Can I make changes later?' },
    a: {
      uz: "Ha. Topshirilgandan keyin 2 hafta davomida kichik tuzatishlar bepul. Keyingi o'zgarishlar alohida kelishiladi.",
      ru: 'Да. В течение 2 недель после сдачи мелкие правки бесплатно. Дальнейшие изменения обсуждаются отдельно.',
      en: 'Yes. Small fixes are free for 2 weeks after delivery. Later changes are agreed separately.',
    },
  },
  {
    q: { uz: 'Telegram bot yoki forma ulash mumkinmi?', ru: 'Можно подключить Telegram-бота или форму?', en: 'Can you connect a Telegram bot or form?' },
    a: {
      uz: "Ha. Shu saytdagi aloqa formasi va demo do'kon buyurtmalari ham Telegram botga keladi — xuddi shunday qilib beraman.",
      ru: 'Да. Форма связи и заказы демо-магазина на этом сайте тоже приходят в Telegram-бот — сделаю так же.',
      en: "Yes. The contact form and demo shop orders on this site go to a Telegram bot too, and I can set up the same for you.",
    },
  },
]
