import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createAd,
  deleteAd,
  fetchAdById,
  fetchAdByUserId,
  fetchAllAds,
  updateAd
} from '../services/adApi'

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

// hook pra atualizar anuncio
export const useUpdateAd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (adData: Partial<Ad> & { id: number }) => updateAd(adData),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] })

      queryClient.invalidateQueries({ queryKey: ['ad', variables.id] })

      if (variables && (variables as any).id_user) {
        queryClient.invalidateQueries({ queryKey: ['ads', (variables as any).id_user] })
      }

      showSuccess('Advertisement updated successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}

// deletar anuncio
export const useDeleteAd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteAd(id),

    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['ads'] })
      queryClient.invalidateQueries({ queryKey: ['ad', id] })

      showSuccess('Ad deleted successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}
