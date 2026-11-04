import axios from 'axios'

export async function getProducts() {
  const res = await axios.get('https://dummyjson.com/products?limit=0')
  return res.data.products
}

export async function getProductById(id) {
  const res = await axios.get(`https://dummyjson.com/products/${id}`)
  return res.data
}