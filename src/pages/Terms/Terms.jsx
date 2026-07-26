import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const Terms = () => (
  <>
    <SEO title="Terms & Conditions" />
    <div className="section-padding">
      <div className="max-w-3xl mx-auto prose prose-invert">
        <AnimateOnScroll>
          <h1 className="text-4xl font-bold mb-8 text-gold">Terms & Conditions</h1>
          <div className="space-y-6 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Rental Agreement</h2>
              <p>By renting jewellery from Zahara, you agree to return all items in the same condition as received, subject to normal wear. Rental periods begin on the delivery date and end on the scheduled return date.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Security Deposit</h2>
              <p>A refundable security deposit is required for all rentals. Deposits are returned within 5-7 business days after item inspection, minus any applicable damage or late fees.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Cancellation Policy</h2>
              <p>Cancellations made 48 hours before delivery receive a full refund. Cancellations within 48 hours incur a 50% cancellation fee.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Liability</h2>
              <p>Renters are responsible for loss or damage beyond normal wear. Zahara maintains insurance during transit; renters are covered during the rental period per our insurance policy terms.</p>
            </section>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  </>
)

export default Terms
