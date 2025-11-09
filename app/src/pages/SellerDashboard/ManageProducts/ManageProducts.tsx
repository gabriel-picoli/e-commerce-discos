import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

import type { Product } from '../../../interfaces/Products'

import * as S from './styles'

export default function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([])

  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/')
      return
    }

    // TODO: Fetch user's products
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/produtos`)
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [user, navigate])

  const handleCreateProduct = () => {
    // Navigate to product creation form
    navigate('/seller/products/new')
  }

  const handleEditProduct = (product: Product) => {
    navigate(`/seller/products/edit/${product.id}`)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Products</S.Title>

        <S.Button onClick={handleCreateProduct}>Add New Product</S.Button>
      </S.Header>

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
              <S.EditButton onClick={() => handleEditProduct(product)}>Edit Product</S.EditButton>
            </S.ProductInfo>
          </S.ProductCard>
        ))}
      </S.ProductList>
    </S.Container>
  )
}
