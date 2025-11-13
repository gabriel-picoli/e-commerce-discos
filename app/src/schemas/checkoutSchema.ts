import z from 'zod'

export const checkoutSchema = z
  .object({
    // contact
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone number is required'),

    // address
    cep: z.string().min(1, 'ZIP code is required'),
    address: z.string().min(1, 'Address is required'),
    number: z.string().min(1, 'Number is required'),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),

    // payment
    paymentMethod: z.enum(['credit', 'debit', 'pix', 'boleto']),
    cardNumber: z.string().optional(),
    cardName: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 'credit' || data.paymentMethod === 'debit') {
      if (!data.cardNumber) {
        ctx.addIssue({
          path: ['cardNumber'],
          message: 'Card number is required',
          code: 'custom'
        })
      }
      if (!data.cardName) {
        ctx.addIssue({
          path: ['cardName'],
          message: 'Name on card is required',
          code: 'custom'
        })
      }
      if (!data.cardExpiry) {
        ctx.addIssue({
          path: ['cardExpiry'],
          message: 'Expiration date is required',
          code: 'custom'
        })
      }
      if (!data.cardCvv) {
        ctx.addIssue({
          path: ['cardCvv'],
          message: 'CVV is required',
          code: 'custom'
        })
      }
    }
  })
