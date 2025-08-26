import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchUsers, createUser, updateUser, deleteUser } from '../services/usersApi'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'], // chave do cache
    queryFn: fetchUsers // funçao que busca os dados
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient() // da acesso ao cache

  return useMutation({
    mutationFn: createUser, // funçao que cria o usuario
    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient() // da acesso ao cache

  return useMutation({
    mutationFn: updateUser, // funçao que atualiza o usuario
    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser, // funçao que deleta o usuario
    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
