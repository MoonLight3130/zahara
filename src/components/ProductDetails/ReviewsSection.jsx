import { FiStar } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [showAll, setShowAll] = useState(false)
  const displayReviews = showAll ? reviews : reviews.slice(0, 3)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={i < rating ? 'text-gold fill-gold' : 'text-white/20'}
        size={16}
      />
    ))
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-gold">Customer Reviews</h2>
      
      {/* Overall Rating */}
      <div className="glass-card rounded-2xl p-6 mb-8 border border-gold/20">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gold mb-2">{averageRating}</div>
            <div className="flex gap-1 justify-center mb-2">{renderStars(Math.round(averageRating))}</div>
            <p className="text-white/50 text-sm">{totalReviews} Reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const percentage = reviews.filter(r => r.rating >= star).length / reviews.length * 100
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-white/70 text-sm w-12">{star} star</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-white/50 text-sm w-12">{Math.round(percentage)}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {displayReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                </div>
                <p className="text-white/40 text-sm">{new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">{review.text}</p>
          </motion.div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-6 px-6 py-3 border border-gold/30 text-gold rounded-full hover:bg-gold/10 transition-all"
        >
          {showAll ? 'Show Less' : `View All ${reviews.length} Reviews`}
        </button>
      )}

      {/* Add Review Button */}
      <button
        type="button"
        className="mt-4 px-6 py-3 gold-gradient text-black font-semibold rounded-full hover:opacity-90 transition-opacity"
      >
        Write a Review
      </button>
    </div>
  )
}

export default ReviewsSection
