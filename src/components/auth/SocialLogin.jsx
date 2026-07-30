import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa6'

const SocialLogin = ({ onGoogle, onApple, onFacebook }) => {
  const buttons = [
    {
      label: 'Google',
      icon: <FcGoogle size={18} />,
      onClick: onGoogle,
      id: 'social-google-btn',
    },
    {
      label: 'Facebook',
      icon: <FaFacebook size={18} className="text-[#1877F2]" />,
      onClick: onFacebook,
      id: 'social-facebook-btn',
    },
    {
      label: 'Apple',
      icon: <FaApple size={18} className="text-white" />,
      onClick: onApple,
      id: 'social-apple-btn',
    },
  ]

  return (
    <div className="mt-6">
      {/* Divider */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-x-0 h-px bg-white/10" />
        <span className="relative bg-[#171717] px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30">
          OR
        </span>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {buttons.map((btn) => (
          <motion.button
            key={btn.label}
            id={btn.id}
            whileHover={{ scale: 1.04, borderColor: 'rgba(212,175,55,0.6)' }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={btn.onClick}
            className="flex items-center justify-center gap-2 py-3 px-3 bg-white/[0.04] border border-white/10 rounded-xl text-white/60 text-xs font-medium hover:text-[#D4AF37] hover:bg-white/[0.07] transition-all duration-300"
            title={`Continue with ${btn.label}`}
            aria-label={`Continue with ${btn.label}`}
          >
            {btn.icon}
            <span className="hidden sm:inline">{btn.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default SocialLogin
