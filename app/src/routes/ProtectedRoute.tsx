import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import { useAuthStore } from '../stores/authStore'

import Loading from '../components/loading/Loading'

export default function ProtectedRoute() {
  const { authenticated } = useAuthStore()
  const { isLoading, user } = useAuth()

  // se esta verificando o user, mostra loading (fetchUser ainda rodando)
  if (isLoading) return <Loading />

  // se n tiver token ou user, redireciona para o login
  if (!authenticated || !user) {
    return <Navigate to="/login" replace />
  }

  // se autenticado, renderiza a rota protegida
  return <Outlet />
}
