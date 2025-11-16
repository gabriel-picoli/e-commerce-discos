import { memo } from 'react'

import { FiX } from 'react-icons/fi'

import { useCartStore } from '../../../stores/cartStore'

import type { Ad } from '../../../interfaces/Ad'

import { formatCurrency } from '../../../utils/currency'

import * as S from './styles'

import OptimizedImage from '../../optimized-image'

type CartItemProps = {
  ad: Ad
  quantity: number
}

export default memo(function CartItem({ ad, quantity }: CartItemProps) {
  const { removeFromCart } = useCartStore()

  return (
    <S.Item>
      <OptimizedImage width={56} height={56} src={ad.produto.capa} alt={ad.titulo} />

      <S.Info>
        <S.Name>{ad.produto.name}</S.Name>
        <S.Price>
          {quantity}x - {formatCurrency(ad.preco)}
        </S.Price>
      </S.Info>

      <S.RemoveButton onClick={() => removeFromCart(ad.id!)} aria-label="Remover do carrinho">
        <FiX size={16} />
      </S.RemoveButton>
    </S.Item>
  )
})
