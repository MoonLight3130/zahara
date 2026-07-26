import { motion } from 'framer-motion'
import { FiCheck, FiX } from 'react-icons/fi'

const PasswordStrength = ({ password = '' }) => {
  const checks = [
    { label: '8+ Characters', valid: password.length >= 8 },
    { label: 'Uppercase Letter', valid: /[A-Z]/.test(password) },
    { label: 'Lowercase Letter', valid: /[a-z]/.test(password) },
    { label: 'Number', valid: /[0-9]/.test(password) },
    { label: 'Special Character (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(password) },
  ]

  const passedCount = checks.filter((c) => c.valid).length

  const getStrengthLabel = () => {
    if (passedCount === 0) return { label: '', color: 'bg-stone-200', text: 'text-stone-400', pct: 0 }
    if (passedCount <= 2) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500', pct: 33 }
    if (passedCount <= 4) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-500', pct: 66 }
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500', pct: 100 }
  }

  const strength = getStrengthLabel()

  return (
    <div className="mb-5 p-3.5 bg-stone-50 border border-stone-200/80 rounded-xl space-y-3">
      <div className="flex items-center justify-between text-xs font-semibold">
        <span className="text-stone-600">Password Strength</span>
        <span className={strength.text}>{strength.label}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${strength.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${strength.pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Requirement List */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {checks.map((check, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
            {check.valid ? (
              <FiCheck className="text-emerald-500 shrink-0" size={12} />
            ) : (
              <FiX className="text-stone-300 shrink-0" size={12} />
            )}
            <span className={check.valid ? 'text-stone-700 font-medium' : 'text-stone-400'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordStrength
