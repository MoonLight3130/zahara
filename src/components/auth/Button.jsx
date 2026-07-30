import { motion } from 'framer-motion'
import { FiLoader } from 'react-icons/fi'

const Button = ({
  children,
  type = 'submit',
  variant = 'gold',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'w-full py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden'

  const variants = {
    gold: `
      bg-[#D4AF37] text-[#0F0F0F]
      hover:bg-[#C79A2B] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)]
      active:scale-[0.99] font-[family-name:var(--font-body)] font-semibold
    `,
    black: `
      bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/30
      hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37]
      hover:shadow-[0_0_18px_rgba(212,175,55,0.35)] active:scale-[0.99]
    `,
    outline: `
      bg-transparent text-white border border-white/15
      hover:border-[#D4AF37]/60 hover:text-[#D4AF37]
      active:scale-[0.99]
    `,
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.gold} ${
        disabled || loading ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin" size={17} />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
