import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Input from '../../components/input'
import Button from '../../components/button'
import Form from '../../components/form'

import * as S from './styles'

import { useCreateUser } from '../../hooks/useUsers'
import { toast } from 'sonner'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().min(2, 'E-mail must be at least 2 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  vendedor: z.boolean()
})

type RegisterData = z.infer<typeof registerSchema>

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema)
  })

  const createUser = useCreateUser()

  const isLoading = createUser.isPending

  const onSubmit = (data: RegisterData) => {
    if (!data) {
      return
    }

    const userPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      vendedor: data.vendedor ? 'S' : 'N'
    }

    createUser.mutateAsync(userPayload)
  }

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
            <S.FormTitle>Register</S.FormTitle>

            <S.FormSubtitle>Time to drop the needle on your collection</S.FormSubtitle>
          </S.FormHeader>

          <Form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <Input
              type="name"
              {...register('name')}
              placeholder="Enter your name"
              label="Name"
              helperText={errors.name?.message}
            />

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
              placeholder="Enter your password"
              label="Password"
              helperText={errors.password?.message}
            />

            <Input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm your password"
              label="Confirm password"
              helperText={errors.confirmPassword?.message}
            />

            <Input.Checkbox
              {...register('vendedor')}
              label="I want to sell my vinyls"
              helperText={errors.vendedor?.message}
            />

            <S.ButtonContainer>
              <Button.Primary type="submit" size="medium" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Submit'}
              </Button.Primary>
            </S.ButtonContainer>
          </Form>
        </S.FormContainer>
      </S.RightPanel>
    </S.Container>
  )
}
