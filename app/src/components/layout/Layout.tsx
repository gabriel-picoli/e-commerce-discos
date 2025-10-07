import { Outlet, useLocation } from 'react-router-dom'

import * as S from './styles'

import Header from './header/Header'
import Footer from './footer'
import ScrollToTop from '../scroll-to-top'
import Hero from '../hero'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <S.LayoutContainer>
      <Header />

      {pathname !== '/' && <Hero />}

      <ScrollToTop />

      <S.Main>
        {/* onde as paginas vao aparecer */}
        <Outlet />
      </S.Main>

      <Footer />
    </S.LayoutContainer>
  )
}
