import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'

import { useAuth } from '../../../hooks/useAuth'
import { useAdById, useCreateAd, useUpdateAd } from '../../../hooks/useAds'
import { useProductsByUser } from '../../../hooks/useProducts'

import type { Ad } from '../../../interfaces/Ad'

import { formatCurrency, parseCurrency } from '../../../utils/currency'

import * as S from './styles'

import Input from '../../../components/input'
import Button from '../../../components/button'
import Form from '../../../components/form'
import Loading from '../../../components/loading/Loading'

const adSchema = z.object({
  titulo: z.string().min(3, 'Title must be at least 3 characters'),
  descricao: z.string().min(10, 'Description must be at least 10 characters'),
  preco: z.string().min(1, 'Price is required'),

  id_produto: z.preprocess(
    (value: number) => (isNaN(value) ? 0 : value),
    z.number().min(1, 'Product is required')
  )
})

type AdFormData = z.infer<typeof adSchema>

export default function AdForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<AdFormData>({
    resolver: zodResolver(adSchema)
  })

  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const isEditMode = !!id
  const adId = id ? parseInt(id) : undefined

  const { data: existingAd, isFetching: isLoadingAd } = useAdById(adId ?? 0)
  const { mutate: createAd, isPending: isCreating } = useCreateAd(userId)
  const { mutate: updateAd, isPending: isUpdating } = useUpdateAd()

  const { data: products, isFetching: isLoadingProducts } = useProductsByUser(userId)

  const onSubmit = (data: AdFormData) => {
    if (!userId) return

    const adData: Omit<Ad, 'produto'> = {
      ...data,
      preco: parseCurrency(data.preco),
      id_user: userId
    }

    if (isEditMode && adId) {
      updateAd({ ...adData, id: adId })
    } else {
      createAd(adData)
    }

    navigate('/seller/ads')
  }

  // preenche formulario com dados existentes
  useEffect(() => {
    if (isEditMode && existingAd) {
      reset({
        titulo: existingAd.titulo,
        descricao: existingAd.descricao,
        preco: formatCurrency(existingAd.preco),
        id_produto: existingAd.id_produto
      })
    }
  }, [existingAd, isEditMode, reset])

  if (isCreating || isUpdating || isLoadingAd || (isEditMode && isLoadingProducts)) {
    return <Loading transparent />
  }

  return (
    <S.FormContainer>
      <S.Title>{isEditMode ? 'Edit Advertisement' : 'Create Advertisement'}</S.Title>

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

        <Input.Currency
          label="Price"
          placeholder="Price"
          value={watch('preco')}
          onChange={(e) => {
            setValue('preco', e.target.value)
          }}
          name="preco"
          error={errors.preco?.message}
        />

        <Input.Select
          {...register('id_produto', { valueAsNumber: true })}
          label="Select Product"
          error={errors.id_produto?.message}
        >
          <option value="">Select a product</option>
          {products?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Input.Select>

        <Button.Primary type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
            ? isEditMode
              ? 'Updating...'
              : 'Creating...'
            : isEditMode
              ? 'Update Advertisement'
              : 'Create Advertisement'}
        </Button.Primary>
      </Form>
    </S.FormContainer>
  )
}
