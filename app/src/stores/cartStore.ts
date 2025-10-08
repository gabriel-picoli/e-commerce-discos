import { create } from 'zustand'

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

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product, quantity = 1) => {
    const { items } = get()
    const existing = items.find((item) => item.product.id === product.id)

    if (existing) {
      // add na quantidade se o item ja existe
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
}))
