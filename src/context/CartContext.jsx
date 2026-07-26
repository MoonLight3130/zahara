import { createContext, useContext, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS, calculateRentalTotal } from '../utils/helpers'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage(STORAGE_KEYS.CART, [])
  const [wishlist, setWishlist] = useLocalStorage(STORAGE_KEYS.WISHLIST, [])

  const addToCart = useCallback((product, options = {}) => {
    const { startDate = '', endDate = '', duration = product.duration || 3, quantity = 1, size = product.sizes?.[0] || 'Free Size' } = options

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.startDate === startDate)
      if (existing) {
        toast.success('Updated cart quantity')
        return prev.map((item) =>
          item.id === product.id && item.startDate === startDate
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      toast.success(`${product.name} added to cart`)
      return [...prev, { ...product, startDate, endDate, duration, quantity, size, cartId: `${product.id}-${Date.now()}` }]
    })
  }, [setCartItems])

  const removeFromCart = useCallback((cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
    toast.success('Item removed from cart')
  }, [setCartItems])

  const updateCartItem = useCallback((cartId, updates) => {
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, ...updates } : item))
    )
  }, [setCartItems])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        toast.success('Removed from wishlist')
        return prev.filter((p) => p.id !== product.id)
      }
      toast.success('Added to wishlist')
      return [...prev, product]
    })
  }, [setWishlist])

  const isInWishlist = useCallback(
    (productId) => wishlist.some((p) => p.id === productId),
    [wishlist]
  )

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId))
    toast.success('Removed from wishlist')
  }, [setWishlist])

  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + calculateRentalTotal(item.price, item.duration, item.quantity),
      0
    )
    const deposit = cartItems.reduce((sum, item) => sum + item.deposit * item.quantity, 0)
    return { subtotal, deposit, total: subtotal + deposit, count: cartItems.length }
  }, [cartItems])

  const value = {
    cartItems,
    wishlist,
    cartSummary,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export default CartContext
