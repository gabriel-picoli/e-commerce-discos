import api from './api'

import type { Product } from '../interfaces/Products'

// busca todos os produtos
export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>('/produtos/getAll')

  return data
}

// busca produto por id
export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/produtos/${id}`)

  return data
}

// busca produtos por usuario
export const fetchProductsByUserId = async (userId: number): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(`/users/${userId}/produtos`)

  return data
}

// cria produto
export const createProduct = async (product: Partial<Product>) => {
  const { data } = await api.post<Product>('/criarProduto', product)

  return data
}

// atualiza produto
export const updateProduct = async (product: Partial<Product> & { id: number }) => {
  const { data } = await api.put<Product>(`/produtos/${product.id}`, product)

  return data
}

// deleta produto
export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`/produtos/${id}`)

  return data
}
