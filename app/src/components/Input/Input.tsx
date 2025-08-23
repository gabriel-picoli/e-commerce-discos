import { forwardRef, useId } from 'react'

import * as S from './styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', helperText = '', ...props }, ref) => {
    const inputId = useId() //  permite que o react gere um id unico para o input, para questao de acessibilidade apenas

    const hasError = helperText.length > 0

    return (
      <S.Container>
        <S.Label htmlFor={inputId}>{props.label}</S.Label>
        <S.Input id={inputId} type={type} name={name} $hasError={hasError} ref={ref} {...props} />

        {hasError && <S.ErrorMessage>{helperText}</S.ErrorMessage>}
      </S.Container>
    )
  }
)

export default Input
