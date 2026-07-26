import axios from 'axios'

/** Axios instance for future API integration */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('zahara_user')
  if (user) {
    const parsed = JSON.parse(user)
    if (parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  }
  return config
})

/** Mock API services — replace with real endpoints in production */
export const authService = {
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 800))
    if (!email || !password) throw new Error('Invalid credentials')
    return {
      id: '1',
      name: email.split('@')[0],
      email,
      token: 'mock-jwt-token',
      role: email.includes('admin') ? 'admin' : 'user',
    }
  },
  register: async (data) => {
    await new Promise((r) => setTimeout(r, 800))
    return { id: Date.now().toString(), ...data, token: 'mock-jwt-token', role: 'user' }
  },
}

export const bookingService = {
  createBooking: async (bookingData) => {
    await new Promise((r) => setTimeout(r, 1000))
    return { success: true, bookingId: bookingData.id, ...bookingData }
  },
}

export const newsletterService = {
  subscribe: async (email) => {
    await new Promise((r) => setTimeout(r, 600))
    if (!email) throw new Error('Email required')
    return { success: true }
  },
}

export default api
