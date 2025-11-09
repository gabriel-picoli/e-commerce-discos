import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function SellerRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.vendedor !== 'S') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
