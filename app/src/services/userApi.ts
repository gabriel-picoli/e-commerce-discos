import api from './api'

import type { User } from '../interfaces/User'

// checa se o usuario esta logado
export const fetchUser = async () => {
  const { data } = await api.get('/user')

  return data
}

// registra um usuario
export const createUser = async (user: User) => {
  const { data } = await api.post('/register', user)

  return data
}

// atualiza dados do usuario
export const updateUser = async ({ id, userData }: { id: number; userData: Partial<User> }) => {
  const { data } = await api.put(`/users/${id}`, userData)

  return data
}

export const deleteUser = async ({ id }: User) => {
  console.log(id)

  // const { data } = await api.delete(`/users/${id}`)

  // return data
}
