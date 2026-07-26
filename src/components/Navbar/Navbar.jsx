import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiMenu, FiX, FiUser } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Categories', path: '/collections#categories' },
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartItems, wishlist } = useCart()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-card shadow-xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Zahara" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover transition-transform group-hover:scale-105" />
          <div className="hidden sm:block">
            <span className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold gold-text-gradient tracking-widest">ZAHARA</span>
            <p className="text-[10px] text-gold/70 tracking-[0.3em] uppercase">Rent. Wear. Shine.</p>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-sm text-white/80 hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/wishlist" className="relative p-2 text-white/80 hover:text-gold transition-colors" aria-label="Wishlist">
            <FiHeart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 text-white/80 hover:text-gold transition-colors" aria-label="Cart">
            <FiShoppingBag size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link
              to="/profile"
              className="hidden md:flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full text-sm text-gold hover:bg-gold/10 transition-all"
            >
              <FiUser size={16} />
              {user?.name?.split(' ')[0]}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden md:block px-5 py-2 gold-gradient text-black text-sm font-semibold rounded-full hover:opacity-90 transition-opacity luxury-shadow"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            className="lg:hidden p-2 text-gold"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden glass-card border-t border-white/10"
      >
        <ul className="px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-lg text-white/90 hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-2 gold-gradient text-black font-semibold rounded-full"
            >
              {isAuthenticated ? 'My Profile' : 'Login'}
            </Link>
          </li>
        </ul>
      </motion.div>
    </header>
  )
}

export default Navbar
