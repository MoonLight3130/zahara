import { FiShield, FiZap, FiCheckCircle, FiTruck } from 'react-icons/fi'

const FEATURES = [
  { icon: FiShield, title: 'Secure Login' },
  { icon: FiZap, title: 'Fast Checkout' },
  { icon: FiCheckCircle, title: 'Verified' },
  { icon: FiTruck, title: 'On-Time Delivery' },
]

const FeatureSection = () => {
  return (
    <div className="mt-7 pt-6 border-t border-white/[0.08]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="p-2 rounded-full bg-white/[0.04] border border-[#D4AF37]/20 text-[#C49A3A] group-hover:bg-[#D4AF37]/15 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-all duration-300">
                <Icon size={14} />
              </div>
              <span className="text-[10px] font-medium text-white/40 group-hover:text-white/60 tracking-tight leading-tight transition-colors duration-300">
                {item.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeatureSection
