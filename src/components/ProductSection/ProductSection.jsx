import { Link } from 'react-router-dom'
import ProductCard from '../ProductCard/ProductCard'
import AnimateOnScroll from '../AnimateOnScroll'

/** Reusable product grid section for home page */
const ProductSection = ({ title, subtitle, products, viewAllLink }) => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto">
      <AnimateOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-3">{subtitle}</p>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-gold hover:underline text-sm tracking-wider uppercase">
            View All
          </Link>
        )}
      </AnimateOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <AnimateOnScroll key={product.id} delay={i * 0.05}>
            <ProductCard
              product={product}
              showBadge={product.isBestSeller ? 'Trending' : product.isNew ? 'New' : null}
            />
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  </section>
)

export default ProductSection
