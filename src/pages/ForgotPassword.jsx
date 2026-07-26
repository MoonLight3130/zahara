import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiMail, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

import AuthLayout from '../components/auth/AuthLayout'
import AuthHeader from '../components/auth/AuthHeader'
import InputField from '../components/auth/InputField'
import Button from '../components/auth/Button'
import FeatureSection from '../components/auth/FeatureSection'
import SEO from '../components/SEO'

const schema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email address is required'),
}).required()

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success('Password reset link sent to your email!', { icon: '📧' })
    }, 1200)
  }

  return (
    <AuthLayout badgeText="Account Recovery">
      <SEO title="Forgot Password | Zahara Luxury Rentals" description="Recover your Zahara luxury account password." />

      <AuthHeader
        title="RESET PASSWORD"
        subtitle="Password Recovery"
        description="Enter your registered email address to receive a secure password reset link."
      />

      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
            <FiCheckCircle size={32} />
          </div>
          <h3 className="text-lg font-bold text-[#111111]">Reset Link Sent!</h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
            We have emailed password reset instructions to your inbox. Please check your spam folder if you do not receive it shortly.
          </p>
          <div className="pt-4 space-y-2">
            <Button
              type="button"
              variant="gold"
              onClick={() => navigate('/otp-verification')}
              className="w-full"
            >
              Enter OTP Code Instead
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSent(false)}
              className="w-full"
            >
              Resend Email
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email Address"
            type="email"
            icon={FiMail}
            placeholder="your.email@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" variant="black" loading={loading} className="w-full">
            Send Reset Link
          </Button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#111111] hover:text-[#C49A3A] transition-colors"
            >
              &larr; Remembered your password? Sign In
            </Link>
          </div>
        </form>
      )}

      <FeatureSection />
    </AuthLayout>
  )
}

export default ForgotPassword
