import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiMail } from 'react-icons/fi'
import toast from 'react-hot-toast'

import AuthLayout from '../components/auth/AuthLayout'
import AuthHeader from '../components/auth/AuthHeader'
import InputField from '../components/auth/InputField'
import PasswordField from '../components/auth/PasswordField'
import Button from '../components/auth/Button'
import SocialLogin from '../components/auth/SocialLogin'
import FeatureSection from '../components/auth/FeatureSection'
import SEO from '../components/SEO'
import { useAuth } from '../context/AuthContext'

// Yup Validation Schema for Login
const loginSchema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email address is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  rememberMe: yup.boolean(),
}).required()

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await login(data.email, data.password)
      toast.success(`Welcome back, ${user?.name || 'Valued Client'}!`, {
        icon: '👑',
      })
      navigate(user?.role === 'admin' ? '/admin' : '/profile')
    } catch {
      toast.error('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialClick = (provider) => {
    toast.success(`Connecting with ${provider}...`, { icon: '✨' })
    setTimeout(() => {
      login('demo@zahara.com', 'password123')
      navigate('/profile')
    }, 1000)
  }

  return (
    <AuthLayout badgeText="Member Portal">
      <SEO title="Login | Zahara Luxury Rentals" description="Sign in to your Zahara account to access exclusive luxury jewellery rentals." />

      {/* Top Header */}
      <AuthHeader
        title="WELCOME BACK"
        subtitle="Glad to see you again!"
        description="Login to continue exploring our luxury jewellery collection."
      />

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Email Field */}
        <InputField
          label="Email Address"
          type="email"
          icon={FiMail}
          placeholder="your.name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Password Field */}
        <PasswordField
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between py-1 mb-4 text-xs">
          <label className="flex items-center gap-2 text-white/50 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]/30 accent-[#D4AF37]"
              {...register('rememberMe')}
            />
            <span>Remember Me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-[#D4AF37] hover:text-white hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button (Black background, Gold text, Hover Gold background) */}
        <Button type="submit" variant="black" loading={loading} className="w-full">
          Sign In to Zahara
        </Button>
      </form>

      {/* Social Login Options */}
      <SocialLogin
        onGoogle={() => handleSocialClick('Google')}
        onApple={() => handleSocialClick('Apple')}
        onPhone={() => navigate('/otp-verification')}
      />

      {/* Bottom Link to Register */}
        <p className="text-center text-xs text-white/40 mt-6">
        Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-[#D4AF37] hover:text-white underline transition-colors">
          Register
        </Link>
      </p>

      {/* Features Section */}
      <FeatureSection />
    </AuthLayout>
  )
}

export default Login
