import axios from 'axios'
import useAuth from '~/hooks/useAuth'  

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const axiosClient = axios.create({
  baseURL: BASE_URL
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosClient
