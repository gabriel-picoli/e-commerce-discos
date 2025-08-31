import type { ImgHTMLAttributes, ReactNode } from 'react'

import * as S from './styles'

type CardRootProp = {
  children: ReactNode
}

export function RangeCardRoot({ children }: CardRootProp) {
  return <S.CardContainer>{children}</S.CardContainer>
}

type CardImageProps = ImgHTMLAttributes<HTMLImageElement>

export function RangeCardImage(props: CardImageProps) {
  return <S.CardImage {...props} />
}

type CardDescriptionProp = {
  children: ReactNode
}

export function RangeCardDescription({ children }: CardDescriptionProp) {
  return <S.CardDescription>{children}</S.CardDescription>
}
