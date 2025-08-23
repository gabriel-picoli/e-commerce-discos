import type { ReactNode } from 'react'

import * as S from './styles'

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode
}

function Form({ children, ...props }: FormProps) {
  return <S.Form {...props}>{children}</S.Form>
}

type RowProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function Row({ children, ...props }: RowProps) {
  return <S.Row {...props}>{children}</S.Row>
}

type FullWidthProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

function FullWidth({ children, ...props }: FullWidthProps) {
  return <S.FullWidth {...props}>{children}</S.FullWidth>
}

Form.Row = Row
Form.FullWidth = FullWidth

export default Form
