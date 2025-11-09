import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import type { Product } from '../../interfaces/Products'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Section from '../../components/section'
import Filter from '../../components/filter/Filter'

const ROCK_VINYLS: Product[] = [
  {
    id: 1,
    name: 'The Beatles - Abbey Road',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Rock',
    artista: 'The Beatles',
    quanti: 5,
    capa: 'https://http2.mlstatic.com/D_Q_NP_613455-MLU75814157934_042024-O.webp',
    lancamento: '1969',
    id_user: 123,
    preco: 220
  },
  {
    id: 2,
    name: 'Nirvana - Nevermind',
    tipo: 'LP',
    conservacao: 'Near Mint',
    genero: 'Rock',
    artista: 'Nirvana',
    quanti: 3,
    capa: 'https://www.turntablelab.com/cdn/shop/products/nirvana-nevermind-blackvinyl-2_1000x1000.jpg?v=1638370683',
    lancamento: '1991',
    id_user: 123,
    preco: 180
  },
  {
    id: 3,
    name: 'Queen - A Night at the Opera Exclusive VMP Galaxy Purple Vinyl Record',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Rock',
    artista: 'Queen',
    quanti: 2,
    capa: 'https://i.ebayimg.com/images/g/xyAAAOSwSN9iNOJm/s-l1200.jpg',
    lancamento: '1975',
    id_user: 123,
    preco: 850
  },
  {
    id: 4,
    name: 'Jeff Buckley - Grace',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Rock',
    artista: 'Jeff Buckley',
    quanti: 4,
    capa: 'https://mundovinyl.com.br/wp-content/uploads/2022/12/capagold.webp',
    lancamento: '1994',
    id_user: 123,
    preco: 300
  },
  {
    id: 5,
    name: 'Radiohead - OK Computer',
    tipo: 'LP',
    conservacao: 'Near Mint',
    genero: 'Rock',
    artista: 'Radiohead',
    quanti: 6,
    capa: 'https://a-static.mlcdn.com.br/1500x1500/lp-radiohead-ok-computer-vinil-duplo-importado-novo-xl-recordings/giftscacau/11438960792/c8ceeb5cf12d2416041f6d88d80e9db6.jpg',
    lancamento: '1997',
    id_user: 123,
    preco: 270
  },
  {
    id: 6,
    name: "Guns N' Roses - Use Your Illusion I",
    tipo: 'LP',
    conservacao: 'Very Good',
    genero: 'Rock',
    artista: "Guns N' Roses",
    quanti: 3,
    capa: 'https://m.media-amazon.com/images/I/91x-bQbnw4L.jpg',
    lancamento: '1991',
    id_user: 123,
    preco: 230
  }
]

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

  const genres = ['Rock', 'Games', 'Jazz', 'Classical', 'Pop']
  const conservation = ['Mint', 'Near Mint', 'Excellent', 'Very Good Plus', 'Very Good']
  const types = ['LP', 'EP', 'Single']
  const years = ['2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s']

  const navigate = useNavigate()

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
          {ROCK_VINYLS.filter((vinyl) => {
            // se n tiver filtros, mostra todos
            if (!currentFilters) return true

            if (
              currentFilters.genre &&
              String(currentFilters.genre) !== '' &&
              vinyl.genero !== currentFilters.genre
            ) {
              return false
            }

            if (
              currentFilters.conservation &&
              String(currentFilters.conservation) !== '' &&
              vinyl.conservacao !== currentFilters.conservation
            ) {
              return false
            }

            if (
              currentFilters.type &&
              String(currentFilters.type) !== '' &&
              vinyl.tipo !== currentFilters.type
            ) {
              return false
            }

            if (currentFilters.year && String(currentFilters.year) !== '') {
              const decadeStr = String(currentFilters.year)
              const productYear = Number(vinyl.lancamento)

              if (!isNaN(productYear)) {
                const decadeStart = parseInt(decadeStr.slice(0, 4), 10)

                if (Math.floor(productYear / 10) * 10 !== decadeStart) return false
              } else {
                return false
              }
            }

            const min = Number(currentFilters.priceMin)
            if (!isNaN(min) && min > 0 && vinyl.preco < min) return false

            const max = Number(currentFilters.priceMax)
            if (!isNaN(max) && max > 0 && vinyl.preco > max) return false

            return true
          }).map((vinyl) => (
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
    </S.Container>
  )
}
