import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const Privacy = () => (
  <>
    <SEO title="Privacy Policy" />
    <div className="section-padding">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll>
          <h1 className="text-4xl font-bold mb-8 text-gold">Privacy Policy</h1>
          <div className="space-y-6 text-white/70 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
              <p>We collect personal information including name, email, phone number, and delivery address when you create an account or place a booking. Payment information is processed securely through our payment partners.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Data</h2>
              <p>Your information is used to process bookings, deliver jewellery, communicate about your orders, and improve our services. We never sell your personal data to third parties.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Data Security</h2>
              <p>We implement industry-standard encryption and security measures to protect your personal information. Access to your data is restricted to authorized personnel only.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
              <p>For privacy-related inquiries, contact us at privacy@zahara.com</p>
            </section>
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  </>
)

export default Privacy
