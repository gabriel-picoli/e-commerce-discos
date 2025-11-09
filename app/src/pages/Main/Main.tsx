import { useNavigate } from 'react-router-dom'

import type { Product } from '../../interfaces/Products'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Hero from '../../components/hero'
import Section from '../../components/section'

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

const GAMES_VINYLS: Product[] = [
  {
    id: 7,
    name: 'Hollow Knight',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Games',
    artista: 'Christopher Larkin',
    quanti: 4,
    capa: 'https://m.media-amazon.com/images/I/61-zzoCWdUL._UF1000,1000_QL80_.jpg',
    lancamento: '2017',
    id_user: 123,
    preco: 220
  },
  {
    id: 8,
    name: 'Red Dead Redemption 2 - The House Building',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Games',
    artista: 'Woody Jackson',
    quanti: 5,
    capa: 'https://assai.co.uk/cdn/shop/products/0780163573022_1200x1092.jpg?v=1612285513',
    lancamento: '2018',
    id_user: 123,
    preco: 180
  },
  {
    id: 9,
    name: 'Silent Hill 2',
    tipo: 'LP',
    conservacao: 'Near Mint',
    genero: 'Games',
    artista: 'Akira Yamaoka',
    quanti: 2,
    capa: 'https://http2.mlstatic.com/D_Q_NP_665421-CBT83341530223_032025-O.webp',
    lancamento: '2001',
    id_user: 123,
    preco: 250
  },
  {
    id: 10,
    name: 'The Last Of Us Part II',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Games',
    artista: 'Gustavo Santaolalla',
    quanti: 3,
    capa: 'https://static.fnac-static.com/multimedia/Images/FR/NR/39/8d/c3/12815673/1541-1/tsp20201201084142/The-Last-Of-Us-Part-II.jpg',
    lancamento: '2020',
    id_user: 123,
    preco: 300
  },
  {
    id: 11,
    name: 'CONTROL',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Games',
    artista: 'Petri Alanko',
    quanti: 4,
    capa: 'https://www.lacedrecords.co/cdn/shop/products/CONTROL-X2LPRender2.jpg?v=1591709530&width=1946',
    lancamento: '2019',
    id_user: 123,
    preco: 270
  },
  {
    id: 12,
    name: 'GRIS',
    tipo: 'LP',
    conservacao: 'Mint',
    genero: 'Games',
    artista: 'Berlinist',
    quanti: 6,
    capa: 'https://materia.store/cdn/shop/products/GRISPianoCollections_Vinyl_Thumbnail_9fdd00e9-5f66-4948-aff4-30ca2317d6f4_800x.png?v=1646868578',
    lancamento: '2018',
    id_user: 123,
    preco: 230
  }
]

export default function Main() {
  const navigate = useNavigate()

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
