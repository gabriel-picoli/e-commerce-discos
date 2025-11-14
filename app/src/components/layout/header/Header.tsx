import { Link } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'

import * as S from './styles'

import Search from '../../search'
import ShoppingCart from '../../shopping-cart'
import UserDropdown from '../../user-dropdown'

export default function Header() {
  const { user } = useAuth()
  const isSeller = user?.vendedor === 'S'

  return (
    <S.Header>
      <S.LogoTitle>Pozzoleone</S.LogoTitle>

      <S.Nav>
        {!isSeller ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
          </>
        ) : (
          <>
            <Link to="/seller/products">My Products</Link>
            <Link to="/seller/ads">My Ads</Link>
            <Link to="/seller/profile">Profile</Link>
          </>
        )}
      </S.Nav>

      <S.ActionsContainer>
        {!isSeller && (
          <>
            <Search />

            <ShoppingCart />
          </>
        )}

        <UserDropdown />
      </S.ActionsContainer>
    </S.Header>
  )
}
