import axios from 'axios'

// Mahsulotlar dummyjson.com'dan olinadi, lekin brauzer unga to'g'ridan-to'g'ri murojaat qilmaydi:
// so'rov o'z saytimizning /dummy manziliga ketadi, u yerdan dummyjson'ga uzatiladi
// (lokalda — vite.config.js dagi proxy, internetda — vercel.json dagi rewrite).
// Shunda reklama bloklovchi, VPN yoki provayder dummyjson'ni to'sib qo'ysa ham do'kon ishlaydi.
// So'rov 15 soniyadan oshsa, cheksiz kutib qolmasdan xato beradi.
const api = axios.create({ baseURL: '/dummy', timeout: 15000 })

// Rasmlar ham xuddi shunday o'z saytimiz orqali yuklanadi
const CDN = 'https://cdn.dummyjson.com/'
const proxyImg = (url) => (typeof url === 'string' && url.startsWith(CDN) ? `/dummy-cdn/${url.slice(CDN.length)}` : url)

function withProxiedImages(product) {
  return {
    ...product,
    thumbnail: proxyImg(product.thumbnail),
    images: product.images?.map(proxyImg),
  }
}

export async function getProducts() {
  const res = await api.get('/products?limit=0')
  return res.data.products.map(withProxiedImages)
}

export async function getProductById(id) {
  const res = await api.get(`/products/${id}`)
  return withProxiedImages(res.data)
}
