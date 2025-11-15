import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '../interfaces/User'

interface AuthState {
  user: User | null
  authenticated: boolean
  setAuth: (user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authenticated: false,

      setAuth: (user) => set({ user, authenticated: true }),

      clearAuth: () => {
        set({ user: null, authenticated: false })

        localStorage.removeItem('auth-storage')
      }
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({
        user: state.user,
        authenticated: state.authenticated
      })
    }
  )
)
