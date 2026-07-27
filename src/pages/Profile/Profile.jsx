import { Link } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut } from 'react-icons/fi'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../../utils/helpers'

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const { wishlist } = useCart()
  const [bookings] = useLocalStorage(STORAGE_KEYS.BOOKINGS, [])
  const [addresses, setAddresses] = useLocalStorage(STORAGE_KEYS.ADDRESSES, [])

  if (!isAuthenticated) {
    return (
      <div className="section-padding text-center">
        <p className="text-white/60 mb-4">Please login to view your profile</p>
        <Link to="/login" className="text-gold hover:underline">Login</Link>
      </div>
    )
  }

  const tabs = [
    {
      icon: FiUser, label: 'Profile Details', content: (
        <div className="space-y-4">
          <input defaultValue={user.name} onBlur={(e) => updateProfile({ name: e.target.value })} className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl" placeholder="Name" />
          <input defaultValue={user.email} readOnly className="w-full px-4 py-3 bg-black/30 border border-white/5 rounded-xl text-white/50" />
        </div>
      )
    },
    { icon: FiPackage, label: 'Booking History', link: '/bookings', count: bookings.length },
    { icon: FiHeart, label: 'Wishlist', link: '/wishlist', count: wishlist.length },
    {
      icon: FiMapPin, label: 'Saved Address', content: (
        <div>
          <textarea
            placeholder="Add your default delivery address"
            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl h-24 resize-none"
            onBlur={(e) => e.target.value && setAddresses([e.target.value])}
            defaultValue={addresses[0] || ''}
          />
        </div>
      )
    },
  ]

  return (
    <>
      <SEO title="My Profile" />
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll className="mb-12 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Profile</h1>
              <p className="text-white/60">Welcome, {user.name}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 border border-red-400/30 text-red-400 rounded-full hover:bg-red-400/10 transition-colors"
            >
              <FiLogOut /> Logout
            </button>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {tabs.map((tab) => (
              <AnimateOnScroll key={tab.label}>
                <div className="glass-card rounded-2xl p-6 border border-gold/10">
                  <div className="flex items-center gap-3 mb-4">
                    <tab.icon className="text-gold" />
                    <h2 className="font-semibold">{tab.label}</h2>
                    {tab.count !== undefined && (
                      <span className="ml-auto text-sm text-gold">{tab.count}</span>
                    )}
                  </div>
                  {tab.link ? (
                    <Link to={tab.link} className="text-gold text-sm hover:underline">View →</Link>
                  ) : (
                    tab.content
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
