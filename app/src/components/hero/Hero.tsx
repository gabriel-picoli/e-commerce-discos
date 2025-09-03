import Button from '../button'

import * as S from './styles'

export default function Hero() {
  return (
    <S.HeroContainer>
      <S.Card>
        <S.CardContainer>
          <S.Subtitle>Feel the Groove</S.Subtitle>

          <S.Title>Discover Vinyl Like Never Before</S.Title>

          <S.Description>
            Step into the golden age of music. Explore rare finds, timeless classics, and exclusive
            editions that bring every track to life — only on vinyl.
          </S.Description>

          <Button.Primary size="large">Shop Now</Button.Primary>
        </S.CardContainer>
      </S.Card>
    </S.HeroContainer>
  )
}
