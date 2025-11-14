import { useNavigate } from 'react-router-dom'

import { useAds } from '../../hooks/useAds'

import type { Ad } from '../../interfaces/Ad'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Hero from '../../components/hero'
import Section from '../../components/section'

export default function Main() {
  const navigate = useNavigate()

  const { data: ads } = useAds()

  const nomalizedAds = ads || []

  const categories = Array.from(
    new Set(nomalizedAds.map((ad) => ad.produto.genero?.toLowerCase() || 'unknown'))
  ).slice(0, 4)

  const handleProductClick = (ad: Ad) => {
    navigate(`/product`, { state: { ad } })
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
          {categories.map((category) => {
            const vinyls = nomalizedAds.filter(
              (ad) => ad.produto.genero?.toLowerCase() === category
            )

            return (
              <Section key={category}>
                <Section.Title>{category}</Section.Title>

                <Section.Container>
                  {vinyls.map((vinyl) => (
                    <Section.VinylAd
                      key={vinyl.id}
                      name={vinyl.titulo}
                      price={formatCurrency(vinyl.preco)}
                      image={vinyl.produto.capa}
                      onClick={() => handleProductClick(vinyl)}
                    />
                  ))}
                </Section.Container>
              </Section>
            )
          })}
        </Section>
      </S.SectionContainer>
    </S.Main>
  )
}
