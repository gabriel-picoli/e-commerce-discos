import { useState } from 'react'

import { FiShoppingCart, FiX } from 'react-icons/fi'

import { useCartStore } from '../../stores/cartStore'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Icon from '../icon'
import CartItem from './item/CartItem'

export default function ShoppingCart() {
  const [open, setOpen] = useState(false)

  const { items } = useCartStore()

  const total = items.reduce((acc, item) => acc + item.product.preco * item.quantity, 0)

  return (
    <>
      {open && <S.Overlay onClick={() => setOpen(false)} />}

      <S.CartWrapper>
        <Icon onClick={() => setOpen(!open)} aria-label="Open Cart">
          {open ? <FiX size={20} /> : <FiShoppingCart size={20} />}
        </Icon>

        <S.SideCart className={open ? 'active' : ''}>
          <S.Header>
            <S.Title>Shopping Cart</S.Title>

            <S.CloseButton onClick={() => setOpen(false)}>
              <FiX size={20} />
            </S.CloseButton>
          </S.Header>

          <S.ItemWrapper>
            {items.length === 0 ? (
              <S.EmptyMessage>
                Seu carrinho está vazio
                <FiShoppingCart size={18} />
              </S.EmptyMessage>
            ) : (
              items.map((product) => (
                <CartItem
                  key={product.product.id}
                  product={product.product}
                  quantity={product.quantity}
                />
              ))
            )}
          </S.ItemWrapper>

          <S.Footer>
            <S.SubtotalTitle>Subtotal</S.SubtotalTitle>

            <S.Subtotal>{formatCurrency(total)}</S.Subtotal>
          </S.Footer>
        </S.SideCart>
      </S.CartWrapper>
    </>
  )
}
