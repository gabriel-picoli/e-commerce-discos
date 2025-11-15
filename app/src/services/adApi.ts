import api from './api'

import { fetchProductById } from './productsApi'

import type { Ad } from '../interfaces/Ad'

const normalizeAd = (ad: Ad) => ({
  ...ad,
  preco: Number(ad.preco) || 0,
  quanti: ad.produto?.quanti || 0,
  produto: ad.produto || null
})

// busca os anuncio e mescla com os produtos
export const fetchAllAds = async (): Promise<Ad[]> => {
  const { data } = await api.get<Ad[]>('/anuncios/getAll')

  const ads = data || []

  // busca os produtos que faltam
  const missingProductIds = Array.from(
    new Set(ads.filter((a) => !a.produto && a.id_produto).map((a) => a.id_produto))
  )

  if (missingProductIds.length === 0) {
    return ads.map(normalizeAd)
  }

  const productsById: Record<number, any> = {}

  await Promise.all(
    missingProductIds.map(async (productId) => {
      try {
        const product = await fetchProductById(productId)
        productsById[productId] = product
      } catch (err) {
        console.error('Failed to fetch product for ad:', productId, err)
      }
    })
  )

  // mescla os dados do anuncio com o produto
  const enriched = ads.map((a) => ({
    ...(a as any),
    produto: a.produto || productsById[a.id_produto]
  }))

  return enriched.map(normalizeAd)
}

export const fetchAdByUserId = async (userId: number) => {
  const { data } = await api.get<Ad[]>(`/users/${userId}/anuncios`)

  return data.map(normalizeAd)
}

export const fetchAdById = async (adId: number) => {
  const { data } = await api.get<Ad>(`/anuncios/${adId}`)

  let ad = data as Ad

  if (!ad.produto && ad.id_produto) {
    try {
      ad.produto = await fetchProductById(ad.id_produto)
    } catch (err) {
      console.error('Failed to fetch product for ad', adId, err)
    }
  }

  return normalizeAd(ad)
}

export const createAd = async (ad: Partial<Ad>) => {
  const { data } = await api.post<Ad>('/criarAnuncio', ad)

  return normalizeAd(data)
}

export const updateAd = async (adData: Partial<Ad> & { id: number }): Promise<Ad> => {
  const { id, ...destructedData } = adData

  const { data } = await api.put(`/anuncios/${id}`, destructedData)

  return data
}

export const deleteAd = async (id: number) => {
  await api.delete(`/anuncios/${id}`)
}
