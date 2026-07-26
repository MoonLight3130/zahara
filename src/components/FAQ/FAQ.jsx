import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import { FAQ_DATA } from '../../data/products'
import AnimateOnScroll from '../AnimateOnScroll'
import { Link } from 'react-router-dom'

const FAQ = ({ limit, showViewAll = true }) => {
  const [openIndex, setOpenIndex] = useState(0)
  const items = limit ? FAQ_DATA.slice(0, limit) : FAQ_DATA

  return (
    <section className="section-padding bg-charcoal">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        </AnimateOnScroll>

        <div className="space-y-3">
          {items.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 0.05}>
              <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:text-gold transition-colors"
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <FiChevronDown
                    className={`text-gold shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-white/60 leading-relaxed text-sm">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {showViewAll && limit && (
          <div className="text-center mt-8">
            <Link to="/faq" className="text-gold hover:underline text-sm tracking-wider uppercase">
              View All FAQs
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FAQ
