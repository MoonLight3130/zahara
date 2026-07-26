import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'
import { TESTIMONIALS } from '../../data/products'
import AnimateOnScroll from '../AnimateOnScroll'
import 'swiper/css'
import 'swiper/css/pagination'

const Testimonials = () => (
  <section className="section-padding bg-charcoal">
    <div className="max-w-7xl mx-auto">
      <AnimateOnScroll className="text-center mb-14">
        <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
      </AnimateOnScroll>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        className="pb-12"
      >
        {TESTIMONIALS.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="glass-card rounded-2xl p-8 border border-gold/10 h-full">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FiStar key={i} className="text-gold fill-gold" size={16} />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-gold">{t.name}</p>
                <p className="text-sm text-white/50">{t.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
)

export default Testimonials
