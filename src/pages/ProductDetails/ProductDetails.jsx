import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiHeart, FiStar, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import SEO from '../../components/SEO'
import ProductCard from '../../components/ProductCard/ProductCard'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import LazyImage from '../../components/LazyImage'
import { PRODUCTS } from '../../data/products'
import { getProductBySlug, formatPrice, calculateRentalTotal } from '../../utils/helpers'
import { useCart } from '../../context/CartContext'

const ProductDetails = () => {
  const { slug } = useParams()
  const product = getProductBySlug(PRODUCTS, slug)
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [duration, setDuration] = useState(product?.duration || 3)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'Free Size')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  if (!product) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/collections" className="text-gold hover:underline">Back to Collections</Link>
      </div>
    )
  }

  const rentalTotal = calculateRentalTotal(product.price, duration, quantity)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const inWishlist = isInWishlist(product.id)

  const handleRent = () => {
    addToCart(product, { startDate, endDate, duration, quantity, size: selectedSize })
  }

  return (
    <>
      <SEO title={product.name} description={product.description} />
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <AnimateOnScroll variant="slideLeft">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden glass-card group">
                  <LazyImage
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-gold' : 'border-white/10'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Product Info */}
            <AnimateOnScroll variant="slideRight">
              <div className="flex items-center gap-2 mb-3">
                <FiStar className="text-gold fill-gold" />
                <span>{product.rating}</span>
                <span className="text-white/40">({product.reviews} reviews)</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>

              <div className="glass-card rounded-2xl p-6 mb-6 border border-gold/20">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-gold">{formatPrice(product.price)}</span>
                  <span className="text-white/50">/ {product.duration} Days</span>
                </div>
                <p className="text-sm text-white/50">Security Deposit: {formatPrice(product.deposit)}</p>
                <p className="text-lg font-semibold text-gold mt-4">Total Rental: {formatPrice(rentalTotal)}</p>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="text-sm text-gold uppercase tracking-wider mb-3 block">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border text-sm transition-all ${
                        selectedSize === size ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 hover:border-gold/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                  />
                </div>
              </div>

              {/* Duration & Quantity */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Rental Duration (days)</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setDuration(Math.max(3, duration - 1))} className="p-2 border border-white/20 rounded-lg hover:border-gold">
                      <FiMinus />
                    </button>
                    <span className="w-8 text-center">{duration}</span>
                    <button type="button" onClick={() => setDuration(duration + 1)} className="p-2 border border-white/20 rounded-lg hover:border-gold">
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 border border-white/20 rounded-lg hover:border-gold">
                      <FiMinus />
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-2 border border-white/20 rounded-lg hover:border-gold">
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleRent}
                  className="flex-1 min-w-[200px] py-4 gold-gradient text-black font-semibold rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 luxury-shadow"
                >
                  <FiShoppingBag /> Rent Now
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`px-6 py-4 rounded-2xl border transition-all flex items-center gap-2 ${
                    inWishlist ? 'border-gold bg-gold/10 text-gold' : 'border-white/20 hover:border-gold'
                  }`}
                >
                  <FiHeart fill={inWishlist ? 'currentColor' : 'none'} /> Wishlist
                </button>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Specifications */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <AnimateOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-gold">Specifications</h2>
              <div className="glass-card rounded-2xl p-6 space-y-3">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-white/50 capitalize">{key}</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetails
