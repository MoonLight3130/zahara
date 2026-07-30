import { motion } from 'framer-motion'

const AuthHeader = ({ title, subtitle, description }) => {
  return (
    <div className="text-center mb-7">
      {/* Logo badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="inline-block relative mb-5 group"
      >
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#B8941F] opacity-70 blur-sm group-hover:opacity-100 transition duration-500" />
        <img
          src="/logo.png"
          alt="Zahara Logo"
          className="relative h-16 w-16 mx-auto rounded-full object-cover shadow-xl border-2 border-[#D4AF37]"
        />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-white leading-tight"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="text-[11px] font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mt-1.5"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Description */}
      {description && (
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="text-white/45 text-sm mt-2.5 max-w-xs mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Gold ornament divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-center gap-2.5 mt-5"
      >
        <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#E8C547]" />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </motion.div>
    </div>
  )
}

export default AuthHeader
