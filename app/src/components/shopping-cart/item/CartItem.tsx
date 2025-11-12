import { FiX } from 'react-icons/fi'

import { useCartStore } from '../../../stores/cartStore'

import type { Product } from '../../../interfaces/Products'

import { formatCurrency } from '../../../utils/currency'

import * as S from './styles'

type CartItemProps = {
  product: Product
  quantity: number
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { removeFromCart } = useCartStore()

  return (
    <S.Item>
      <S.ImageWrapper>
        <img src={product.capa} alt={product.name} />
      </S.ImageWrapper>

      <S.Info>
        <S.Name>{product.name}</S.Name>

        <S.Price>
          {quantity}x - {formatCurrency(product.preco)}
        </S.Price>
      </S.Info>

      <S.RemoveButton onClick={() => removeFromCart(product.id!)} aria-label="Remover do carrinho">
        <FiX size={16} />
      </S.RemoveButton>
    </S.Item>
  )
}
