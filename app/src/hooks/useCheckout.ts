import { useMutation } from '@tanstack/react-query'

import { createCheckout } from '../services/checkoutApi'

import { useCartStore } from '../stores/cartStore'

import type { Checkout } from '../interfaces/Checkout'

import { showSuccess } from '../utils/toast'
import { handleApiError } from '../utils/handleApiError'

export const useCreateCheckout = () => {
  const { clearCart } = useCartStore()

  return useMutation({
    mutationFn: (checkout: Checkout) => createCheckout(checkout),

    onSuccess: (_data) => {
      showSuccess('Your order has been placed successfully!')

      clearCart()
    },

    onError: (error) => {
      handleApiError(error)
    }
  })
}
