import { forwardRef } from 'react'

const InputField = forwardRef(
  ({ label, icon: Icon, type = 'text', error, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left mb-4">
        {label && (
          <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-4 text-[#C49A3A] pointer-events-none transition-colors">
              <Icon size={18} />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`w-full ${
              Icon ? 'pl-11' : 'pl-4'
            } pr-4 py-3.5 bg-white text-[#111111] text-sm rounded-xl border ${
              error
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-stone-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
            } shadow-sm transition-all duration-300 outline-none placeholder:text-stone-400 ${className}`}
            {...props}
          />
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

InputField.displayName = 'InputField'

export default InputField
