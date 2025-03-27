// src/lib/axios.ts
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false
})

// Request interceptor: adds access token to every request
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor: handles 401 by trying refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry && typeof window !== 'undefined') {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        return Promise.reject(error)
      }

      try {
        const res = await axios.post(`${BASE_URL}/users/refresh`, {
          refresh_token: refreshToken
        })

        const { access_token, refresh_token } = res.data

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (err) {
        // Optionally clear tokens and redirect to login
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)
