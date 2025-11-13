import api from './api'

import type { Checkout } from '../interfaces/Checkout'

export const createCheckout = async (checkout: Checkout) => {
  const { data } = await api.post('/checkout', checkout)

  return data
}
