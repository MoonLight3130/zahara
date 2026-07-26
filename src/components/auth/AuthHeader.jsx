import { motion } from 'framer-motion'

const AuthHeader = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-8">
      {/* Uploaded ZR Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="inline-block relative mb-5 group"
      >
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#B8941F] opacity-75 blur-sm group-hover:opacity-100 transition duration-500"></div>
        <img
          src="/logo.png"
          alt="Zahara Logo"
          className="relative h-16 w-16 md:h-20 md:w-20 mx-auto rounded-full object-cover shadow-xl border-2 border-[#D4AF37]"
        />
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111111]"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm font-semibold tracking-wider text-[#C49A3A] uppercase mt-1"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Description */}
      {description && (
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-stone-500 text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Gold Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-2 mt-5"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
      </motion.div>
    </div>
  )
}

export default AuthHeader
