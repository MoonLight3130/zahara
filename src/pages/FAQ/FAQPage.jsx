import SEO from '../../components/SEO'
import FAQ from '../../components/FAQ/FAQ'
import AnimateOnScroll from '../../components/AnimateOnScroll'

const FAQPage = () => (
  <>
    <SEO title="FAQ" />
    <div className="pt-8">
      <AnimateOnScroll className="text-center mb-4 section-padding pb-0">
        <h1 className="text-4xl font-bold">Help Center</h1>
      </AnimateOnScroll>
      <FAQ showViewAll={false} />
    </div>
  </>
)

export default FAQPage
