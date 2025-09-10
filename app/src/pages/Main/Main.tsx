import * as S from './styles'

import Hero from '../../components/hero'
import Section from '../../components/section'

export default function Main() {
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
            <Section.VinylAd
              name="The Beatles - Abbey Road"
              price="R$ 220,00"
              image="https://http2.mlstatic.com/D_Q_NP_613455-MLU75814157934_042024-O.webp"
            />

            <Section.VinylAd
              name="Nirvana - Nevermind"
              price="R$ 180,00"
              image="https://www.turntablelab.com/cdn/shop/products/nirvana-nevermind-blackvinyl-2_1000x1000.jpg?v=1638370683"
            />

            <Section.VinylAd
              name="Queen - A Night at the Opera Exclusive VMP Galaxy Purple Vinyl Record"
              price="R$ 850,00"
              image="https://i.ebayimg.com/images/g/xyAAAOSwSN9iNOJm/s-l1200.jpg"
            />

            <Section.VinylAd
              name="Jeff Buckley - Grace"
              price="R$ 300,00"
              image="https://mundovinyl.com.br/wp-content/uploads/2022/12/capagold.webp"
            />

            <Section.VinylAd
              name="Radiohead - OK Computer"
              price="R$ 270,00"
              image="https://a-static.mlcdn.com.br/1500x1500/lp-radiohead-ok-computer-vinil-duplo-importado-novo-xl-recordings/giftscacau/11438960792/c8ceeb5cf12d2416041f6d88d80e9db6.jpg"
            />

            <Section.VinylAd
              name="Guns N' Roses - Use Your Illusion I"
              price="R$ 230,00"
              image="https://m.media-amazon.com/images/I/91x-bQbnw4L.jpg"
            />
          </Section.Container>
        </Section>

        <Section>
          <Section.Title>Games</Section.Title>

          <Section.Container>
            <Section.VinylAd
              name="Hollow Knigth"
              price="R$ 220,00"
              image="https://m.media-amazon.com/images/I/61-zzoCWdUL._UF1000,1000_QL80_.jpg"
            />

            <Section.VinylAd
              name="Read Dead Redemption 2 - The House Building"
              price="R$ 180,00"
              image="https://assai.co.uk/cdn/shop/products/0780163573022_1200x1092.jpg?v=1612285513"
            />

            <Section.VinylAd
              name="Silent Hill 2"
              price="R$ 250,00"
              image="https://http2.mlstatic.com/D_Q_NP_665421-CBT83341530223_032025-O.webp"
            />

            <Section.VinylAd
              name="The Last Of Us Part II"
              price="R$ 300,00"
              image="https://static.fnac-static.com/multimedia/Images/FR/NR/39/8d/c3/12815673/1541-1/tsp20201201084142/The-Last-Of-Us-Part-II.jpg"
            />

            <Section.VinylAd
              name="CONTROL"
              price="R$ 270,00"
              image="https://www.lacedrecords.co/cdn/shop/products/CONTROL-X2LPRender2.jpg?v=1591709530&width=1946"
            />

            <Section.VinylAd
              name="GRIS"
              price="R$ 230,00"
              image="https://materia.store/cdn/shop/products/GRISPianoCollections_Vinyl_Thumbnail_9fdd00e9-5f66-4948-aff4-30ca2317d6f4_800x.png?v=1646868578"
            />
          </Section.Container>
        </Section>
      </S.SectionContainer>
    </S.Main>
  )
}
