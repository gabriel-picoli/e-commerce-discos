import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'

import { fetchUser } from '../services/userApi'

import { useAuthStore } from '../stores/authStore'

import type { User } from '../interfaces/User'
import type { ApiError } from '../interfaces/ApiError'

import { showSuccess, showError, showInfo } from '../utils/toast'
import { getCsrfCookie } from '../utils/getCsrfCookie'
import { handleApiError } from '../utils/handleApiError'

interface LoginResponse {
  user: User
}

export function useAuth() {
  const { setAuth, clearAuth, authenticated, user } = useAuthStore()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // funçao que faz a req para a api de login
  const loginRequest = async (credentials: { email: string; password: string }) => {
    try {
      await getCsrfCookie()
      const { data } = await api.post<LoginResponse>('/login', credentials)
      return data
    } catch (error) {
      throw error
    }
  }

  const loginMutation = useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      if (!data) return

      const { user } = data

      setAuth(user)
      queryClient.setQueryData(['user'], user) // define os dados diretamente

      showSuccess(`Welcome back, ${user.name}!`)

      // redireciona baseado no tipo de usuario
      if (user.vendedor === 'S') {
        navigate('/seller/products', { replace: true })
      } else {
        navigate('/shop', { replace: true })
      }
    },

    onError: (error: ApiError) => {
      handleApiError(error)
    }
  })

  const login = async (data: { email: string; password: string }) => {
    await loginMutation.mutateAsync(data)
  }

  const logout = () => {
    clearAuth()
    queryClient.clear()
    navigate('/login', { replace: true })
    showInfo('You have been logged out.')
  }

  // verifica sessao (so roda se authenticated = true)
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: authenticated && !user, // so busca se nao tem user ainda
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000 // 10 minutos
  })

  // atualiza store quando query retorna dados
  useEffect(() => {
    if (userQuery.data && authenticated) {
      setAuth(userQuery.data)
    }
  }, [userQuery.data, authenticated])

  // trata erro de sessao
  useEffect(() => {
    if (userQuery.isError && authenticated) {
      console.warn('Session expired or invalid')

      clearAuth()

      queryClient.clear()

      showError('Session expired. Please log in again.')

      navigate('/login', { replace: true })
    }
  }, [userQuery.isError, authenticated])

  return {
    login,
    logout,
    user,
    isLoading: loginMutation.isPending || (userQuery.isLoading && authenticated)
  }
}
