import { Link } from 'react-router-dom'

import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'

import * as S from './styles'

export default function Header() {
  return (
    <S.Header>
      <S.BrandSection>
        <S.LogoTitle>Pozzoleone</S.LogoTitle>
      </S.BrandSection>

      <S.Nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
      </S.Nav>

      <S.ActionsContainer>
        <S.Icon>
          <FiShoppingCart size={20} />
        </S.Icon>

        <S.Icon>
          <FiSearch size={20} />
        </S.Icon>

        <S.Icon>
          <FiUser size={20} />
        </S.Icon>
      </S.ActionsContainer>
    </S.Header>
  )
}
