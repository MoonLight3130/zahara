import { motion } from 'framer-motion'

const FeaturesCard = ({ features }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-2xl p-4 border border-gold/20 hover:border-gold/40 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <span className="text-lg">✔</span>
            </div>
            <span className="text-white/90 text-sm font-medium">{feature}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FeaturesCard
