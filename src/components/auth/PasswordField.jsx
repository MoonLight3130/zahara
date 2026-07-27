import { forwardRef, useState } from 'react'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'

const PasswordField = forwardRef(
  ({ label = 'Password', error, placeholder = '••••••••', className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-full text-left mb-4">
        {label && (
          <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-[#C49A3A] pointer-events-none">
            <FiLock size={18} />
          </div>
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            className={`w-full pl-11 pr-12 py-3.5 bg-white/5 text-white text-sm rounded-xl border ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-white/10 focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20'
            } transition-all duration-300 outline-none placeholder:text-white/30 ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-white/30 hover:text-[#D4AF37] transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

PasswordField.displayName = 'PasswordField'

export default PasswordField
