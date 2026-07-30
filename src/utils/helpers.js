/** Format price in Indian Rupees */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

/** Calculate rental total based on duration */
export const calculateRentalTotal = (price, duration, quantity = 1) => {
  const dailyRate = price / 3
  const days = Math.max(duration, 3)
  return Math.round(dailyRate * days * quantity)
}

/** Generate unique booking ID */
export const generateBookingId = () =>
  `ZH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

/** Filter and sort products */
export const filterProducts = (products, filters) => {
  let result = [...products]

  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q)
    )
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((p) => p.category === filters.category)
  }

  if (filters.occasion && filters.occasion !== 'all') {
    result = result.filter((p) => p.occasion === filters.occasion)
  }

  if (filters.priceMin) {
    result = result.filter((p) => p.price >= Number(filters.priceMin))
  }

  if (filters.priceMax) {
    result = result.filter((p) => p.price <= Number(filters.priceMax))
  }

  switch (filters.sortBy) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'popularity':
      result.sort((a, b) => b.reviews - a.reviews)
      break
    case 'newest':
    default:
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
  }

  return result
}

/** Get product by slug or id */
export const getProductBySlug = (products, slug) =>
  products.find((p) => p.slug === slug || p.id === slug)

/** Scroll to top utility */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/** Validate email */
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/** Storage keys */
export const STORAGE_KEYS = {
  CART: 'zahara_cart',
  WISHLIST: 'zahara_wishlist',
  USER: 'zahara_user',
  TOKEN: 'zahara_token',
  USERS: 'zahara_users',
  BOOKINGS: 'zahara_bookings',
  ADDRESSES: 'zahara_addresses',
}
