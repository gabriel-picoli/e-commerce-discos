import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'

import { fetchUser } from '../services/userApi'

import { useAuthStore } from '../stores/authStore'

import type { User } from '../interfaces/User'

import { showSuccess, showError, showInfo } from '../utils/toast'

interface LoginResponse {
  user: User
  token: string
}

// funçao que faz a req para a api de login
const loginRequest = async (user: { email: string; password: string }) => {
  const { data } = await api.post<LoginResponse>('/login', user)

  return data
}

export function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const token = useAuthStore((state) => state.token)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // mutation para o login
  const loginMutation = useMutation({
    mutationFn: loginRequest,

    // callbacks de sucesso
    onSuccess: ({ user, token }) => {
      setAuth(user, token)

      queryClient.invalidateQueries({ queryKey: ['user'] })

      showSuccess(`Welcome back, ${user.name}!`)

      // redireciona pos login
      navigate('/')
    },

    // callback de erro
    onError: (error) => {
      console.error('Login error: ', error)

      const message = error?.message || 'Login failed. Please try again.'

      showError(message)
    }
  })

  // funçao que chama o mutation de login
  const login = async (data: { email: string; password: string }) => {
    await loginMutation.mutateAsync(data)
  }

  const logout = () => {
    clearAuth()
    queryClient.clear()
    navigate('/login')
    showInfo('You have been logged out.')
  }

  // checa se usuario esta logado
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!token
  })

  // sync do zustand com react query
  useEffect(() => {
    if (userQuery.data) {
      setAuth(userQuery.data, '')
    } else if (userQuery.isError) {
      clearAuth()
      showError('Session expired. Please log in again.')
    }
  }, [userQuery.data, userQuery.isError])

  return {
    login,
    logout,
    user: useAuthStore((s) => s.user),
    token: useAuthStore((s) => s.token),
    isLoading: loginMutation.isPending || userQuery.isLoading
  }
}
