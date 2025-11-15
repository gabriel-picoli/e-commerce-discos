import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { FiCreditCard, FiTruck, FiUser } from 'react-icons/fi'

import { useCreateCheckout } from '../../hooks/useCheckout'
import { useAuth } from '../../hooks/useAuth'
import { useUpdateUser } from '../../hooks/useUsers'

import { fetchAddressByZip } from '../../services/fetchAddressByZip'

import { useCartStore } from '../../stores/cartStore'

import type { Checkout } from '../../interfaces/Checkout'

import { checkoutSchema } from '../../schemas/checkoutSchema'

import { formatCurrency } from '../../utils/currency'

import * as S from './styles'

import Input from '../../components/input'
import Button from '../../components/button'
import Form from '../../components/form'

type CheckoutData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema)
  })

  const { user } = useAuth()

  const { mutate: updateUser } = useUpdateUser()

  const { items } = useCartStore()

  const { mutate: createCheckout, isPending } = useCreateCheckout()

  const navigate = useNavigate()

  const paymentMethod = watch('paymentMethod')

  const cep = watch('cep')

  const subtotal = items.reduce((acc, item) => acc + item.ad.preco * item.quantity, 0)
  const shipping = 15.0
  const total = subtotal + shipping

  const onSubmit = (data: CheckoutData) => {
    const checkoutPayload: Checkout = {
      cart: items.map((item) => ({
        anuncio_id: item.ad.id!,
        quantidade: item.quantity
      })),
      endereco: {
        cep: data.cep,
        rua: data.address,
        numero: data.number,
        complemento: data.complement,
        bairro: data.neighborhood,
        cidade: data.city,
        estado: data.state
      },
      pagamento: {
        metodo: data.paymentMethod!,
        detalhes:
          data.paymentMethod === 'credit' || data.paymentMethod === 'debit'
            ? {
                cardNumber: data.cardNumber!,
                cardName: data.cardName!,
                cardExpiry: data.cardExpiry!,
                cardCvv: data.cardCvv!
              }
            : undefined
      }
    }

    const userPayload = {
      id: user?.id!,
      userData: {
        name: data.name,
        email: data.email,
        telefone: data.phone,
        cep: data.cep,
        endereco: `${data.address}, ${data.number}`,
        cidade: data.city,
        estado: data.state
      }
    }

    createCheckout(checkoutPayload, {
      onSuccess: () => {
        // atualiza os dados do usuario apos checkout bem-sucedido
        updateUser(userPayload)

        navigate('/shop')
      }
    })
  }

  useEffect(() => {
    if (user) {
      if (user.name) setValue('name', user.name)
      if (user.email) setValue('email', user.email)
      if (user.telefone) setValue('phone', user.telefone)
      if (user.cep) setValue('cep', user.cep)
      if (user.endereco) {
        const [street, number] = user.endereco.split(',').map((v) => v.trim())

        setValue('address', street)
        setValue('number', number || '')
      }
      if (user.cidade) setValue('city', user.cidade)
      if (user.estado) setValue('state', user.estado)
    }
  }, [user, setValue])

  useEffect(() => {
    const loadAddress = async () => {
      const cleanZip = cep?.replace(/\D/g, '')

      if (!cleanZip || cleanZip.length !== 8) return

      const result = await fetchAddressByZip(cleanZip)

      if (!result) return

      setValue('address', result.logradouro || '')
      setValue('neighborhood', result.bairro || '')
      setValue('city', result.localidade || '')
      setValue('state', result.uf || '')
    }

    loadAddress()
  }, [cep, setValue])

  return (
    <S.Container>
      <S.Content>
        <Form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <S.MainContent>
            <S.Section>
              <S.SectionHeader>
                <FiUser size={20} />
                <S.SectionTitle>Contact Information</S.SectionTitle>
              </S.SectionHeader>

              <S.FormGrid>
                <Input
                  label="Full Name"
                  placeholder="John Smith"
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label="Email"
                  error={errors.email?.message}
                  placeholder="john@email.com"
                  {...register('email')}
                />

                <Input
                  label="Phone"
                  error={errors.phone?.message}
                  placeholder="(123) 456-7890"
                  {...register('phone')}
                />
              </S.FormGrid>
            </S.Section>

            <S.Section>
              <S.SectionHeader>
                <FiTruck size={20} />
                <S.SectionTitle>Shipping Address</S.SectionTitle>
              </S.SectionHeader>

              <S.FormGrid>
                <S.GridItem $span={1}>
                  <Input
                    label="ZIP Code"
                    error={errors.cep?.message}
                    placeholder="00000-000"
                    {...register('cep')}
                  />
                </S.GridItem>

                <S.GridItem $span={2}>
                  <Input
                    label="Address"
                    error={errors.address?.message}
                    placeholder="Street, Avenue..."
                    {...register('address')}
                  />
                </S.GridItem>

                <S.GridItem $span={1}>
                  <Input
                    label="Number"
                    error={errors.number?.message}
                    placeholder="123"
                    {...register('number')}
                  />
                </S.GridItem>

                <S.GridItem $span={2}>
                  <Input
                    label="Complement"
                    placeholder="Apt, Block... (optional)"
                    {...register('complement')}
                  />
                </S.GridItem>

                <Input label="Neighborhood" placeholder="Downtown" {...register('neighborhood')} />

                <Input
                  label="City"
                  error={errors.city?.message}
                  placeholder="New York"
                  {...register('city')}
                />

                <Input.Select label="State" error={errors.state?.message} {...register('state')}>
                  <option value="">Select</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="MG">MG</option>
                  <option value="RS">RS</option>
                </Input.Select>
              </S.FormGrid>
            </S.Section>

            <S.Section>
              <S.SectionHeader>
                <FiCreditCard size={20} />
                <S.SectionTitle>Payment Method</S.SectionTitle>
              </S.SectionHeader>

              <S.PaymentMethods>
                <S.PaymentMethod $active={paymentMethod === 'credit'}>
                  <input type="radio" value="credit" {...register('paymentMethod')} />
                  <span>Credit Card</span>
                </S.PaymentMethod>

                <S.PaymentMethod $active={paymentMethod === 'debit'}>
                  <input type="radio" value="debit" {...register('paymentMethod')} />
                  <span>Debit Card</span>
                </S.PaymentMethod>

                <S.PaymentMethod $active={paymentMethod === 'pix'}>
                  <input type="radio" value="pix" {...register('paymentMethod')} />
                  <span>PIX</span>
                </S.PaymentMethod>

                <S.PaymentMethod $active={paymentMethod === 'boleto'}>
                  <input type="radio" value="boleto" {...register('paymentMethod')} />
                  <span>Bank Slip</span>
                </S.PaymentMethod>
              </S.PaymentMethods>

              {errors.paymentMethod && (
                <S.ErrorMessage>{errors.paymentMethod.message}</S.ErrorMessage>
              )}

              {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                <S.FormGrid style={{ marginTop: '24px' }}>
                  <S.GridItem $span={3}>
                    <Input
                      label="Card Number"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      error={errors.cardNumber?.message}
                      {...register('cardNumber')}
                    />
                  </S.GridItem>

                  <S.GridItem $span={3}>
                    <Input
                      label="Name on Card"
                      placeholder="FULL NAME"
                      error={errors.cardName?.message}
                      {...register('cardName')}
                    />
                  </S.GridItem>

                  <Input
                    label="Expiration Date"
                    placeholder="MM/YY"
                    maxLength={5}
                    error={errors.cardExpiry?.message}
                    {...register('cardExpiry')}
                  />

                  <Input
                    label="CVV"
                    placeholder="123"
                    maxLength={3}
                    error={errors.cardCvv?.message}
                    {...register('cardCvv')}
                  />
                </S.FormGrid>
              )}
            </S.Section>
          </S.MainContent>
        </Form>

        <S.Sidebar>
          <S.SummaryCard>
            <S.SummaryTitle>Order Summary</S.SummaryTitle>

            <S.ItemsList>
              {items.map((item) => (
                <S.SummaryItem key={item.ad.id}>
                  <S.ItemImage src={item.ad.produto.capa} alt={item.ad.produto.name} />
                  <S.ItemInfo>
                    <S.ItemName>{item.ad.produto.name}</S.ItemName>
                    <S.ItemQuantity>
                      {item.quantity}x {formatCurrency(item.ad.preco)}
                    </S.ItemQuantity>
                  </S.ItemInfo>
                  <S.ItemTotal>{formatCurrency(item.ad.preco * item.quantity)}</S.ItemTotal>
                </S.SummaryItem>
              ))}
            </S.ItemsList>

            <S.Divider />

            <S.SummaryRow>
              <S.SummaryText>Subtotal</S.SummaryText>
              <S.SummaryText>{formatCurrency(subtotal)}</S.SummaryText>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryText>Shipping</S.SummaryText>
              <S.SummaryText>{formatCurrency(shipping)}</S.SummaryText>
            </S.SummaryRow>

            <S.Divider />

            <S.TotalRow>
              <S.TotalText>Total</S.TotalText>
              <S.TotalText>{formatCurrency(total)}</S.TotalText>
            </S.TotalRow>

            <Button type="submit" form="checkout-form" size="small" disabled={isPending}>
              {isPending ? 'Ordering...' : 'Complete payment'}
            </Button>
          </S.SummaryCard>
        </S.Sidebar>
      </S.Content>
    </S.Container>
  )
}
