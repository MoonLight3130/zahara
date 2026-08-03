import { forwardRef, useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const PasswordField = forwardRef(
  ({ label = 'Password', error, placeholder = '••••••••', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-full text-left mb-4">
        {label && (
          <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-[0.12em] mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          <div className="absolute left-4 text-[#C49A3A] pointer-events-none z-10 transition-colors duration-300 group-focus-within:text-[#D4AF37]">
            <FiLock size={17} />
          </div>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full pl-11 pr-12 py-3.5 text-white text-base rounded-xl border outline-none transition-all duration-300 placeholder:text-white/25 ${
              error
                ? 'bg-red-500/5 border-red-500/60 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                : 'bg-white/[0.04] border-white/10 hover:border-white/20 focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/15 focus:bg-white/[0.06]'
            } ${className}`}
            style={{ fontFamily: 'Poppins, sans-serif' }}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 touch-target text-white/30 hover:text-[#D4AF37] transition-colors duration-300 focus:outline-none z-10"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
          </button>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1.5">
            <span className="inline-block w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)

PasswordField.displayName = 'PasswordField'

export default PasswordField
