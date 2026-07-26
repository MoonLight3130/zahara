import { Link } from 'react-router-dom'
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import LazyImage from '../../components/LazyImage'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart()

  return (
    <>
      <SEO title="Wishlist" />
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="mb-12">
            <h1 className="text-4xl font-bold mb-2">My Wishlist</h1>
            <p className="text-white/60">{wishlist.length} saved items</p>
          </AnimateOnScroll>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <AnimateOnScroll key={product.id}>
                  <div className="glass-card rounded-2xl overflow-hidden group">
                    <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4]">
                      <LazyImage src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="p-5">
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-[family-name:var(--font-heading)] text-lg mb-2 hover:text-gold transition-colors">{product.name}</h3>
                      </Link>
                      <p className="text-gold font-semibold mb-4">{formatPrice(product.price)} / {product.duration} Days</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="flex-1 py-2.5 gold-gradient text-black text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                        >
                          <FiShoppingBag size={14} /> Rent Now
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2.5 border border-white/20 rounded-xl hover:border-red-400 hover:text-red-400 transition-colors"
                          aria-label="Remove"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-card rounded-2xl">
              <FiHeart className="mx-auto text-gold/40 mb-4" size={48} />
              <p className="text-white/60 text-lg mb-4">Your wishlist is empty</p>
              <Link to="/collections" className="inline-block px-6 py-3 gold-gradient text-black font-semibold rounded-full">
                Explore Collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Wishlist
