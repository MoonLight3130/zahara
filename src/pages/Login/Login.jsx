import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/profile')
    } catch {
      /* toast handled in context */
    }
  }

  return (
    <>
      <SEO title="Login" />
      <div className="section-padding min-h-[70vh] flex items-center">
        <div className="max-w-md mx-auto w-full">
          <AnimateOnScroll>
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-gold/20">
              <div className="text-center mb-8">
                <img src="/logo.png" alt="Zahara" className="h-16 w-16 mx-auto mb-4 rounded-full object-cover" />
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-white/60 text-sm">Sign in to your Zahara account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 gold-gradient text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="text-center text-sm text-white/50 mt-6">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-gold hover:underline">Register</Link>
              </p>
              <p className="text-center text-xs text-white/30 mt-4">Admin: use email with &quot;admin&quot;</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

export default Login
