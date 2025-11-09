import api from './api'

import type { Ad } from '../interfaces/Ad'

export const fetchAllAds = async () => {
  const response = await api.get<Ad[]>('/anuncios/getAl')

  return response.data
}

export const fetchAdByUserId = async (userId: number) => {
  const response = await api.get<Ad[]>(`/users/${userId}/anuncios`)

  return response.data
}

export const fetchAdById = async (adId: number) => {
  const response = await api.get<Ad[]>(`/anuncios/${adId}`)

  return response.data
}

export const createAd = async (ad: Partial<Ad>) => {
  const response = await api.post<Ad>('/criarAnuncio', ad)

  return response.data
}

export const updateAd = async ({ id, ...data }: Ad) => {
  const response = await api.put<Ad>(`/anuncios/${id}`, data)

  return response.data
}

export const deleteAd = async (id: number) => {
  await api.delete(`/anuncios/${id}`)
}
