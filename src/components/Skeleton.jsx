/** Skeleton loading placeholder */
const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-white/10 rounded-2xl ${className}`} />
)

export const ProductCardSkeleton = () => (
  <div className="glass-card rounded-2xl overflow-hidden">
    <Skeleton className="aspect-[3/4] rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
)

export default Skeleton
