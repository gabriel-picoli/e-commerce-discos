import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'

import { useAuthStore } from '../stores/authStore'

import type { User } from '../interfaces/User'
import { useEffect } from 'react'
import { fetchUser } from '../services/userApi'

interface LoginResponse {
  user: User
  token: string
}

const login = async (user: { email: string; password: string }) => {
  console.log(user)

  const { data } = await api.post<LoginResponse>('/login', user)

  console.log(data)

  return data
}

export function useAuth() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const token = useAuthStore((state) => state.token)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // login
  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: ({ user, token }) => {
      setAuth(user, token)

      queryClient.invalidateQueries({ queryKey: ['user'] })

      // redireciona pos login
      navigate('/')
    },

    onError: (error) => {
      console.error('Login error: ', error)
    }
  })

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
    }
  }, [userQuery.data, userQuery.isError])

  return {
    login: loginMutation.mutateAsync,
    user: useAuthStore((s) => s.user),
    token: useAuthStore((s) => s.token),
    isLoading: loginMutation.isPending || userQuery.isLoading
  }
}
