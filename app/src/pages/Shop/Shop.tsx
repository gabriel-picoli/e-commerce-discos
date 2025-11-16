import { useCallback, useMemo, useState } from 'react'

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

  const { data: ads, isFetching } = useAds()

  const normalizedAds = (ads || []).map((ad: Ad) => ({
    ...ad,
    produto: {
      ...(ad.produto || {})
    },
    preco: Number(ad.preco || 0)
  }))

  const filteredAds = useMemo(() => {
    return normalizedAds.filter((ad) => {
      return (
        (!currentFilters.genre || ad.produto.genero === currentFilters.genre) &&
        (!currentFilters.conservation || ad.produto.conservacao === currentFilters.conservation) &&
        (!currentFilters.type || ad.produto.tipo === currentFilters.type) &&
        (!currentFilters.year || ad.produto.lancamento === currentFilters.year) &&
        (!currentFilters.priceMin || ad.preco >= Number(currentFilters.priceMin)) &&
        (!currentFilters.priceMax || ad.preco <= Number(currentFilters.priceMax))
      )
    })
  }, [normalizedAds, currentFilters])

  const genres = filteredAds.map((ad) => ad.produto.genero)
  const conservation = filteredAds.map((ad) => ad.produto.conservacao)
  const types = filteredAds.map((ad) => ad.produto.tipo)
  const years = filteredAds.map((ad) => ad.produto.lancamento)

  const handleAdClick = useCallback(
    (ad: Ad) => {
      navigate('/product', { state: { ad } })
    },
    [navigate]
  )

  if (isFetching) return <Loading />

  return (
    <S.Container>
      <Filter onFilterChange={setCurrentFilters}>
        <Filter.Controls>
          <Filter.Select label="Genre" filterKey="genre" options={genres} />
          <Filter.Select label="Conservation" filterKey="conservation" options={conservation} />
          <Filter.Select label="Type" filterKey="type" options={types} />
          <Filter.Select label="Decade" filterKey="year" options={years} />
          <Filter.PriceRange />
        </Filter.Controls>

        <Filter.ActiveTags />
      </Filter>

      <Section>
        <Section.Container>
          {filteredAds
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
                onClick={() => handleAdClick(ad)}
              />
            ))}
        </Section.Container>
      </Section>
    </S.Container>
  )
}
