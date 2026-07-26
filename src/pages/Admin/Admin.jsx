import { Link, Outlet, Navigate, useLocation } from 'react-router-dom'
import {
  FiGrid, FiPackage, FiLayers, FiCalendar, FiUsers, FiCreditCard, FiStar, FiSettings, FiArrowLeft,
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_STATS, PRODUCTS } from '../../data/products'
import SEO from '../../components/SEO'

const SIDEBAR = [
  { icon: FiGrid, label: 'Dashboard', path: '/admin' },
  { icon: FiPackage, label: 'Products', path: '/admin/products' },
  { icon: FiLayers, label: 'Categories', path: '/admin/categories' },
  { icon: FiCalendar, label: 'Bookings', path: '/admin/bookings' },
  { icon: FiUsers, label: 'Customers', path: '/admin/customers' },
  { icon: FiCreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: FiStar, label: 'Reviews', path: '/admin/reviews' },
  { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
]

export const AdminDashboard = () => (
  <>
    <SEO title="Admin Dashboard" />
    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {ADMIN_STATS.map((stat) => (
        <div key={stat.label} className="glass-card rounded-2xl p-6 border border-gold/10">
          <p className="text-white/50 text-sm mb-2">{stat.label}</p>
          <p className="text-3xl font-bold text-gold">{stat.value}</p>
          <p className="text-green-400 text-sm mt-1">{stat.change}</p>
        </div>
      ))}
    </div>
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3 text-sm text-white/60">
        <p>New booking #ZH-001 — Royal Emerald Bridal Set</p>
        <p>Payment received — ₹7,498</p>
        <p>New customer registration — Priya S.</p>
        <p>Product updated — Heritage Polki Set</p>
      </div>
    </div>
  </>
)

export const AdminProducts = () => (
  <>
    <SEO title="Admin Products" />
    <h1 className="text-3xl font-bold mb-8">Products ({PRODUCTS.length})</h1>
    <div className="glass-card rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10">
          <tr className="text-left text-white/50">
            <th className="p-4">Name</th>
            <th className="p-4 hidden md:table-cell">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4 hidden sm:table-cell">Rating</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p) => (
            <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-4">{p.name}</td>
              <td className="p-4 hidden md:table-cell capitalize">{p.category.replace('-', ' ')}</td>
              <td className="p-4 text-gold">₹{p.price}</td>
              <td className="p-4 hidden sm:table-cell">{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)

const AdminPlaceholder = ({ title }) => (
  <>
    <SEO title={`Admin ${title}`} />
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-white/60">Admin panel for {title.toLowerCase()} management. Connect to your backend API for full functionality.</p>
  </>
)

const AdminLayout = () => {
  const { isAdmin, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="w-64 glass-card border-r border-white/10 hidden md:flex flex-col p-6 shrink-0">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <img src="/logo.png" alt="Zahara" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-bold gold-text-gradient">Admin</span>
        </Link>
        <nav className="space-y-1 flex-1">
          {SIDEBAR.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                location.pathname === item.path ? 'bg-gold/10 text-gold' : 'text-white/60 hover:text-gold hover:bg-white/5'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>
        <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-gold text-sm mt-6">
          <FiArrowLeft /> Back to Site
        </Link>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export { AdminPlaceholder }
export default AdminLayout
