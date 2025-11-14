import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuth } from '../../../hooks/useAuth'
import { useCreateProduct, useProductById, useUpdateProduct } from '../../../hooks/useProducts'

import type { Product } from '../../../interfaces/Products'

import { parseCurrency } from '../../../utils/currency'

import * as S from './styles'

import Input from '../../../components/input'
import Button from '../../../components/button'
import Form from '../../../components/form'
import Loading from '../../../components/loading/Loading'

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
  preco: z.string().min(1, 'Price is required')
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
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const isEditMode = !!id
  const productId = id ? Number(id) : undefined

  console.log(id)

  console.log(isEditMode)

  console.log(productId)

  const { data: existingProduct, isLoading: isLoadingProduct } = useProductById(productId ?? 0)

  const createMutation = useCreateProduct()
  const isCreating = (createMutation as any).isLoading || false

  const updateMutation = useUpdateProduct()
  const isUpdating = (updateMutation as any).isLoading || false

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (!user || !userId) {
        console.error('User not found. Cannot save product.')
        return
      }

      const payload: Product = {
        name: data.name,
        tipo: data.tipo,
        conservacao: data.conservacao,
        genero: data.genero,
        artista: data.artista,
        quanti: data.quanti,
        capa: data.capa,
        lancamento: data.lancamento,
        preco: parseCurrency(data.preco),
        id_user: userId
      }

      if (isEditMode && productId) {
        await updateMutation.mutateAsync({ ...payload, id: productId })
      } else {
        await createMutation.mutateAsync(payload)
      }

      navigate('/seller/products')
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  useEffect(() => {
    if (isEditMode && existingProduct) {
      reset({
        name: existingProduct.name,
        tipo: existingProduct.tipo,
        conservacao: existingProduct.conservacao,
        genero: existingProduct.genero,
        artista: existingProduct.artista,
        quanti: existingProduct.quanti,
        capa: existingProduct.capa,
        lancamento: existingProduct.lancamento,
        preco: String(existingProduct.preco)
      })

      console.log({
        name: existingProduct.name,
        tipo: existingProduct.tipo,
        conservacao: existingProduct.conservacao,
        genero: existingProduct.genero,
        artista: existingProduct.artista,
        quanti: existingProduct.quanti,
        capa: existingProduct.capa,
        lancamento: existingProduct.lancamento,
        preco: String(existingProduct.preco)
      })
    }
  }, [existingProduct, isEditMode, reset])

  if (isEditMode && isLoadingProduct) {
    return <Loading />
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

        <Form.Row>
          <Input.Text
            {...register('tipo')}
            label="Type"
            placeholder="LP, EP, etc."
            error={errors.tipo?.message}
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

          <Input.Currency
            label="Price"
            placeholder="Price in BRL"
            value={watch('preco')}
            onChange={(e) => {
              setValue('preco', e.target.value)
            }}
            name="preco"
            error={errors.preco?.message}
          />
        </Form.Row>

        <Button.Primary type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
            ? isEditMode
              ? 'Updating…'
              : 'Creating…'
            : isEditMode
              ? 'Update Product'
              : 'Create Product'}
        </Button.Primary>
      </Form>
    </S.FormContainer>
  )
}
