import { Link, useNavigate } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import { useAuth } from '../../../hooks/useAuth'

import * as S from './styles'

import Search from '../../search'
import ShoppingCart from '../../shopping-cart'

export default function Header() {
  const { user } = useAuth()
  const isSeller = user?.vendedor === 'S'

  const navigate = useNavigate()

  const handleProfileClick = () => {
    if (!user) {
      navigate('/login')

      return
    }

    if (user.vendedor === 'S') {
      navigate('/seller')
    }
  }

  return (
    <S.Header>
      <S.LogoTitle>Pozzoleone</S.LogoTitle>

      <S.Nav>
        {!isSeller ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </>
        ) : (
          <>
            <Link to="/seller">Dashboard</Link>
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

        <S.Icon onClick={handleProfileClick}>
          <FiUser size={20} />
        </S.Icon>
      </S.ActionsContainer>
    </S.Header>
  )
}
