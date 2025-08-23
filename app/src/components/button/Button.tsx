import * as S from './styles'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  type: 'button' | 'submit' | 'reset'
}

export default function Button({ children, type, ...props }: ButtonProps) {
  return (
    <S.Button type={type} {...props}>
      {children}
    </S.Button>
  )
}
