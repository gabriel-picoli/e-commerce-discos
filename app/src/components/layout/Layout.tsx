import { Outlet } from 'react-router-dom'

import * as S from './styles'

import Header from './header/Header'

export default function Layout() {
  return (
    <S.LayoutContainer>
      <Header />

      <S.Main>
        {/* onde as paginas vao aparecer */}
        <Outlet />
      </S.Main>

      <S.Footer>
        <p>© 2025 - Meu Site</p>
      </S.Footer>
    </S.LayoutContainer>
  )
}
