import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiUser, FiMail, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'

import AuthLayout from '../components/auth/AuthLayout'
import AuthHeader from '../components/auth/AuthHeader'
import InputField from '../components/auth/InputField'
import PasswordField from '../components/auth/PasswordField'
import PasswordStrength from '../components/auth/PasswordStrength'
import Button from '../components/auth/Button'
import SocialLogin from '../components/auth/SocialLogin'
import FeatureSection from '../components/auth/FeatureSection'
import SEO from '../components/SEO'
import { useAuth } from '../context/AuthContext'

// Yup Validation Schema for Registration
const registerSchema = yup
  .object({
    name: yup.string().trim().required('Full name is required'),
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    phone: yup
      .string()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Phone number must be a valid 10-digit number')
      .required('Phone number is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    agreeTerms: yup
      .boolean()
      .oneOf([true], 'You must agree to the Terms & Conditions'),
  })
  .required()

const Register = () => {
  const { register: registerAuth, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const watchPassword = watch('password', '')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await registerAuth({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
      toast.success('Welcome to Zahara! Account created successfully.', { icon: '👑' })
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialClick = async (provider) => {
    setLoading(true)
    toast.success(`Signing up with ${provider}...`, { icon: '✨' })
    try {
      await registerAuth({
        name: 'Zahara Client',
        email: `client_${Date.now()}@zahara.com`,
        phone: '+91 98765 43210',
        password: 'password123',
      })
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Social registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout badgeText="Join Luxury Circle">
      <SEO title="Register | Zahara Luxury Rentals" description="Create your Zahara account to explore and rent luxury jewellery." />

      {/* Top Header */}
      <AuthHeader
        title="Let's Get You Started!"
        subtitle="CREATE YOUR ACCOUNT"
        description="Create your account to explore and book luxury jewellery."
      />

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        {/* Full Name */}
        <InputField
          label="Full Name"
          type="text"
          icon={FiUser}
          placeholder="Princess Diana"
          error={errors.name?.message}
          {...register('name')}
        />

        {/* Email Address */}
        <InputField
          label="Email Address"
          type="email"
          icon={FiMail}
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        {/* Phone Number */}
        <InputField
          label="Phone Number"
          type="tel"
          icon={FiPhone}
          placeholder="9876543210"
          error={errors.phone?.message}
          {...register('phone')}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* Password Strength Indicator */}
        {watchPassword && <PasswordStrength password={watchPassword} />}

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {/* Terms & Conditions Checkbox */}
        <div className="py-2">
          <label className="flex items-start gap-2.5 text-xs text-white/50 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37]/30 accent-[#D4AF37]"
              {...register('agreeTerms')}
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" target="_blank" className="font-semibold text-[#D4AF37] hover:text-white underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" target="_blank" className="font-semibold text-[#D4AF37] hover:text-white underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeTerms && (
            <p className="mt-1 text-xs text-red-500 font-medium">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Register Button */}
        <Button type="submit" variant="gold" loading={loading} className="w-full mt-3">
          Create Zahara Account
        </Button>
      </form>

      {/* Social Register */}
      <SocialLogin
        onGoogle={() => handleSocialClick('Google')}
        onFacebook={() => handleSocialClick('Facebook')}
        onApple={() => handleSocialClick('Apple')}
      />

      {/* Bottom Link to Login */}
      <p className="text-center text-xs text-white/40 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[#D4AF37] hover:text-white underline transition-colors">
          Sign In
        </Link>
      </p>

      {/* Feature Section */}
      <FeatureSection />
    </AuthLayout>
  )
}

export default Register
