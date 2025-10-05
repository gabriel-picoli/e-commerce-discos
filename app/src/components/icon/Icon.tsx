import type { ReactNode } from 'react'

import * as S from './styles'

type IconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function Icon({ children, ...props }: IconProps) {
  return <S.Icon {...props}>{children}</S.Icon>
}
