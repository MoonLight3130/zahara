import { FiAward, FiCalendar, FiShield, FiTruck } from 'react-icons/fi'
import AnimateOnScroll from '../AnimateOnScroll'

const ICONS = { diamond: FiAward, calendar: FiCalendar, shield: FiShield, truck: FiTruck }

const FEATURES = [
  { title: 'Premium Quality', description: 'Authentic, handpicked luxury pieces curated for every occasion.', icon: 'diamond' },
  { title: 'Flexible Rental', description: 'Choose from 3 to 7 day rental periods that fit your schedule.', icon: 'calendar' },
  { title: 'Secure Payment', description: '100% secure checkout with encrypted payment processing.', icon: 'shield' },
  { title: 'Fast Delivery', description: 'Express doorstep delivery across major cities in 24-48 hours.', icon: 'truck' },
]

const Features = () => (
  <section className="section-padding bg-charcoal">
    <div className="max-w-7xl mx-auto">
      <AnimateOnScroll className="text-center mb-14">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">Why Zahara</p>
        <h2 className="text-3xl md:text-4xl font-bold">The Zahara Experience</h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[feature.icon]
          return (
            <AnimateOnScroll key={feature.title} delay={i * 0.1}>
              <div className="group glass-card rounded-2xl p-8 text-center border border-gold/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 luxury-shadow h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:gold-gradient transition-all duration-500">
                  <Icon className="text-gold group-hover:text-black transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gold">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </AnimateOnScroll>
          )
        })}
      </div>
    </div>
  </section>
)

export default Features
