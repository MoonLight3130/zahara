import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa6'
import { FiPhone } from 'react-icons/fi'

const SocialLogin = ({ onGoogle, onApple, onPhone }) => {
  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-full border-t border-stone-200"></div>
        <span className="absolute bg-[#FAF7F2] px-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
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
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white border border-stone-200 rounded-xl text-stone-700 text-xs font-medium hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
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
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white border border-stone-200 rounded-xl text-stone-700 text-xs font-medium hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
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
          className="flex items-center justify-center gap-2 py-3 px-3 bg-white border border-stone-200 rounded-xl text-stone-700 text-xs font-medium hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
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
