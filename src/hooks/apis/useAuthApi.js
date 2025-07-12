import { useState } from 'react'
import axiosClient from '~/config/axiosClient'
import { exec } from '~/utils/exec'

export default function useAuthApi() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loginJwt = async (email, password) => {
    const res = await exec(
      () => axiosClient.post('/auth/login', { email, password }),
      setLoading,
      setError
    )
    if (res) {
      setUser(res.data.user)
      setToken(res.data.token)
    }
  }

  const loginGoogle = async (googleToken) => {
    const res = await exec(
      () => axiosClient.post('/auth/google', { token: googleToken }),
      setLoading,
      setError
    )
    if (res) {
      setUser(res.data.user)
      setToken(res.data.token)
    }
  }

  const sendOtp = async (phoneOrEmail) => {
    await exec(
      () => axiosClient.post('/auth/send-otp', { phoneOrEmail }),
      setLoading,
      setError
    )
  }

  const verifyOtp = async (code) => {
    const res = await exec(
      () => axiosClient.post('/auth/verify-otp', { code }),
      setLoading,
      setError
    )
    if (res) {
      setUser(res.data.user)
      setToken(res.data.token)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return {
    user,
    token,
    loading,
    error,
    loginJwt,
    loginGoogle,
    sendOtp,
    verifyOtp,
    logout,
  }
}
