import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '../../../hooks/useAuth'
import { useCreateProduct } from '../../../hooks/useProducts'

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
  capa: z.string().refine((val) => {
    try {
      const url = new URL(val)

      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (error) {
      return false
    }
  }, 'Must be a valid URL'),
  lancamento: z.string().min(4, 'Release year is required'),
  preco: z.number().min(0, 'Price must be positive')
})

type ProductFormData = z.infer<typeof productSchema>

const CONSERVATION = [
  { value: 'mint', label: 'Mint' },
  { value: 'near mint', label: 'Near Mint' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'very good plus', label: 'Very Good Plus' },
  { value: 'very good', label: 'Very Good' },
  { value: 'good plus', label: 'Good Plus' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
]

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const createMutation = useCreateProduct()
  const isCreating = (createMutation as any).isLoading || false

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!user || !userId) {
        console.error('User not found. Cannot create product.')

        return
      }

      const payload = {
        name: data.name,
        tipo: data.tipo,
        conservacao: data.conservacao,
        genero: data.genero,
        artista: data.artista,
        quanti: data.quanti,
        capa: data.capa,
        lancamento: data.lancamento,
        preco: data.preco,
        id_user: userId
      }

      await createMutation.mutateAsync(payload)

      navigate('/seller/products')
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

        <Form.Row>
          <Input.Text
            {...register('conservacao')}
            label="Select Condition"
            placeholder="Select a condition"
            error={errors.conservacao?.message}
          />

          <Input.Select
            {...register('conservacao')}
            label="Select Condition"
            error={errors.conservacao?.message}
          >
            <option value="">Select a condition</option>
            {CONSERVATION?.map((conservation) => (
              <option key={conservation.value} value={conservation.value}>
                {conservation.label}
              </option>
            ))}
          </Input.Select>
        </Form.Row>

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

        <Form.Row>
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
        </Form.Row>

        <Button.Primary type="submit" disabled={isCreating}>
          {isCreating ? 'Creating…' : 'Create Product'}
        </Button.Primary>
      </Form>
    </S.FormContainer>
  )
}
