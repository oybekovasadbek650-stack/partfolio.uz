// src/images/projects/ ichidagi barcha papkalardagi rasmlarni avtomatik yuklaydi.
// Har bir loyiha uchun bitta papka: masalan src/images/projects/weather/1.png, 2.png ...
// Rasmlar nomi bo'yicha tartiblanadi (1, 2, 3 ...), birinchisi asosiy rasm bo'ladi.
const imageFiles = import.meta.glob('../images/projects/*/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

function imagesFor(folder) {
  return Object.keys(imageFiles)
    .filter((path) => path.split('/').at(-2) === folder)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((path) => imageFiles[path])
}

// ⬇️ Yangi loyiha qo'shish uchun:
//   1) src/images/projects/ ichida yangi papka oching (masalan "weather") va rasmlarni tashlang
//   2) shu ro'yxatga yana bitta { ... } qo'shing va folder: 'weather' deb yozing
//   3) slug — loyiha sahifasining manzili: /projects/weather
//   Matnlar uch tilda: { uz: '...', ru: '...', en: '...' }
const PROJECTS = [
  {
    slug: 'portfolio',
    title: 'Shaxsiy portfolio',
    description: {
      uz: "Siz hozir ko'rib turgan sayt. Ichida API bilan ishlaydigan demo do'kon, mahsulot sahifasi va Telegramga xabar yuboradigan aloqa formasi bor.",
      ru: 'Сайт, который вы сейчас смотрите. Внутри — демо-магазин на API, страница товара и форма связи, отправляющая сообщения в Telegram.',
      en: "The site you're looking at right now. It includes a demo shop powered by an API, a product page and a contact form that sends messages to Telegram.",
    },
    features: [
      { uz: 'Qidiruv, kategoriya va sahifalash', ru: 'Поиск, категории и пагинация', en: 'Search, categories and pagination' },
      { uz: 'Mahsulot sahifasi: rasmlar, reyting, sharhlar', ru: 'Страница товара: фото, рейтинг, отзывы', en: 'Product page: images, rating, reviews' },
      { uz: 'Telegram bot orqali ishlaydigan forma', ru: 'Форма, работающая через Telegram-бота', en: 'A form that works through a Telegram bot' },
      { uz: "Uch til, qorong'i va yorug' rejim", ru: 'Три языка, тёмная и светлая тема', en: 'Three languages, dark and light mode' },
    ],
    tech: ['React', 'React Router', 'SCSS', 'Vite', 'Vercel'],
    folder: 'portfolio',
    live: { to: '/shop', labelKey: 'projects.shopDemo' },
    github: 'https://github.com/oybekovasadbek650-stack/partfolio.uz',
  },
  {
    slug: 'algora',
    title: 'Algora',
    description: {
      uz: "Sun'iy intellekt asosidagi talaba yordamchisi g'oyasini taqdim etish uchun yaratilgan interaktiv prezentatsiya sayti. PowerPoint o'rniga brauzerda ochiladigan, scroll bilan boshqariladigan 9 ta slayd.",
      ru: 'Интерактивный сайт-презентация идеи ИИ-помощника для студентов. Вместо PowerPoint — 9 слайдов в браузере, которые листаются прокруткой.',
      en: 'An interactive presentation site pitching an AI-powered student assistant. Instead of PowerPoint: 9 slides in the browser, driven by scrolling.',
    },
    features: [
      {
        uz: 'Sahifa aylantirilganda oldinga-orqaga yuradigan video fon',
        ru: 'Видеофон, который проигрывается вперёд и назад при прокрутке',
        en: 'A video background that plays forward and backward as you scroll',
      },
      {
        uz: 'Canvas bilan chizilgan jonli fon, animatsion grafik va raqamlar',
        ru: 'Живой фон на Canvas, анимированные графики и цифры',
        en: 'A live Canvas background, animated charts and numbers',
      },
      {
        uz: "Klaviatura bilan boshqarish: strelkalar, 1–9, F — to'liq ekran, P — PDF",
        ru: 'Управление с клавиатуры: стрелки, 1–9, F — полный экран, P — PDF',
        en: 'Keyboard controls: arrows, 1–9, F for fullscreen, P for PDF',
      },
      {
        uz: "Ma'ruza rejimi va slaydlar bo'yicha progress ko'rsatkichi",
        ru: 'Режим докладчика и индикатор прогресса по слайдам',
        en: 'Presenter mode and a slide progress indicator',
      },
    ],
    tech: ['React', 'Vite', 'Canvas API', 'CSS', 'Vercel'],
    folder: 'algora',
    live: { href: 'https://tajriba-six.vercel.app/' },
    github: 'https://github.com/oybekovasadbek650-stack/tajriba',
  },
  {
    slug: 'eslatmalar',
    title: 'Eslatmalar',
    description: {
      uz: "Eslatmalarni yozish, tahrirlash va o'chirish mumkin bo'lgan qulay ilova. Ma'lumotlar brauzerda saqlanadi, sahifani yangilasangiz ham yo'qolmaydi.",
      ru: 'Удобное приложение для заметок: их можно создавать, редактировать и удалять. Данные хранятся в браузере и не пропадают после перезагрузки.',
      en: "A handy notes app: write, edit and delete notes. Data is stored in the browser, so nothing is lost when you reload the page.",
    },
    features: [
      { uz: "Eslatma qo'shish, tahrirlash va o'chirish", ru: 'Добавление, редактирование и удаление заметок', en: 'Add, edit and delete notes' },
      { uz: "Jadval va ro'yxat ko'rinishi o'rtasida almashish", ru: 'Переключение между сеткой и списком', en: 'Switch between grid and list view' },
      { uz: "Eslatmalar bo'yicha qidiruv", ru: 'Поиск по заметкам', en: 'Search through notes' },
      { uz: "Ikki til: o'zbekcha va ruscha", ru: 'Два языка: узбекский и русский', en: 'Two languages: Uzbek and Russian' },
    ],
    tech: ['React', 'CSS', 'LocalStorage', 'Vite', 'Vercel'],
    folder: 'eslatma',
    live: { href: 'https://todolist-rouge-two.vercel.app/' },
    github: null,
  },
  {
    slug: 'toychi',
    title: 'Toychi.uz',
    description: {
      uz: "Onlayn to'y taklifnomasi. Mehmon muhrni bosib taklifnomani ochadi, to'ygacha qolgan vaqtni ko'radi va kelish-kelmasligini shu yerning o'zida tasdiqlaydi.",
      ru: 'Онлайн-приглашение на свадьбу. Гость нажимает на печать, открывает приглашение, видит, сколько осталось до свадьбы, и сразу подтверждает, придёт ли.',
      en: 'An online wedding invitation. Guests tap the seal to open it, see a countdown to the wedding and confirm whether they are coming right on the page.',
    },
    features: [
      {
        uz: 'Muhrni bosib ochiladigan animatsion taklifnoma',
        ru: 'Анимированное приглашение, которое открывается нажатием на печать',
        en: 'An animated invitation that opens when you tap the seal',
      },
      {
        uz: "To'ygacha qolgan kun, soat, daqiqa va soniya hisoblagichi",
        ru: 'Обратный отсчёт до свадьбы: дни, часы, минуты и секунды',
        en: 'Countdown to the wedding in days, hours, minutes and seconds',
      },
      { uz: 'Juftlikning suratlari galereyasi', ru: 'Галерея фотографий пары', en: "A gallery of the couple's photos" },
      { uz: 'Kelishni tasdiqlash formasi va fon musiqasi', ru: 'Форма подтверждения и фоновая музыка', en: 'An RSVP form and background music' },
    ],
    tech: ['React', 'CSS', 'Vite', 'Vercel'],
    folder: 'toychi.uz',
    live: { href: 'https://toychi-uz.vercel.app/' },
    github: 'https://github.com/oybekovasadbek650-stack/toychi_uz',
  },
  {
    slug: 'where-the-sky-begins',
    title: 'Where the Sky Begins',
    description: {
      uz: "Tog'lar mavzusidagi landing sahifa: katta hero rasm, toza tipografiya va qulay navigatsiya.",
      ru: 'Лендинг на тему гор: большое hero-изображение, чистая типографика и удобная навигация.',
      en: 'A mountain-themed landing page: a large hero image, clean typography and simple navigation.',
    },
    features: [
      { uz: 'Til tanlash (EN)', ru: 'Выбор языка (EN)', en: 'Language switcher (EN)' },
      { uz: "Yorug' va qorong'u rejim", ru: 'Светлая и тёмная тема', en: 'Light and dark mode' },
      { uz: "About, Catalog va Contacts bo'limlari", ru: 'Разделы About, Catalog и Contacts', en: 'About, Catalog and Contacts sections' },
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    folder: 'mountain',
    live: { href: 'https://oybekovasadbek650-stack.github.io/GITHUPGA-YANGGILIK-/' },
    github: 'https://github.com/oybekovasadbek650-stack/GITHUPGA-YANGGILIK-',
  },
  {
    slug: 'cinemas',
    title: 'Cinemas',
    description: {
      uz: 'Film va seriallar tomosha qilish platformasi uchun landing sahifa: katta hero banner, filmlar katalogi va kolleksiyalar.',
      ru: 'Лендинг для платформы фильмов и сериалов: большой hero-баннер, каталог фильмов и подборки.',
      en: 'A landing page for a movie and TV streaming platform: a big hero banner, a film catalog and collections.',
    },
    features: [
      {
        uz: "Filmlar, seriallar, multfilmlar va kolleksiyalar bo'limlari",
        ru: 'Разделы фильмов, сериалов, мультфильмов и подборок',
        en: 'Sections for movies, series, cartoons and collections',
      },
      {
        uz: 'Hero bannerda "Watch now" va "Download" tugmalari',
        ru: 'Кнопки «Watch now» и «Download» в hero-баннере',
        en: '"Watch now" and "Download" buttons in the hero banner',
      },
      {
        uz: 'Marvel, Star Wars kabi franshiza kolleksiyalari',
        ru: 'Подборки франшиз вроде Marvel и Star Wars',
        en: 'Franchise collections like Marvel and Star Wars',
      },
      { uz: 'Google Play va App Store havolalari', ru: 'Ссылки на Google Play и App Store', en: 'Google Play and App Store links' },
    ],
    tech: ['HTML', 'CSS', 'Vercel'],
    folder: 'cinemas',
    live: { href: 'https://sinemas-lovat.vercel.app/' },
    github: 'https://github.com/oybekovasadbek650-stack/uy-ishi',
  },
  {
    slug: 'dburger',
    title: 'dBurger',
    description: {
      uz: "Burgerxona uchun onlayn buyurtma sahifasi: mahsulotlarni savatchaga qo'shish va umumiy narxni hisoblash.",
      ru: 'Страница онлайн-заказа для бургерной: добавление товаров в корзину и подсчёт итоговой суммы.',
      en: 'An online ordering page for a burger place: add items to the cart and get the total price.',
    },
    features: [
      { uz: 'Mahsulot kartochkalari narxlari bilan', ru: 'Карточки товаров с ценами', en: 'Product cards with prices' },
      {
        uz: "Savatchaga qo'shish va mahsulot sonini ko'rsatish",
        ru: 'Добавление в корзину и счётчик товаров',
        en: 'Add to cart with an item counter',
      },
      { uz: 'Umumiy narxni avtomatik hisoblash', ru: 'Автоматический подсчёт суммы', en: 'Automatic total calculation' },
      { uz: 'Telefon ekraniga moslashuv', ru: 'Адаптация под телефон', en: 'Mobile-friendly layout' },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    folder: 'burger',
    live: { href: 'https://d-burger-kohl.vercel.app/' },
    github: null,
  },
  {
    slug: 'november',
    title: 'November',
    description: {
      uz: "Yaqin inson uchun maxsus tayyorlangan sovg'a-sayt. Ichkariga faqat 4 ta savolga to'g'ri javob bergan odam kira oladi, keyin uni musiqa va maxfiy xat kutib turadi.",
      ru: 'Сайт-подарок, сделанный для близкого человека. Войти можно, только правильно ответив на 4 вопроса, а внутри ждут музыка и тайное письмо.',
      en: 'A gift website made for someone special. Only a person who answers 4 questions correctly can get in, and inside, music and a secret letter are waiting.',
    },
    features: [
      {
        uz: "4 ta savoldan iborat \"maxfiy kirish\" va progress ko'rsatkichi",
        ru: '«Секретный вход» из 4 вопросов с индикатором прогресса',
        en: 'A 4-question "secret entrance" with a progress indicator',
      },
      {
        uz: 'Aylanadigan vinil plastinkali musiqa pleyeri',
        ru: 'Музыкальный плеер с вращающейся виниловой пластинкой',
        en: 'A music player with a spinning vinyl record',
      },
      { uz: 'Bosganda ochiladigan animatsion xat', ru: 'Анимированное письмо, открывающееся по нажатию', en: 'An animated letter that opens on tap' },
      {
        uz: 'Uchib yuruvchi yuraklar va yulduzli fon animatsiyasi',
        ru: 'Летающие сердечки и звёздный фон',
        en: 'Floating hearts and a starry background',
      },
    ],
    tech: ['React', 'CSS', 'Vite', 'Vercel'],
    folder: 'novermber',
    live: { href: 'https://november-3.vercel.app/' },
    github: 'https://github.com/oybekovasadbek650-stack/november-3',
  },
]

// Har bir loyihaga rasmlari qo'shib qo'yiladi (bir marta hisoblanadi)
export const projects = PROJECTS.map((p) => ({ ...p, images: imagesFor(p.folder) }))

export const findProject = (slug) => projects.find((p) => p.slug === slug)

export const GITHUB_USER = 'oybekovasadbek650-stack'
export const TELEGRAM_URL = 'https://t.me/oybekovasadbek'
