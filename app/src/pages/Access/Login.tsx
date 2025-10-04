import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import * as S from './styles'

import { useAuth } from '../../hooks/useAuth'

import { useAuthStore } from '../../stores/authStore'

import getCsrfCookie from '../../utils/getCsrfCookie'

import Input from '../../components/Input'
import Form from '../../components/form'
import Button from '../../components/button'

const loginSchema = z.object({
  email: z.string().min(2, 'E-mail must be at least 2 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

type LoginData = z.infer<typeof loginSchema>

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  })

  const { login } = useAuth()

  const { clearAuth } = useAuthStore()

  const navigate = useNavigate()

  const onSubmit = async ({ email, password }: LoginData) => {
    await getCsrfCookie()

    toast.promise(login({ email, password }), {
      loading: 'Logging in...',
      success: 'Welcome back!',
      error: 'Failed to login. Please check your credentials.'
    })
  }

  useEffect(() => {
    clearAuth()
  }, [])

  return (
    <S.Container>
      <S.LeftPanel>
        <S.BrandSection>
          <S.BrandName>Pozzoleone</S.BrandName>
          <S.BrandTagline>Premium Vinyl Collection</S.BrandTagline>
        </S.BrandSection>
      </S.LeftPanel>

      <S.RightPanel>
        <S.FormContainer>
          <S.FormHeader>
            <S.FormTitle>Login</S.FormTitle>
            <S.FormSubtitle>Time to drop the needle on your collection</S.FormSubtitle>
          </S.FormHeader>

          <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Input
              type="email"
              {...register('email')}
              placeholder="Enter your e-mail"
              label="E-mail"
              helperText={errors.email?.message}
            />

            <Input
              type="password"
              {...register('password')}
              placeholder="Enter your last password"
              label="Password"
              helperText={errors.password?.message}
            />

            <S.ButtonContainer>
              <Button.Primary type="submit" size="medium">
                Sign In
              </Button.Primary>
            </S.ButtonContainer>
          </Form>

          <S.FormFooter>
            <S.FooterText>
              Don't have an account?{' '}
              <S.FooterLink onClick={() => navigate('/register')}>Sign up here</S.FooterLink>
            </S.FooterText>
          </S.FormFooter>
        </S.FormContainer>
      </S.RightPanel>
    </S.Container>
  )
}
