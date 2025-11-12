import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import type { Product } from '../../interfaces/Products'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Section from '../../components/section'
import Filter from '../../components/filter/Filter'
import { useAds } from '../../hooks/useAds'

export default function Shop() {
  const [currentFilters, setCurrentFilters] = useState<any>({
    genre: '',
    artist: '',
    conservation: '',
    type: '',
    year: '',
    priceMin: '',
    priceMax: ''
  })

  const navigate = useNavigate()

  const { data: ads } = useAds()

  const products = (ads || []).map((ad: any) => ({
    ...(ad.produto || {}),
    preco: Number(ad.preco || 0)
  })) as Product[]

  const genres = products.map((p) => p.genero)
  const conservation = products.map((p) => p.conservacao)
  const types = products.map((p) => p.tipo)
  const years = products.map((p) => p.lancamento)

  const handleProductClick = (product: Product) => {
    navigate(`/product`, { state: { product } })
  }

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
          {products
            .filter((product) => {
              // se n tiver filtros, mostra todos
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
              if (!isNaN(min) && min > 0 && product.preco < min) return false

              const max = Number(currentFilters.priceMax)
              if (!isNaN(max) && max > 0 && product.preco > max) return false

              return true
            })
            .map((product) => (
              <Section.VinylAd
                key={product.id}
                name={product.name}
                price={formatCurrency(product.preco)}
                image={product.capa}
                onClick={() => handleProductClick(product)}
              />
            ))}
        </Section.Container>
      </Section>
    </S.Container>
  )
}
