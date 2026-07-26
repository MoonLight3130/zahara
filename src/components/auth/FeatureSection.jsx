import { FiShield, FiRefreshCw, FiLock, FiTruck } from 'react-icons/fi'

const FEATURES = [
  { icon: FiShield, title: 'Premium Quality' },
  { icon: FiRefreshCw, title: 'Flexible Rental' },
  { icon: FiLock, title: 'Secure Payment' },
  { icon: FiTruck, title: 'On-Time Delivery' },
]

const FeatureSection = () => {
  return (
    <div className="mt-8 pt-6 border-t border-stone-200/80">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={idx} className="flex flex-col items-center group">
              <div className="p-2.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/30 text-[#C49A3A] group-hover:bg-[#111111] group-hover:text-[#D4AF37] transition-all duration-300 mb-1.5 shadow-sm">
                <Icon size={16} />
              </div>
              <span className="text-[11px] font-medium text-stone-600 tracking-tight leading-tight">
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
