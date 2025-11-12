import { useState } from 'react'

import { FiCreditCard, FiTruck, FiUser } from 'react-icons/fi'

import { formatCurrency } from '../../utils/currency'

import { useCartStore } from '../../stores/cartStore'

import * as S from './styles'

import Input from '../../components/input'
import Button from '../../components/button'

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    // Contact
    name: '',
    email: '',
    phone: '',
    // Address
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    // Payment
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })

  const { items } = useCartStore()

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'Nome é obrigatório'
    if (!formData.email) newErrors.email = 'Email é obrigatório'
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório'
    if (!formData.cep) newErrors.cep = 'CEP é obrigatório'
    if (!formData.address) newErrors.address = 'Endereço é obrigatório'
    if (!formData.number) newErrors.number = 'Número é obrigatório'
    if (!formData.city) newErrors.city = 'Cidade é obrigatória'
    if (!formData.state) newErrors.state = 'Estado é obrigatório'

    if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório'
      if (!formData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório'
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Validade é obrigatória'
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Pedido confirmado com sucesso!')
      console.log('Order data:', formData)
    }
  }

  const subtotal = items.reduce((acc, item) => acc + item.product.preco * item.quantity, 0)
  const shipping = 15.0
  const total = subtotal + shipping

  return (
    <S.Container>
      <S.Content>
        <S.MainContent>
          <S.Section>
            <S.SectionHeader>
              <FiUser size={20} />
              <S.SectionTitle>Contact Information</S.SectionTitle>
            </S.SectionHeader>
            <S.FormGrid>
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="John Smith"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@email.com"
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="(123) 456-7890"
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
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  error={errors.cep}
                  placeholder="00000-000"
                />
              </S.GridItem>
              <S.GridItem $span={2}>
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  placeholder="Street, Avenue..."
                />
              </S.GridItem>
              <S.GridItem $span={1}>
                <Input
                  label="Number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  error={errors.number}
                  placeholder="123"
                />
              </S.GridItem>
              <S.GridItem $span={2}>
                <Input
                  label="Complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  placeholder="Apt, Block... (optional)"
                />
              </S.GridItem>
              <Input
                label="Neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="Downtown"
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="New York"
              />
              <Input.Select
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
              >
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
              <S.PaymentMethod
                $active={formData.paymentMethod === 'credit'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'credit' }))}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                />
                <span>Credit Card</span>
              </S.PaymentMethod>
              <S.PaymentMethod
                $active={formData.paymentMethod === 'debit'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'debit' }))}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit"
                  checked={formData.paymentMethod === 'debit'}
                  onChange={handleChange}
                />
                <span>Debit Card</span>
              </S.PaymentMethod>
              <S.PaymentMethod
                $active={formData.paymentMethod === 'pix'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'pix' }))}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={formData.paymentMethod === 'pix'}
                  onChange={handleChange}
                />
                <span>PIX</span>
              </S.PaymentMethod>
              <S.PaymentMethod
                $active={formData.paymentMethod === 'boleto'}
                onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'boleto' }))}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={formData.paymentMethod === 'boleto'}
                  onChange={handleChange}
                />
                <span>Bank Slip</span>
              </S.PaymentMethod>
            </S.PaymentMethods>

            {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
              <S.FormGrid style={{ marginTop: '24px' }}>
                <S.GridItem $span={3}>
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    error={errors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                  />
                </S.GridItem>
                <S.GridItem $span={3}>
                  <Input
                    label="Name on Card"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    error={errors.cardName}
                    placeholder="FULL NAME"
                  />
                </S.GridItem>
                <Input
                  label="Expiration Date"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleChange}
                  error={errors.cardExpiry}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                <Input
                  label="CVV"
                  name="cardCvv"
                  value={formData.cardCvv}
                  onChange={handleChange}
                  error={errors.cardCvv}
                  placeholder="123"
                  maxLength={3}
                />
              </S.FormGrid>
            )}
          </S.Section>
        </S.MainContent>

        <S.Sidebar>
          <S.SummaryCard>
            <S.SummaryTitle>Order Summary</S.SummaryTitle>

            <S.ItemsList>
              {items.map((item) => (
                <S.SummaryItem key={item.product.id}>
                  <S.ItemImage src={item.product.capa} alt={item.product.name} />
                  <S.ItemInfo>
                    <S.ItemName>{item.product.name}</S.ItemName>
                    <S.ItemQuantity>
                      {item.quantity}x {formatCurrency(item.product.preco)}
                    </S.ItemQuantity>
                  </S.ItemInfo>
                  <S.ItemTotal>{formatCurrency(item.product.preco * item.quantity)}</S.ItemTotal>
                </S.SummaryItem>
              ))}
            </S.ItemsList>

            <S.Divider />

            <S.SummaryRow>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </S.SummaryRow>
            <S.SummaryRow>
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </S.SummaryRow>

            <S.Divider />

            <S.TotalRow>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </S.TotalRow>
            
            <Button size="small" onClick={handleSubmit}>
              Confirm Payment
            </Button>
          </S.SummaryCard>
        </S.Sidebar>
      </S.Content>
    </S.Container>
  )
}
