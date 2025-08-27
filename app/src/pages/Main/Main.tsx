import { useAuthStore } from '../../stores/authStore'

export default function Main() {
  const user = useAuthStore((state) => state.user)

  return (
    <div>
      <h3>user logado</h3>
      <p>{user?.id}</p>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <p>{user?.vendedor}</p>
    </div>
  )
}
