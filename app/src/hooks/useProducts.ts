import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByUserId,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productsApi'

import type { Product } from '../interfaces/Products'

import { showSuccess } from '../utils/toast'
import { handleApiError } from '../utils/handleApiError'

// busca todos os protudos
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  })
}

// busca todos os produtos do usuario
export const useProductsByUser = (userId: number) => {
  return useQuery({
    queryKey: ['products', userId],
    queryFn: () => fetchProductsByUserId(userId)
  })
}

// busca produto por id
export const useProductById = (productId: number) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId)
  })
}

// cria produto
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: Partial<Product>) => createProduct(product),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })

      if (variables && (variables as any).id_user) {
        queryClient.invalidateQueries({ queryKey: ['products', (variables as any).id_user] })
      }

      showSuccess('Product created successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}

// atualiza produto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: Partial<Product> & { id: number }) => updateProduct(product),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] })

      if (variables && (variables as any).id_user) {
        queryClient.invalidateQueries({ queryKey: ['products', (variables as any).id_user] })
      }

      showSuccess('Product updated successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}

// dedleta produto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', id] })

      showSuccess('Product deleted successfully!')
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}
