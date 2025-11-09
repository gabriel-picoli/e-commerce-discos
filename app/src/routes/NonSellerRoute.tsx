import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { useAuthStore } from '../stores/authStore'

import Loading from '../components/loading/Loading'

export default function NonSellerRoute() {
  const { authenticated } = useAuthStore()

  const { isLoading, user } = useAuth()

  if (isLoading) return <Loading />

  if (!authenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // redireciona vendedores para dashboard
  if (user.vendedor === 'S') {
    return <Navigate to="/seller" replace />
  }

  return <Outlet />
}
