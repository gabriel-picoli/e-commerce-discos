import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { Product } from '../interfaces/Products'

type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.product.id === product.id)

        if (existing) {
          const updatedItems = items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
          set({ items: updatedItems })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) })
      },

      clearCart: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'cart-storage', // chave usada no localStorage
      storage: createJSONStorage(() => localStorage) // garante que o estado eh salvo no navegador
    }
  )
)
