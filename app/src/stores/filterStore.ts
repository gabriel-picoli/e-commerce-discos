import { create } from 'zustand'

export type Filters = {
  genre: string
  artist: string
  conservation: string
  type: string
  year: string
  priceMin: number
  priceMax: number
}

type FilterStore = {
  filters: Filters
  updateFilter: (key: string, value: string) => void
  clearFilters: () => void
  hasActiveFilters: () => boolean
  getActiveFilters: () => any[]
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: {
    genre: '',
    artist: '',
    conservation: '',
    type: '',
    year: '',
    priceMin: 0,
    priceMax: 0
  },

  updateFilter: (key: string, value: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }))
  },

  clearFilters: () => {
    set({
      filters: {
        genre: '',
        artist: '',
        conservation: '',
        type: '',
        year: '',
        priceMin: 0,
        priceMax: 0
      }
    })
  },

  getActiveFilters: () => {
    const { filters } = get()

    return Object.entries(filters)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => ({ key, value }))
  },

  hasActiveFilters: () => {
    const { filters } = get()

    return Object.values(filters).some((value) => value !== '')
  }
}))
