import api from './api'

import { fetchProductById } from './productsApi'

import type { Ad } from '../interfaces/Ad'

// busca os anuncio e mescla com os produtos
export const fetchAllAds = async (): Promise<Ad[]> => {
  const { data } = await api.get<Ad[]>('/anuncios/getAll')

  const ads = data || []

  // busca os produtos que faltam
  const missingProductIds = Array.from(
    new Set(ads.filter((a) => !a.produto && a.id_produto).map((a) => a.id_produto))
  )

  if (missingProductIds.length === 0) return ads

  const productsById: Record<number, any> = {}

  await Promise.all(
    missingProductIds.map(async (productId) => {
      try {
        const product = await fetchProductById(productId)

        productsById[productId] = product
      } catch (err) {
        // ignora erro de produtos, pois vai continuar undefined
        console.error('Failed to fetch product for ad:', productId, err)
      }
    })
  )

  // mescla os dados do anuncio com o produto
  const enriched = ads.map((a) => ({
    ...(a as any),
    produto: a.produto || productsById[a.id_produto]
  }))

  return enriched
}

export const fetchAdByUserId = async (userId: number) => {
  const { data } = await api.get<Ad[]>(`/users/${userId}/anuncios`)

  return data
}

export const fetchAdById = async (adId: number) => {
  const { data } = await api.get<Ad>(`/anuncios/${adId}`)

  const ad = data as Ad

  if (!ad.produto && ad.id_produto) {
    try {
      ad.produto = await fetchProductById(ad.id_produto)
    } catch (err) {
      console.error('Failed to fetch product for ad', adId, err)
    }
  }

  return ad
}

export const createAd = async (ad: Partial<Ad>) => {
  const { data } = await api.post<Ad>('/criarAnuncio', ad)

  return data
}

export const updateAd = async ({ id, ...updatedAd }: Ad) => {
  const { data } = await api.put<Ad>(`/anuncios/${id}`, updatedAd)

  return data
}

export const deleteAd = async (id: number) => {
  await api.delete(`/anuncios/${id}`)
}
