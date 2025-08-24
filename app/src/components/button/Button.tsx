import * as S from './styles'

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

type ButtonProps = BaseButtonProps & {
  variant?: 'primary' | 'outline' | 'rounded-outline' | 'cancel'
}

function Button({ children, variant = 'primary', size = 'medium', type, ...props }: ButtonProps) {
  return (
    <S.Button type={type} $variant={variant} $size={size} {...props}>
      {children}
    </S.Button>
  )
}

Button.Primary = ({ children, size = 'medium', ...props }: BaseButtonProps) => (
  <Button variant="primary" size={size} {...props}>
    {children}
  </Button>
)

Button.Outline = ({ children, size = 'medium', ...props }: BaseButtonProps) => (
  <Button variant="outline" size={size} {...props}>
    {children}
  </Button>
)

Button.RoundedOutline = ({ children, size = 'medium', ...props }: BaseButtonProps) => (
  <Button variant="rounded-outline" size={size} {...props}>
    {children}
  </Button>
)

Button.Cancel = ({ children, size = 'medium', ...props }: BaseButtonProps) => (
  <Button variant="cancel" size={size} {...props}>
    {children}
  </Button>
)

Button.Small = ({ children, variant = 'primary', ...props }: Omit<ButtonProps, 'size'>) => (
  <Button variant={variant} size="small" {...props}>
    {children}
  </Button>
)

Button.Large = ({ children, variant = 'primary', ...props }: Omit<ButtonProps, 'size'>) => (
  <Button variant={variant} size="large" {...props}>
    {children}
  </Button>
)

export default Button
