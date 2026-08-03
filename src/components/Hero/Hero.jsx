import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HERO_SLIDES } from '../../data/products'
import LazyImage from '../LazyImage'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Hero = () => (
  <section className="relative h-[100dvh] min-h-[500px] sm:min-h-[600px] w-full overflow-hidden">
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      speed={1200}
      autoplay={{
        delay: 30000, // Video duration
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      navigation
      loop
      className="h-full w-full"
    >
      {HERO_SLIDES.map((slide, i) => (
        <SwiperSlide key={i}>
          <div className="relative h-full w-full overflow-hidden">

            {slide.type === "video" ? (
              <div className="absolute inset-0">

                {/* Desktop Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2

w-auto
h-full
object-cover

md:min-w-full
md:min-h-full
md:h-auto
md:w-auto
md:rotate-[270deg]"
                >
                  <source src="/videos/hero-desktop.mp4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block md:hidden absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/videos/hero-mobile.mp4" type="video/mp4" />
                </video>

              </div>
            ) : (
              <LazyImage
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">ZAHARA Collections</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            Luxury Jewellery
            <br />
            <span className="gold-text-gradient">For Every Occasion</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
            Premium jewellery rentals for weddings, engagements, parties, festivals, and photoshoots.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/collections"
              className="px-6 py-3.5 sm:px-8 sm:py-4 min-h-[44px] inline-flex items-center justify-center gold-gradient text-black font-semibold rounded-full hover:scale-105 transition-transform luxury-shadow"
            >
              Explore Collection
            </Link>

          </div>
        </motion.div>
      </div>
    </div>
  </section>
)

export default Hero