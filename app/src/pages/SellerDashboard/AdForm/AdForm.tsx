import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as S from './styles'

import Input from '../../../components/input'
import Button from '../../../components/button'
import Form from '../../../components/form'

const adSchema = z.object({
  titulo: z.string().min(3, 'Title must be at least 3 characters'),
  descricao: z.string().min(10, 'Description must be at least 10 characters'),
  preco: z.number().min(0, 'Price must be positive'),
  id_produto: z.number().min(1, 'Must select a product')
})

type AdFormData = z.infer<typeof adSchema>

export default function AdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AdFormData>({
    resolver: zodResolver(adSchema)
  })

  const onSubmit = async (data: AdFormData) => {
    try {
      // TODO: API integration
      console.log('Ad data:', data)
    } catch (error) {
      console.error('Error creating ad:', error)
    }
  }

  return (
    <S.FormContainer>
      <S.Title>Create Advertisement</S.Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input.Text
          {...register('titulo')}
          label="Title"
          placeholder="Enter ad title"
          error={errors.titulo?.message}
        />

        <Input.TextArea
          {...register('descricao')}
          label="Description"
          placeholder="Enter ad description"
          error={errors.descricao?.message}
        />

        <Input.Number
          {...register('preco', { valueAsNumber: true })}
          label="Price"
          placeholder="Price in BRL"
          error={errors.preco?.message}
        />

        <Input.Select
          {...register('id_produto', { valueAsNumber: true })}
          label="Select Product"
          error={errors.id_produto?.message}
        >
          <option value="">Select a product</option>
          {/* TODO: Add product options from API */}
        </Input.Select>

        <Button.Primary type="submit">Create Advertisement</Button.Primary>
      </Form>
    </S.FormContainer>
  )
}
