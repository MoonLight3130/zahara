/** Lazy loaded image with skeleton placeholder */
const LazyImage = ({ src, alt, className = '', ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={`transition-opacity duration-500 ${className}`}
    onLoad={(e) => e.target.classList.add('opacity-100')}
    {...props}
  />
)

export default LazyImage
