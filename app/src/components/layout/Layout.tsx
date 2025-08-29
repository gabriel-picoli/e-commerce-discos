import { Outlet } from 'react-router-dom'

import * as S from './styles'

import Header from './header/Header'
import Footer from './footer'

export default function Layout() {
  return (
    <S.LayoutContainer>
      <Header />

      <S.Main>
        {/* onde as paginas vao aparecer */}
        <Outlet />
      </S.Main>

      <Footer />
    </S.LayoutContainer>
  )
}
