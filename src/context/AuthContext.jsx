import { createContext, useContext, useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/helpers'

const DEFAULT_USER = {
  id: '1',
  name: 'Valued Client',
  email: 'client@zahara.com',
  role: 'user',
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER, DEFAULT_USER)

  const logout = useCallback(() => {
    setUser(DEFAULT_USER)
    toast.success('Session reset')
  }, [setUser])

  const updateProfile = useCallback((updates) => {
    setUser((prev) => ({ ...(prev || DEFAULT_USER), ...updates }))
    toast.success('Profile updated')
  }, [setUser])

  const value = {
    user: user || DEFAULT_USER,
    isAuthenticated: true,
    isAdmin: user?.role === 'admin',
    loading: false,
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
