import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../stores/authStore'
import Loading from '../components/loading/Loading'

export default function SellerRoute() {
  const { authenticated } = useAuthStore()
  const { user, isLoading } = useAuth()

  // enquanto esta carregando OU nao tem user mas esta autenticado
  if (isLoading || (authenticated && !user)) {
    return <Loading />
  }

  if (!authenticated || !user) {
    return <Navigate to="/login" replace />
  }

  if (user.vendedor !== 'S') {
    return <Navigate to="/shop" replace />
  }

  return <Outlet />
}
