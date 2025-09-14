import { useState } from 'react'

import { FiShoppingCart, FiX } from 'react-icons/fi'

import * as S from './styles'

import Icon from '../icon'

export default function ShoppingCart() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <S.Overlay onClick={() => setOpen(false)} />}

      <S.CartWrapper>
        <Icon onClick={() => setOpen(!open)} aria-label="Open Cart">
          {open ? <FiX size={20} /> : <FiShoppingCart size={20} />}
        </Icon>

        <S.SideCart className={open ? 'active' : ''}>
          <header>
            <h2>Shopping Cart</h2>
            <button onClick={() => setOpen(false)}>
              <FiX size={20} />
            </button>
          </header>

          <div className="items">
            <div className="item">
              <img src="https://via.placeholder.com/60" alt="Asgaard sofa" />
              <div>
                <p>Asgaard sofa</p>
                <span>1 x Rs. 250,000.00</span>
              </div>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/60" alt="Casaliving Wood" />
              <div>
                <p>Casaliving Wood</p>
                <span>1 x Rs. 270,000.00</span>
              </div>
            </div>
          </div>

          <div className="subtotal">
            <span>Subtotal</span>
            <strong>Rs. 520,000.00</strong>
          </div>

          <footer>
            <button>Cart</button>
            <button>Checkout</button>
            <button>Comparison</button>
          </footer>
        </S.SideCart>
      </S.CartWrapper>
    </>
  )
}
