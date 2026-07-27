import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiAward, FiCheckCircle } from 'react-icons/fi'

const AuthLayout = ({ children, title = 'Authentication', badgeText = 'Exclusive Jewellery Collection' }) => {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-between font-[family-name:var(--font-body)]">
      {/* Top Bar Navigation */}
      <header className="absolute top-0 left-0 right-0 z-20 px-6 py-5 flex items-center justify-between pointer-events-none">
        <Link
          to="/"
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A]/80 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10 shadow-md hover:border-[#D4AF37] hover:text-[#C49A3A] transition-all duration-300 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Store</span>
        </Link>
      </header>

      {/* Main Split Screen */}
      <div className="min-h-screen grid lg:grid-cols-12 w-full">
        {/* LEFT SIDE - Split Screen Image (Desktop) / Top Banner (Mobile) */}
        <div className="lg:col-span-6 xl:col-span-7 relative overflow-hidden flex flex-col justify-between p-8 lg:p-12 text-white bg-[#0A0A0A] min-h-[300px] lg:min-h-screen">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85"
              alt="Luxury Jewellery"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 hover:scale-110 opacity-50"
            />
            {/* Soft Gold Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-[#D4AF37]/10 to-transparent"></div>
          </div>

          {/* Left Header Logo (Desktop) */}
          <div className="relative z-10 hidden lg:flex items-center gap-3 pt-4">
            <div className="h-10 w-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-black/50">
                <span className="text-[#D4AF37] font-bold text-lg">Z</span>
            </div>
            <div>
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-widest text-[#D4AF37]">
                ZAHARA
              </span>
              <p className="text-[9px] text-white/70 tracking-[0.25em] uppercase">Rent. Wear. Shine.</p>
            </div>
          </div>

          {/* Left Content Banner & Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 mt-auto pt-16 lg:pt-0 max-w-lg"
          >
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/50 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium mb-4">
              <FiAward size={14} />
              <span>{badgeText}</span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-4">
              Elegance Without <span className="gold-text-gradient italic">Compromise</span>.
            </h2>

            <p className="text-white/60 text-sm leading-relaxed mb-6 font-light hidden sm:block">
              Experience handcrafted bridal polki, royal emeralds, and diamond jewellery rentals tailored for your unforgettable celebrations.
            </p>

            {/* Micro Testimonial / Trust Points */}
            <div className="hidden lg:flex items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#D4AF37]" size={16} />
                <span className="text-xs text-white/70 font-medium">100% Insured Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#D4AF37]" size={16} />
                <span className="text-xs text-white/70 font-medium">Verified Authenticity</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Authentication Card Container */}
        <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10 bg-[#111111]">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-[480px] bg-[#1A1A1A] rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Top decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 gold-gradient"></div>

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
