import { HOW_IT_WORKS } from '../../data/products'
import AnimateOnScroll from '../AnimateOnScroll'

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <AnimateOnScroll className="text-center mb-16">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">Simple Process</p>
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
      </AnimateOnScroll>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS.map((step, i) => (
            <AnimateOnScroll key={step.step} variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={i * 0.15}>
              <div className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center text-black font-bold text-xl relative z-10 luxury-shadow">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gold">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default HowItWorks
