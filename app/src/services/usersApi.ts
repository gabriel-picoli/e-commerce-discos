import type { User } from '../interfaces/User'
import api from './api'

export const fetchUsers = async () => {
  const { data } = await api.get('/users')

  return data
}

export const createUser = async (user: User) => {
  console.log(user)

  const { data } = await api.post('/register', user)

  console.log(data)

  return data
}

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
