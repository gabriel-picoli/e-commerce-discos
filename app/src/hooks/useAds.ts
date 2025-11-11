import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createAd, fetchAdById, fetchAdByUserId, fetchAllAds } from '../services/adApi'

import type { Ad } from '../interfaces/Ad'

import { showSuccess } from '../utils/toast'
import { handleApiError } from '../utils/handleApiError'

// hook pra buscar todos os anuncios
export const useAds = () => {
  return useQuery({
    queryKey: ['ads'],
    queryFn: fetchAllAds
  })
}

// hook pra buscar anuncios por usuario
export const useAdsByUser = (userId: number) => {
  return useQuery({
    queryKey: ['ads', userId],
    queryFn: () => fetchAdByUserId(userId)
  })
}

// hook pra buscar anuncio por id
export const useAdById = (adId: number) => {
  return useQuery({
    queryKey: ['ad', adId],
    queryFn: () => fetchAdById(adId)
  })
}

// hook pra criar anuncio
export const useCreateAd = (userId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (adData: Partial<Ad>) => createAd({ ...adData, id_user: userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads', userId] })

      showSuccess('Advertisement created successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}
