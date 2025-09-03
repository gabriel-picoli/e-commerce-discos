import { Link } from 'react-router-dom'

import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'

import * as S from './styles'

export default function Header() {
  return (
    <S.Header>
      <S.LogoTitle>Pozzoleone</S.LogoTitle>

      <S.Nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </S.Nav>

      <S.ActionsContainer>
        <S.Icon>
          <FiSearch size={20} />
        </S.Icon>

        <S.Icon>
          <FiShoppingCart size={20} />
        </S.Icon>

        <S.Icon>
          <FiUser size={20} />
        </S.Icon>
      </S.ActionsContainer>
    </S.Header>
  )
}
