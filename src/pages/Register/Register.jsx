import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../../components/SEO'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { useAuth } from '../../context/AuthContext'

const Register = () => {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      navigate('/profile')
    } catch {
      /* handled in context */
    }
  }

  return (
    <>
      <SEO title="Register" />
      <div className="section-padding min-h-[70vh] flex items-center">
        <div className="max-w-md mx-auto w-full">
          <AnimateOnScroll>
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-gold/20">
              <div className="text-center mb-8">
                <img src="/logo.png" alt="Zahara" className="h-16 w-16 mx-auto mb-4 rounded-full object-cover" />
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-white/60 text-sm">Join the Zahara luxury circle</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {['name', 'email', 'password', 'confirmPassword'].map((field) => (
                  <input
                    key={field}
                    type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                    placeholder={field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    required
                    className="w-full px-5 py-3.5 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-gold/50"
                  />
                ))}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 gold-gradient text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-white/50 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-gold hover:underline">Sign In</Link>
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  )
}

export default Register
