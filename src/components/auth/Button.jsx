import { motion } from 'framer-motion'
import { FiLoader } from 'react-icons/fi'

const Button = ({
  children,
  type = 'submit',
  variant = 'black',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'w-full py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md'

  const variants = {
    black:
      'bg-[#111111] text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37] active:scale-[0.99]',
    gold:
      'gold-gradient-button hover:opacity-95 active:scale-[0.99]',
    outline:
      'bg-transparent text-[#111111] border border-stone-300 hover:border-[#D4AF37] hover:text-[#D4AF37]',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.black} ${
        disabled || loading ? 'opacity-60 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <FiLoader className="animate-spin" size={18} />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
