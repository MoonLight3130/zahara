import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'

import AuthLayout from '../components/auth/AuthLayout'
import AuthHeader from '../components/auth/AuthHeader'
import PasswordField from '../components/auth/PasswordField'
import PasswordStrength from '../components/auth/PasswordStrength'
import Button from '../components/auth/Button'
import FeatureSection from '../components/auth/FeatureSection'
import SEO from '../components/SEO'

const schema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your new password'),
}).required()

const ResetPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const watchPassword = watch('password', '')

  const onSubmit = async (data) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Your password has been reset successfully. Please sign in.', { icon: '🔒' })
      navigate('/login')
    }, 1200)
  }

  return (
    <AuthLayout badgeText="Set New Credentials">
      <SEO title="Reset Password | Zahara Luxury Rentals" description="Create a new password for your account." />

      <AuthHeader
        title="CREATE NEW PASSWORD"
        subtitle="Secure Credentials"
        description="Choose a strong, unique password to secure your Zahara account."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <PasswordField
          label="New Password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        {watchPassword && <PasswordStrength password={watchPassword} />}

        <PasswordField
          label="Confirm New Password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button type="submit" variant="black" loading={loading} className="w-full mt-4">
          Save New Password
        </Button>
      </form>

      <FeatureSection />
    </AuthLayout>
  )
}

export default ResetPassword
