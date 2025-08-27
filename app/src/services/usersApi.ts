import api from './api'

import type { User } from '../interfaces/User'

// checa se o usuario esta logado
export const fetchUser = async () => {
  const { data } = await api.get('/user')

  return data
}

// registra um usuario
export const createUser = async (user: User) => {
  console.log(user)

  const { data } = await api.post('/register', user)

  console.log(data)

  return data
}

// funçao para atualizaçao de dados do usuario
export const updateUser = async (user: Partial<User>) => {
  console.log(user)

  // const { data } = await api.put(`/users/${user.id}`, user)

  // return data
}

export const deleteUser = async ({ id }: User) => {
  console.log(id)

  // const { data } = await api.delete(`/users/${id}`)

  // return data
}
