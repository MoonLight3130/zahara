import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLoader } from 'react-icons/fi'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center text-white">
        <FiLoader className="animate-spin text-[#D4AF37] mb-4" size={36} />
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Authenticating Session...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

export default ProtectedRoute
