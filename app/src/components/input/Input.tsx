import { forwardRef, useId } from 'react'

import { NumericFormat } from 'react-number-format'

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
  Text: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
  Number: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
  TextArea: React.ForwardRefExoticComponent<
    TextAreaProps & React.RefAttributes<HTMLTextAreaElement>
  >
  Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>
  Checkbox: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>
  Currency: React.ForwardRefExoticComponent<
    InputProps & { value: string } & React.RefAttributes<HTMLInputElement>
  >
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

// text input
Input.Text = forwardRef<HTMLInputElement, InputProps>(({ type = 'text', ...props }, ref) => {
  return <Input ref={ref} type={type} {...props} />
})

// number input
Input.Number = forwardRef<HTMLInputElement, InputProps>(({ type = 'number', ...props }, ref) => {
  return <Input ref={ref} type={type} {...props} />
})

// textarea
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

// select
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

// checkbox
Input.Checkbox = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <S.CheckboxContainer>
      <S.HiddenCheckbox ref={ref} {...props} />
      <S.Checkbox />
      <S.CheckboxLabel>{label}</S.CheckboxLabel>
    </S.CheckboxContainer>
  )
})

Input.Currency = forwardRef<HTMLInputElement, InputProps & { value: string }>(
  ({ label, value, error, name, helperText, ...props }, ref) => {
    const inputId = useId()

    const { defaultValue, type, ...numericFormatProps } = props

    return (
      <S.InputContainer>
        <S.Label htmlFor={inputId}>{label}</S.Label>
        <NumericFormat
          id={inputId}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          value={value}
          name={name}
          onValueChange={(values) => {
            if (numericFormatProps.onChange) {
              // Create a synthetic event to match the expected signature
              numericFormatProps.onChange({
                ...({} as unknown as React.ChangeEvent<HTMLInputElement>),
                target: {
                  ...({} as unknown as HTMLInputElement),
                  value: values.value,
                  name: name || ''
                }
              })
            }
          }}
          customInput={S.Input}
          getInputRef={ref}
          {...numericFormatProps}
        />
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputContainer>
    )
  }
)

export default Input
