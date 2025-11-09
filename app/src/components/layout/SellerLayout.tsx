import { Outlet } from 'react-router-dom'

import * as S from './seller-layout/styles'

export default function SellerLayout() {
  return (
    <S.LayoutContainer>
      <S.Sidebar>
        <S.Logo>Pozzoleone</S.Logo>
        <S.Nav>
          <S.NavLink to="/seller">Dashboard</S.NavLink>

          <S.NavLink to="/seller/products">Products</S.NavLink>

          <S.NavLink to="/seller/ads">Advertisements</S.NavLink>

          <S.NavLink to="/seller/profile">Profile</S.NavLink>
        </S.Nav>
      </S.Sidebar>

      <S.MainContent>
        <Outlet />
      </S.MainContent>
    </S.LayoutContainer>
  )
}
