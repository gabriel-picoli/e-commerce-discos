import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
  FiEdit,
  FiTrash2,
  FiPackage,
  FiTag,
  FiLayers,
  FiAlertCircle,
  FiMusic
} from 'react-icons/fi'

import { useAuth } from '../../../hooks/useAuth'
import { useProductsByUser, useDeleteProduct } from '../../../hooks/useProducts'

import type { Product } from '../../../interfaces/Products'

import * as S from './styles'

import Loading from '../../../components/loading/Loading'

export default function ManageProducts() {
  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { data: products = [], isLoading, isError } = useProductsByUser(userId)
  const deleteMutation = useDeleteProduct()

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Delete failed', error)
    }
  }

  const handleCreateProduct = () => navigate('/seller/products/new')
  const handleEditProduct = (product: Product) =>
    navigate(`/seller/products/edit/${product.id}`, { state: { product } })

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/seller')
      return
    }
  }, [user, navigate])

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Products</S.Title>
        <S.Button onClick={handleCreateProduct}>+ Add Product</S.Button>
      </S.Header>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <S.NotFoundContainer>
          <S.NotFoundCard>
            <S.IconWrapper>
              <FiAlertCircle size={60} />
            </S.IconWrapper>

            <S.NotFoundTitle>An error occurred</S.NotFoundTitle>

            <S.NotFoundSubtitle>Failed to load products.</S.NotFoundSubtitle>
          </S.NotFoundCard>
        </S.NotFoundContainer>
      ) : products.length === 0 ? (
        <S.NotFoundContainer>
          <S.NotFoundCard>
            <S.IconWrapper>
              <FiAlertCircle size={60} />
            </S.IconWrapper>

            <S.NotFoundTitle>No products found </S.NotFoundTitle>

            <S.NotFoundSubtitle>You have not added any products yet.</S.NotFoundSubtitle>
          </S.NotFoundCard>
        </S.NotFoundContainer>
      ) : (
        <S.ProductList>
          {products.map((product) => (
            <S.ProductCard key={product.id}>
              <S.ImageWrapper>
                <S.ProductImage src={product.capa} alt={product.name} />
              </S.ImageWrapper>

              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>

                <S.ProductDetails>
                  <S.DetailItem>
                    <FiMusic /> {product.tipo}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiLayers /> {product.conservacao}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiTag /> {product.genero}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiPackage /> {product.quanti} in stock
                  </S.DetailItem>
                </S.ProductDetails>

                {product.preco && (
                  <S.ProductPrice>R$ {Number(product.preco).toFixed(2)}</S.ProductPrice>
                )}

                <S.ButtonGroup>
                  <S.EditButton onClick={() => handleEditProduct(product)}>
                    <FiEdit size={14} /> Edit
                  </S.EditButton>

                  <S.DeleteButton
                    onClick={() => {
                      if (product.id && product.id !== undefined) {
                        handleDelete(product.id)
                      }
                    }}
                  >
                    <FiTrash2 size={14} /> Delete
                  </S.DeleteButton>
                </S.ButtonGroup>
              </S.ProductInfo>
            </S.ProductCard>
          ))}
        </S.ProductList>
      )}
    </S.Container>
  )
}
