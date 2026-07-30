import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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

// Yup Validation Schema
const loginSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    rememberMe: yup.boolean(),
  })
  .required()

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTarget = searchParams.get('redirect') || '/'

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  // If already logged in, redirect away
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTarget, { replace: true })
    }
  }, [isAuthenticated, navigate, redirectTarget])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await login(data.email, data.password)
      toast.success(`Welcome back, ${user?.name || 'Valued Client'}!`, { icon: '👑' })
      const target = user?.role === 'admin' ? '/admin' : redirectTarget
      navigate(target, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Invalid email or password. Please try again.')
    } flex: {
      setLoading(false)
    }
  }

  const handleFillDemo = () => {
    setValue('email', 'demo@zahara.com', { shouldValidate: true })
    setValue('password', 'password123', { shouldValidate: true })
    toast.success('Demo credentials filled!', { icon: '✨' })
  }

  const handleSocialClick = async (provider) => {
    setLoading(true)
    toast.success(`Connecting with ${provider}...`, { icon: '✨' })
    try {
      await login('demo@zahara.com', 'password123')
      navigate(redirectTarget, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Social login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      heroTitle="Welcome Back"
      heroSubtitle="Continue your luxury jewellery rental journey with ZAHARA."
      badgeText="Member Portal"
    >
      <SEO
        title="Login | Zahara Luxury Rentals"
        description="Sign in to your Zahara account to access exclusive luxury jewellery rentals."
      />

      {/* Card Header */}
      <AuthHeader
        title="Sign In"
        subtitle="Glad to see you again!"
        description="Login to your account to manage rentals, wishlist, and bookings."
      />

      {/* Quick Demo Credential Helper */}
      <div className="mb-4 text-center">
        <button
          type="button"
          onClick={handleFillDemo}
          className="text-[11px] font-medium text-[#D4AF37] hover:underline bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 transition-all"
        >
          ✨ Click to fill Demo Credentials (demo@zahara.com)
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-0" noValidate>
        {/* Email */}
        <InputField
          id="login-email"
          label="Email Address"
          type="email"
          icon={FiMail}
          placeholder="Enter your email"
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />

        {/* Password */}
        <PasswordField
          id="login-password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          autoComplete="current-password"
          {...register('password')}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between py-1 mb-5 text-xs">
          <label
            className="flex items-center gap-2 text-white/45 cursor-pointer select-none hover:text-white/60 transition-colors"
            htmlFor="remember-me-checkbox"
          >
            <input
              id="remember-me-checkbox"
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]/30 accent-[#D4AF37]"
              {...register('rememberMe')}
            />
            <span>Remember Me</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-[#D4AF37] hover:text-[#E8C547] hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <Button
          id="login-submit-btn"
          type="submit"
          variant="gold"
          loading={loading}
          className="w-full"
        >
          Login
        </Button>
      </form>

      {/* Social Login */}
      <SocialLogin
        onGoogle={() => handleSocialClick('Google')}
        onFacebook={() => handleSocialClick('Facebook')}
        onApple={() => handleSocialClick('Apple')}
      />

      {/* Signup Link */}
      <p className="text-center text-xs text-white/35 mt-5">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-semibold text-[#D4AF37] hover:text-[#E8C547] underline underline-offset-2 transition-colors"
        >
          Create Account
        </Link>
      </p>

      {/* Features */}
      <FeatureSection />
    </AuthLayout>
  )
}

export default Login
