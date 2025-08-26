import { forwardRef, useId } from 'react'

import * as S from './styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
}

type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Checkbox: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', helperText = '', ...props }, ref) => {
    const inputId = useId() //  permite que o react gere um id unico para o input, para questao de acessibilidade apenas

    const hasError = helperText.length > 0

    return (
      <S.InputContainer>
        <S.Label htmlFor={inputId}>{props.label}</S.Label>
        <S.Input id={inputId} type={type} name={name} $hasError={hasError} ref={ref} {...props} />

        {hasError && <S.ErrorMessage>{helperText}</S.ErrorMessage>}
      </S.InputContainer>
    )
  }
) as InputComponent

Input.Checkbox = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'checkbox', ...props }, ref) => (
    <S.CheckboxContainer>
      <S.Checkbox id={props.id} type={type} ref={ref} {...props} />
      <S.CheckboxLabel htmlFor={props.id}>{props.label}</S.CheckboxLabel>
    </S.CheckboxContainer>
  )
)

export default Input
