import { useAuth } from '../hooks/useAuth'

import { useAuthStore } from '../stores/authStore'

export default function ProtectedRoute() {
  const { token } = useAuthStore()
  const { isLoading, user } = useAuth()

  if (isLoading) return

  return <div>ProtectedRoute</div>
}
