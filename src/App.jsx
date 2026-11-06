import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Contact from './pages/contact/Contact'
import Projects from './pages/projects/Projects'
import ProjectDetail from './pages/projects/ProjectDetail'
import About from './pages/about/About'
import Skills from './pages/skills/Skills'
import Services from './pages/services/Services'
import Blog from './pages/blog/Blog'
import Post from './pages/blog/Post'
import Shop from './pages/shop/Shop'
import ProductDetail from './pages/shop/ProductDetail/ProductDetail'
import Cart from './pages/cart/Cart'
import Notfound from './pages/notfound/Notfound'
import Background from './components/background/Background'
import TelegramButton from './components/telegram/TelegramButton'

function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  // Sahifa almashganda: eskisi yuqoriga suzib yo'qoladi, yangisi pastdan chiqadi
  const transition = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      <Background />
      <ScrollToTop />
      <TelegramButton />
      <Navbar />
      {/* Eski sahifa yo'qolgach, yangisi tepadan boshlanadi */}
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div key={location.pathname} {...transition}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
