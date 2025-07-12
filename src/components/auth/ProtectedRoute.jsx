import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '~/hooks/stores/useAuth'

export default function ProtectedRoute() {
  const isAuthenticated = useAuth(state => state.token)
  return !!isAuthenticated ? <Outlet /> : <Navigate to="/welcome" replace />
}
