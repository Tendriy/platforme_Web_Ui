import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const axiosClient = axios.create({
  baseURL: BASE_URL
})

export default axiosClient

