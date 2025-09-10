import type { ReactNode } from 'react'
import * as S from './styles'

type SectionProps = {
  children: ReactNode
}
function Section({ children }: SectionProps) {
  return <S.Section>{children}</S.Section>
}

type SectionTitleProps = {
  children: ReactNode
}
function Title({ children }: SectionTitleProps) {
  return <S.SectionTitle>{children}</S.SectionTitle>
}

type SectionContainerProps = {
  children: ReactNode
}
function Container({ children }: SectionContainerProps) {
  return <S.SectionContainer>{children}</S.SectionContainer>
}

type VinylAdProps = {
  name: string
  price: string
  image: string
}

function VinylAd({ name, price, image }: VinylAdProps) {
  return (
    <S.VinylAdCard>
      <S.VinylImage src={image} alt={name} />
      
      <S.VinylInfo>
        <S.VinylName>{name}</S.VinylName>
        <S.VinylPrice>{price}</S.VinylPrice>
      </S.VinylInfo>
    </S.VinylAdCard>
  )
}

Section.Title = Title
Section.Container = Container
Section.VinylAd = VinylAd

export default Section
