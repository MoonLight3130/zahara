import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa6'
import { FiPhone } from 'react-icons/fi'

const SocialLogin = ({ onGoogle, onApple, onPhone }) => {
  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-full border-t border-white/10"></div>
        <span className="absolute bg-[#1A1A1A] px-3 text-xs font-semibold uppercase tracking-widest text-white/30">
          OR
        </span>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onGoogle}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-xs font-medium hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300 group"
          title="Continue with Google"
        >
          <FcGoogle size={18} />
          <span className="hidden sm:inline">Google</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onApple}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-xs font-medium hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300 group"
          title="Continue with Apple"
        >
          <FaApple size={18} className="text-black" />
          <span className="hidden sm:inline">Apple</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onPhone}
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white/5 border border-white/10 rounded-xl text-white/70 text-xs font-medium hover:border-[#D4AF37]/60 hover:text-[#D4AF37] transition-all duration-300 group"
          title="Continue with Phone"
        >
          <FiPhone size={18} className="text-[#C49A3A]" />
          <span className="hidden sm:inline">Phone</span>
        </motion.button>
      </div>
    </div>
  )
}

export default SocialLogin
