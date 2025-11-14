import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAds } from '../../hooks/useAds'

import type { Ad } from '../../interfaces/Ad'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Section from '../../components/section'
import Filter from '../../components/filter/Filter'
import Loading from '../../components/loading/Loading'

export default function Shop() {
  const [currentFilters, setCurrentFilters] = useState<any>({
    genre: '',
    artist: '',
    conservation: '',
    type: '',
    priceMin: '',
    priceMax: ''
  })

  const navigate = useNavigate()

  const { data: ads, isLoading: loading } = useAds()

  const normalizedAds = (ads || []).map((ad: Ad) => ({
    ...ad,
    produto: {
      ...(ad.produto || {})
    },
    preco: Number(ad.preco || 0)
  }))

  const genres = normalizedAds.map((ad) => ad.produto.genero)
  const conservation = normalizedAds.map((ad) => ad.produto.conservacao)
  const types = normalizedAds.map((ad) => ad.produto.tipo)
  const years = normalizedAds.map((ad) => ad.produto.lancamento)

  const handleProductClick = (ad: any) => {
    navigate(`/product`, { state: { ad } })
  }

  if (loading) return <Loading />

  return (
    <S.Container>
      <Filter onFilterChange={setCurrentFilters}>
        <Filter.Controls>
          <Filter.Select label="Gênero" filterKey="genre" options={genres} />
          <Filter.Select label="Conservação" filterKey="conservation" options={conservation} />
          <Filter.Select label="Tipo" filterKey="type" options={types} />
          <Filter.Select label="Década" filterKey="year" options={years} />
          <Filter.PriceRange />
        </Filter.Controls>

        <Filter.ActiveTags />
      </Filter>

      <Section>
        <Section.Container>
          {normalizedAds
            .filter((ad) => {
              const product = ad.produto
              if (!currentFilters) return true

              if (
                currentFilters.genre &&
                String(currentFilters.genre) !== '' &&
                product.genero !== currentFilters.genre
              ) {
                return false
              }

              if (
                currentFilters.conservation &&
                String(currentFilters.conservation) !== '' &&
                product.conservacao !== currentFilters.conservation
              ) {
                return false
              }

              if (
                currentFilters.type &&
                String(currentFilters.type) !== '' &&
                product.tipo !== currentFilters.type
              ) {
                return false
              }

              if (currentFilters.year && String(currentFilters.year) !== '') {
                const decadeStr = String(currentFilters.year)
                const productYear = Number(product.lancamento)

                if (!isNaN(productYear)) {
                  const decadeStart = parseInt(decadeStr.slice(0, 4), 10)

                  if (Math.floor(productYear / 10) * 10 !== decadeStart) return false
                } else {
                  return false
                }
              }

              const min = Number(currentFilters.priceMin)
              if (!isNaN(min) && min > 0 && ad.preco < min) return false

              const max = Number(currentFilters.priceMax)
              if (!isNaN(max) && max > 0 && ad.preco > max) return false

              return true
            })
            .map((ad) => (
              <Section.VinylAd
                key={ad.id}
                name={ad.titulo}
                price={formatCurrency(ad.preco)}
                image={ad.produto.capa}
                onClick={() => handleProductClick(ad)}
              />
            ))}
        </Section.Container>
      </Section>
    </S.Container>
  )
}
