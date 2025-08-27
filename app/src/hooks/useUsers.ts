import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchUser, createUser, updateUser, deleteUser } from '../services/userApi'

export const useUser = () => {
  return useQuery({
    queryKey: ['user'], // chave do cache
    queryFn: fetchUser // funçao que busca os dados
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient() // da acesso ao cache

  return useMutation({
    mutationFn: createUser, // funçao que cria o usuario
    onSuccess: () => {
      // quando der certo, invalida o cache e busca dados novamente
      queryClient.invalidateQueries({ queryKey: ['user'] })
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
    }
  })
}
