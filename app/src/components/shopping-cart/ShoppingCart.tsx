import { useState } from 'react'

import { toast } from 'sonner'

import { FiShoppingCart, FiX } from 'react-icons/fi'

import { useNavigate } from 'react-router-dom'

import { useCartStore } from '../../stores/cartStore'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Icon from '../icon'
import CartItem from './item/CartItem'
import Button from '../button'

export default function ShoppingCart() {
  const { items = [], isOpen, setIsOpen } = useCartStore()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  const navigate = useNavigate()

  const total = items.reduce((acc, item) => acc + item.ad.preco * item.quantity, 0)

  return (
    <>
      {isOpen && <S.Overlay onClick={() => setIsOpen(false)} />}

      <S.CartWrapper>
        <S.IconWrapper onClick={() => setIsOpen(!isOpen)}>
          <Icon>{isOpen ? <FiX size={20} /> : <FiShoppingCart size={20} />}</Icon>

          {totalItems > 0 && <S.Badge>{totalItems}</S.Badge>}
        </S.IconWrapper>

        <S.SideCart className={isOpen ? 'active' : ''}>
          <S.Header>
            <S.Title>Shopping Cart</S.Title>

            <S.CloseButton onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </S.CloseButton>
          </S.Header>

          <S.ItemWrapper>
            {items.length === 0 ? (
              <S.EmptyMessage>Your shopping cart is empty.</S.EmptyMessage>
            ) : (
              items.map((ad) => <CartItem key={ad.ad.id} ad={ad.ad} quantity={ad.quantity} />)
            )}
          </S.ItemWrapper>

          <S.Footer>
            <S.ValueContainer>
              <S.SubtotalTitle>Subtotal</S.SubtotalTitle>

              <S.Subtotal>{formatCurrency(total)}</S.Subtotal>
            </S.ValueContainer>

            <Button
              size="small"
              onClick={() => {
                if (items.length === 0) {
                  toast.warning('Your shopping cart is empty.')

                  return
                }

                navigate('/checkout')

                setIsOpen(false)
              }}
            >
              Buy
            </Button>
          </S.Footer>
        </S.SideCart>
      </S.CartWrapper>
    </>
  )
}
