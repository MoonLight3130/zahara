import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { formatPrice, generateBookingId, STORAGE_KEYS } from '../../utils/helpers'
import { bookingService } from '../../services/api'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, cartSummary, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const [, setBookings] = useLocalStorage(STORAGE_KEYS.BOOKINGS, [])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    payment: 'card',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to complete booking')
      navigate('/login')
      return
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)
    try {
      const booking = {
        id: generateBookingId(),
        items: cartItems,
        ...form,
        subtotal: cartSummary.subtotal,
        deposit: cartSummary.deposit,
        total: cartSummary.total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
      await bookingService.createBooking(booking)
      setBookings((prev) => [booking, ...prev])
      clearCart()
      toast.success('Booking confirmed!')
      navigate('/booking-success', { state: { bookingId: booking.id } })
    } catch {
      toast.error('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="section-padding text-center">
        <p className="text-white/60 mb-4">No items to checkout</p>
        <Link to="/collections" className="text-gold hover:underline">Browse Collections</Link>
      </div>
    )
  }

  return (
    <>
      <SEO title="Checkout" />
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll className="mb-12">
            <h1 className="text-4xl font-bold">Checkout</h1>
          </AnimateOnScroll>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gold mb-6">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email', 'phone', 'city', 'pincode'].map((field) => (
                    <input
                      key={field}
                      name={field}
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50 capitalize"
                    />
                  ))}
                  <textarea
                    name="address"
                    placeholder="Full Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="sm:col-span-2 px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50 resize-none"
                  />
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-gold mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {['card', 'upi', 'cod'].map((method) => (
                    <label key={method} className="flex items-center gap-3 p-4 border border-white/10 rounded-xl cursor-pointer hover:border-gold/30 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={form.payment === method}
                        onChange={handleChange}
                        className="accent-gold"
                      />
                      <span className="uppercase">{method === 'cod' ? 'Cash on Delivery' : method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-gold/20 h-fit sticky top-28">
              <h2 className="text-xl font-semibold text-gold mb-6">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex justify-between text-sm mb-3 pb-3 border-b border-white/5">
                  <span className="text-white/70 truncate mr-2">{item.name}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between"><span className="text-white/60">Rental</span><span>{formatPrice(cartSummary.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-white/60">Deposit</span><span>{formatPrice(cartSummary.deposit)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-white/10">
                  <span>Total</span><span className="text-gold">{formatPrice(cartSummary.total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 gold-gradient text-black font-semibold rounded-2xl hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {loading ? 'Processing...' : 'Place Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Checkout
