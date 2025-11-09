import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

import type { Product } from '../../../interfaces/Products'

import { useProductsByUser, useDeleteProduct } from '../../../hooks/useProducts'

import * as S from './styles'

import Loading from '../../../components/loading/Loading'

export default function ManageProducts() {
  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { data: products = [], isLoading, isError } = useProductsByUser(userId)

  const deleteMutation = useDeleteProduct()

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/seller')

      return
    }
  }, [user, navigate])

  const handleCreateProduct = () => navigate('/seller/products/new')

  const handleEditProduct = (product: Product) =>
    navigate(`/seller/products/edit/${product.id}`, { state: { product } })

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Delete failed', error)
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Products</S.Title>

        <S.Button onClick={handleCreateProduct}>Add New Product</S.Button>
      </S.Header>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Failed to load products.</div>
      ) : products.length === 0 ? (
        <div>No products found. Create your first product.</div>
      ) : (
        <S.ProductList>
          {products.map((product) => (
            <S.ProductCard key={product.id}>
              <S.ProductImage src={product.capa} alt={product.name} />
              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>
                <S.ProductDetails>
                  <span>Type: {product.tipo}</span>
                  <span>Condition: {product.conservacao}</span>
                  <span>Genre: {product.genero}</span>
                  <span>Quantity: {product.quanti}</span>
                </S.ProductDetails>

                <div style={{ display: 'flex', gap: 8 }}>
                  <S.EditButton onClick={() => handleEditProduct(product)}>Edit</S.EditButton>
                  <S.EditButton onClick={() => handleDelete(product.id)}>Delete</S.EditButton>
                </div>
              </S.ProductInfo>
            </S.ProductCard>
          ))}
        </S.ProductList>
      )}
    </S.Container>
  )
}
