import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We will get back to you soon.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <SEO title="Contact" />
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">Get In Touch</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-white/60 max-w-xl mx-auto">Have questions? Our concierge team is here to help you find the perfect piece.</p>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-2 gap-12">
            <AnimateOnScroll variant="slideLeft">
              <div className="space-y-6">
                {[
                  { icon: FiMail, label: 'Email', value: 'hello@zahara.com' },
                  { icon: FiPhone, label: 'Phone', value: '+91 98765 43210' },
                  { icon: FiMapPin, label: 'Address', value: 'Luxury Plaza, Bandra West, Mumbai 400050' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 glass-card rounded-2xl p-6">
                    <item.icon className="text-gold shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-gold text-sm uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white/80">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="slideRight">
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 border border-gold/20 space-y-4">
                {['name', 'email', 'subject'].map((field) => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50 resize-none"
                />
                <button type="submit" className="w-full py-4 gold-gradient text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90">
                  Send Message <FiSend />
                </button>
              </form>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
