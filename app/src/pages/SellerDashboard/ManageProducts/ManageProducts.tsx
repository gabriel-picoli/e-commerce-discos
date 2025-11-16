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

import { capitalize } from '../../../utils/capitalize'

import * as S from './styles'

import Loading from '../../../components/loading/Loading'
import OptimizedImage from '../../../components/optimized-image'

export default function ManageProducts() {
  const { user } = useAuth()

  const navigate = useNavigate()

  const { data: products = [], isLoading, isError, isFetching } = useProductsByUser(user?.id!)
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

  const handleEditProduct = (product: Product) => {
    navigate(`/seller/products/edit/${product.id}`, { state: { product } })
  }

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/seller')
      return
    }
  }, [user, navigate])

  if (isLoading || isFetching) {
    return (
      <S.Container>
        <S.Header>
          <S.Title>Manage Products</S.Title>
          <S.Button onClick={handleCreateProduct}>+ Add Product</S.Button>
        </S.Header>

        <Loading transparent />
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Products</S.Title>
        <S.Button onClick={handleCreateProduct}>+ Add Product</S.Button>
      </S.Header>

      {isError ? (
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
              <OptimizedImage src={product.capa} alt={product.name} />

              <S.ProductInfo>
                <S.ProductName>{product.name}</S.ProductName>

                <S.ProductDetails>
                  <S.DetailItem>
                    <FiMusic /> {product.tipo}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiLayers /> {capitalize(product.conservacao)}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiTag /> {product.genero}
                  </S.DetailItem>

                  <S.DetailItem>
                    <FiPackage />
                    {product.quanti === 0 ? 'Out of stock' : `${product.quanti} available`}
                  </S.DetailItem>
                </S.ProductDetails>

                <S.ButtonGroup>
                  <S.EditButton onClick={() => handleEditProduct(product)}>
                    <FiEdit size={14} /> Edit
                  </S.EditButton>

                  <S.DeleteButton onClick={() => handleDelete(product.id!)}>
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
