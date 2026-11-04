import ScrollToTop from './ScrollToTop/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Contact from './pages/contact/Contact'
import Projects from './pages/projects/Projects'
import About from './pages/about/About'
import Skills from './pages/skills/Skills'
import Shop from './pages/shop/Shop'
import ProductDetail from './pages/shop/ProductDetail/ProductDetail'
import Cart from './pages/cart/Cart'
import Notfound from './pages/notfound/Notfound'
import Background from './components/background/Background'

function App() {
  return (
    <>
      <Background />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App