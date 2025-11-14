import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { fetchUser, createUser, updateUser, deleteUser } from '../services/userApi'

import { handleApiError } from '../utils/handleApiError'
import { getCsrfCookie } from '../utils/getCsrfCookie'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'], // chave do cache
    queryFn: fetchUser // funçao que busca os dados
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient() // da acesso ao cache

  const navigate = useNavigate()

  getCsrfCookie()

  return useMutation({
    mutationFn: createUser, // funçao que cria o usuario

    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['user'] })

      navigate('/login')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient() // da acesso ao cache

  return useMutation({
    mutationFn: updateUser, // funçao que atualiza o usuario

    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser, // funçao que deleta o usuario

    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}
