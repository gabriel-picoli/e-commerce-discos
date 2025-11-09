import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as S from './styles'

import Input from '../../../components/input'
import Button from '../../../components/button'
import Form from '../../../components/form'

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  tipo: z.string().min(1, 'Type is required'),
  conservacao: z.string().min(1, 'Condition is required'),
  genero: z.string().min(1, 'Genre is required'),
  artista: z.string().min(1, 'Artist is required'),
  quanti: z.number().min(1, 'Quantity must be at least 1'),
  capa: z.string().url('Must be a valid URL'),
  lancamento: z.string().min(4, 'Release year is required'),
  preco: z.number().min(0, 'Price must be positive')
})

type ProductFormData = z.infer<typeof productSchema>

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      // TODO: API integration
      console.log('Product data:', data)
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <S.FormContainer>
      <S.Title>New Product</S.Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input.Text
          {...register('name')}
          label="Product Name"
          placeholder="Enter product name"
          error={errors.name?.message}
        />

        <Input.Text
          {...register('tipo')}
          label="Type"
          placeholder="LP, EP, etc."
          error={errors.tipo?.message}
        />

        <Input.Text
          {...register('conservacao')}
          label="Condition"
          placeholder="Mint, Near Mint, etc."
          error={errors.conservacao?.message}
        />

        <Input.Text
          {...register('genero')}
          label="Genre"
          placeholder="Rock, Jazz, etc."
          error={errors.genero?.message}
        />

        <Input.Text
          {...register('artista')}
          label="Artist"
          placeholder="Artist or band name"
          error={errors.artista?.message}
        />

        <Input.Number
          {...register('quanti', { valueAsNumber: true })}
          label="Quantity"
          placeholder="Available quantity"
          error={errors.quanti?.message}
        />

        <Input.Text
          {...register('capa')}
          label="Cover Image URL"
          placeholder="https://example.com/image.jpg"
          error={errors.capa?.message}
        />

        <Input.Text
          {...register('lancamento')}
          label="Release Year"
          placeholder="YYYY"
          error={errors.lancamento?.message}
        />

        <Input.Number
          {...register('preco', { valueAsNumber: true })}
          label="Price"
          placeholder="Price in BRL"
          error={errors.preco?.message}
        />

        <Button.Primary type="submit">Create Product</Button.Primary>
      </Form>
    </S.FormContainer>
  )
}
