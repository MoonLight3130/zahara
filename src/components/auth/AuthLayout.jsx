import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiCheckCircle,
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import GoldParticles from './GoldParticles'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Collections', path: '/collections' },
  { label: 'Categories', path: '/collections#categories' },
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const AuthNavbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems = [], wishlist = [] } = useCart() || {}
  const { user } = useAuth() || {}

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
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
        scrolled
          ? 'bg-[#0F0F0F]/90 backdrop-blur-xl shadow-xl border-b border-[rgba(212,175,55,0.12)] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="Zahara Home">
          <div className="h-10 w-10 rounded-full border-2 border-[#D4AF37]/60 flex items-center justify-center bg-black/50 group-hover:border-[#D4AF37] transition-all duration-300">
            <span className="text-[#D4AF37] font-bold text-lg font-[family-name:var(--font-heading)]">Z</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-widest text-[#D4AF37]">
              ZAHARA
            </span>
            <p className="text-[9px] text-white/50 tracking-[0.25em] uppercase">Rent. Wear. Shine.</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#D4AF37] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/wishlist" className="relative p-2 text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="Wishlist">
            <FiHeart size={19} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="Cart">
            <FiShoppingBag size={19} />
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 rounded-full text-sm text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
            aria-label="Profile"
          >
            <FiUser size={15} />
            <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#D4AF37]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden overflow-hidden bg-[#0F0F0F]/95 backdrop-blur-xl border-t border-[rgba(212,175,55,0.15)]"
      >
        <ul className="px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-base text-white/80 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-2 bg-gradient-to-r from-[#D4AF37] via-[#C49A3A] to-[#E8C547] text-black font-semibold rounded-full text-sm"
            >
              My Profile
            </Link>
          </li>
        </ul>
      </motion.div>
    </header>
  )
}

const AuthLayout = ({
  children,
  heroTitle = 'Welcome Back',
  heroSubtitle = 'Continue your luxury jewellery rental journey with ZAHARA.',
  badgeText = 'Member Portal',
}) => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col font-[family-name:var(--font-body)]">
      {/* Full Navbar */}
      <AuthNavbar />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* ── LEFT HERO PANEL ── */}
        <div className="hidden lg:flex lg:w-[55%] xl:w-[58%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85"
              alt="Luxury Jewellery"
              className="w-full h-full object-cover object-center scale-105 opacity-40"
              style={{ transition: 'transform 12s ease-in-out' }}
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/70 to-[#0F0F0F]/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/60 via-transparent to-transparent" />
          </div>

          {/* Gold particles */}
          <GoldParticles />

          {/* Logo — top */}
          <div className="relative z-20 mt-20 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full border-2 border-[#D4AF37]/70 flex items-center justify-center bg-black/50">
              <span className="text-[#D4AF37] font-bold text-xl font-[family-name:var(--font-heading)]">Z</span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-widest text-[#D4AF37]">
                ZAHARA
              </span>
              <p className="text-[10px] text-white/50 tracking-[0.3em] uppercase">Rent. Wear. Shine.</p>
            </div>
          </div>

          {/* Hero content — bottom */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="relative z-20 max-w-lg"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/60 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>{badgeText}</span>
            </div>

            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[0.3em] mb-3">
              RENT. WEAR. SHINE.
            </p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white mb-4">
              {heroTitle}
            </h1>

            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">
              {heroSubtitle}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-5 pt-6 border-t border-white/10">
              {[
                'Secure Login',
                'Fast Checkout',
                'Verified Customers',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#D4AF37] flex-shrink-0" size={15} />
                  <span className="text-xs text-white/60 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT LOGIN PANEL ── */}
        <div className="w-full lg:w-[45%] xl:w-[42%] flex flex-col items-center justify-center px-4 sm:px-8 py-8 bg-[#0F0F0F] relative min-h-screen pt-24 lg:pt-20">
          {/* Subtle radial glow behind card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative z-10 w-full"
            style={{ maxWidth: '420px' }}
          >
            {/* Card */}
            <div
              className="relative rounded-[20px] overflow-hidden shadow-2xl"
              style={{
                background: '#171717',
                border: '1px solid rgba(212,175,55,0.25)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Top gold stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#B8941F] via-[#D4AF37] to-[#E8C547]" />

              {/* Card inner */}
              <div className="px-7 pt-8 pb-7 sm:px-9 sm:pt-9 sm:pb-8">
                {children}
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="relative z-10 mt-8 text-center">
            <p className="text-[11px] text-white/25">
              © 2026 ZAHARA. All Rights Reserved.{' '}
              <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>{' '}
              ·{' '}
              <Link to="/terms" className="hover:text-[#D4AF37] transition-colors underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
