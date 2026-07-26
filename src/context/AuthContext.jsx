import { createContext, useContext, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { authService } from '../services/api'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/helpers'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER, null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      setUser(data)
      toast.success(`Welcome back, ${data.name}!`)
      return data
    } catch (err) {
      toast.error(err.message || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [setUser])

  const register = useCallback(async (formData) => {
    setLoading(true)
    try {
      const data = await authService.register(formData)
      setUser(data)
      toast.success('Account created successfully!')
      return data
    } catch (err) {
      toast.error(err.message || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [setUser])

  const logout = useCallback(() => {
    setUser(null)
    toast.success('Logged out successfully')
  }, [setUser])

  const updateProfile = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }))
    toast.success('Profile updated')
  }, [setUser])

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export default AuthContext
