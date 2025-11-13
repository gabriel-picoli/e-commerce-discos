import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type { Ad } from '../interfaces/Ad'

type CartItem = {
  ad: Ad
  quantity: number
}

type CartState = {
  items: CartItem[]
  addToCart: (ad: Ad, quantity: number) => void
  removeFromCart: (adId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (ad, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.ad.id === ad.id)

        if (existing) {
          const updatedItems = items.map((item) =>
            item.ad.id === ad.id ? { ...item, quantity: item.quantity + quantity } : item
          )
          set({ items: updatedItems })
        } else {
          set({ items: [...items, { ad, quantity }] })
        }
      },

      removeFromCart: (adId) => {
        set({ items: get().items.filter((item) => item.ad.id !== adId) })
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
