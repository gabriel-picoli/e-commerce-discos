import * as S from './styles'

import Hero from '../../components/hero'
import RangeCard from '../../components/card/range-card'

export default function Main() {
  return (
    <S.Main>
      <Hero />

      <S.RangeCardContainer>
        <RangeCard.Root>
          <RangeCard.Image src="/images/vinyl.jpg" />

          <RangeCard.Description>Range Card</RangeCard.Description>
        </RangeCard.Root>

        <RangeCard.Root>
          <RangeCard.Image src="/images/vinyl.jpg" />

          <RangeCard.Description>Range Card</RangeCard.Description>
        </RangeCard.Root>

        <RangeCard.Root>
          <RangeCard.Image src="/images/vinyl.jpg" />

          <RangeCard.Description>Range Card</RangeCard.Description>
        </RangeCard.Root>
      </S.RangeCardContainer>
    </S.Main>
  )
}
