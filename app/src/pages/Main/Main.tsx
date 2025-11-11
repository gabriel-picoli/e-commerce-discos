import { useNavigate } from 'react-router-dom'

import type { Product } from '../../interfaces/Products'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Hero from '../../components/hero'
import Section from '../../components/section'
import { useAds } from '../../hooks/useAds'

export default function Main() {
  const navigate = useNavigate()

  const { data: ads } = useAds()

  const products = (ads || []).map((ad: any) => ({
    ...(ad.produto || {}),
    preco: Number(ad.preco || 0)
  })) as Product[]

  const ROCK_VINYLS = products.filter((p) => p.genero === 'Rock')
  const GAMES_VINYLS = products.filter((p) => p.genero === 'Games')

  const handleProductClick = (product: Product) => {
    navigate(`/product`, { state: { product } })
  }

  return (
    <S.Main>
      <Hero />

      <S.Title>Categories</S.Title>
      <S.Description>
        Explore the styles and discover the perfect vinyl for your collection
      </S.Description>

      <S.SectionContainer>
        <Section>
          <Section.Title>Rock</Section.Title>

          <Section.Container>
            {ROCK_VINYLS.map((vinyl) => (
              <Section.VinylAd
                key={vinyl.id}
                name={vinyl.name}
                price={formatCurrency(vinyl.preco)}
                image={vinyl.capa}
                onClick={() => handleProductClick(vinyl)}
              />
            ))}
          </Section.Container>
        </Section>

        <Section>
          <Section.Title>Games</Section.Title>

          <Section.Container>
            {GAMES_VINYLS.map((vinyl) => (
              <Section.VinylAd
                key={vinyl.id}
                name={vinyl.name}
                price={formatCurrency(vinyl.preco)}
                image={vinyl.capa}
                onClick={() => handleProductClick(vinyl)}
              />
            ))}
          </Section.Container>
        </Section>
      </S.SectionContainer>
    </S.Main>
  )
}
