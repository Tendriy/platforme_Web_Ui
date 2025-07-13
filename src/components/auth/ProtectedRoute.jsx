import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

export default function ProtectedRoute() {
  const isAuthenticated = useAuth(state => state.accessToken)
  return !!isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />
}
