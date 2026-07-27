import { FiShield, FiRefreshCw, FiLock, FiTruck } from 'react-icons/fi'

const FEATURES = [
  { icon: FiShield, title: 'Premium Quality' },
  { icon: FiRefreshCw, title: 'Flexible Rental' },
  { icon: FiLock, title: 'Secure Payment' },
  { icon: FiTruck, title: 'On-Time Delivery' },
]

const FeatureSection = () => {
  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="flex flex-col items-center group">
              <div className="p-2.5 rounded-full bg-white/5 border border-[#D4AF37]/30 text-[#C49A3A] group-hover:bg-[#D4AF37]/20 group-hover:text-[#D4AF37] transition-all duration-300 mb-1.5">
                <Icon size={16} />
              </div>
              <span className="text-[11px] font-medium text-white/50 tracking-tight leading-tight">
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
