import { forwardRef, useId } from 'react'
import * as S from './styles.tsx'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  helperText?: string
  error?: string
}

interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'css'> {
  label?: string
  error?: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'css'> {
  label?: string
  error?: string
  children: React.ReactNode
}

type InputComponent = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
> & {
  Text: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>,
  Number: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>,
  TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>,
  Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>,
  Checkbox: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', helperText = '', error = '', ...props }, ref) => {
    const inputId = useId()
    const hasError = Boolean(error || helperText)

    return (
      <S.InputContainer>
        <S.Label htmlFor={inputId}>{props.label}</S.Label>
        <S.Input id={inputId} type={type} name={name} $hasError={hasError} ref={ref} {...props} />
        {hasError && <S.ErrorMessage>{error || helperText}</S.ErrorMessage>}
      </S.InputContainer>
    )
  }
) as InputComponent

// Text Input
Input.Text = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />
  }
)

// Number Input
Input.Number = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'number', ...props }, ref) => {
    return <Input ref={ref} type={type} {...props} />
  }
)

// TextArea
Input.TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    const textareaId = useId()
    const hasError = Boolean(error)

    return (
      <S.InputContainer>
        <S.Label htmlFor={textareaId}>{label}</S.Label>
        <S.TextArea id={textareaId} $hasError={hasError} ref={ref} {...props} />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputContainer>
    )
  }
)

// Select
Input.Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, ...props }, ref) => {
    const selectId = useId()
    const hasError = Boolean(error)

    return (
      <S.InputContainer>
        <S.Label htmlFor={selectId}>{label}</S.Label>
        <S.Select id={selectId} $hasError={hasError} ref={ref} {...props}>
          {children}
        </S.Select>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputContainer>
    )
  }
)

// Checkbox
Input.Checkbox = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <S.CheckboxContainer>
      <S.HiddenCheckbox ref={ref} {...props} />
      <S.Checkbox />
      <S.CheckboxLabel>{label}</S.CheckboxLabel>
    </S.CheckboxContainer>
  )
})

Input.Text.displayName = 'Input.Text'
Input.Number.displayName = 'Input.Number'
Input.TextArea.displayName = 'Input.TextArea'
Input.Select.displayName = 'Input.Select'
Input.Checkbox.displayName = 'Input.Checkbox'

export default Input
