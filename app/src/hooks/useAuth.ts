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
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const authenticated = useAuthStore((state) => state.authenticated)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // funçao que faz a req para a api de login
  const loginRequest = async (user: { email: string; password: string }) => {
    try {
      await getCsrfCookie()

      const { data } = await api.post<LoginResponse>('/login', user)

      return data
    } catch (error) {
      throw error
    }
  }

  // mutation para o login
  const loginMutation = useMutation({
    mutationFn: loginRequest,

    // callbacks de sucesso
    onSuccess: (data) => {
      if (!data) return

      const { user } = data

      setAuth(user)

      queryClient.invalidateQueries({ queryKey: ['user'] })

      showSuccess(`Welcome back, ${user.name}!`)

      // redireciona pos login
      navigate('/')
    },

    // callback de erro
    onError: (error: ApiError) => {
      handleApiError(error)
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
    enabled: authenticated,
    retry: false
  })

  // atualiza o estado de auth quando os dados do usuario sao buscados
  useEffect(() => {
    if (userQuery.data) {
      // atualiza o estado com os dados mais recentes
      setAuth(userQuery.data)
    }
  }, [userQuery.data])

  // trata erro de sessao expirada ou invalida
  useEffect(() => {
    if (userQuery.isError && authenticated) {
      console.warn('Session expired or invalid')
      clearAuth()
      showError('Session expired. Please log in again.')
    }
  }, [userQuery.isError, authenticated])

  return {
    login,
    logout,
    user: useAuthStore((s) => s.user),
    isLoading: loginMutation.isPending || userQuery.isLoading
  }
}
