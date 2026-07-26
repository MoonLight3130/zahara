import { Link, useLocation } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const BookingSuccess = () => {
  const { state } = useLocation()
  const bookingId = state?.bookingId || 'ZH-CONFIRMED'

  return (
    <>
      <SEO title="Booking Confirmed" />
      <div className="section-padding min-h-[60vh] flex items-center">
        <div className="max-w-lg mx-auto text-center">
          <AnimateOnScroll>
            <FiCheckCircle className="mx-auto text-gold mb-6" size={80} />
            <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-white/60 mb-2">Thank you for choosing Zahara.</p>
            <p className="text-gold font-semibold mb-8">Booking ID: {bookingId}</p>
            <p className="text-white/50 text-sm mb-8">
              A confirmation email has been sent. Our team will contact you shortly regarding delivery details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bookings" className="px-8 py-3 gold-gradient text-black font-semibold rounded-full">
                View Bookings
              </Link>
              <Link to="/collections" className="px-8 py-3 border border-gold/30 text-gold rounded-full hover:bg-gold/10">
                Continue Shopping
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

export default BookingSuccess
