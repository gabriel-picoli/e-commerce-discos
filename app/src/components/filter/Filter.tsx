import React, { useEffect } from 'react'

import { FiX, FiSliders } from 'react-icons/fi'

import { useFilterStore, type Filters } from '../../stores/filterStore'

import * as S from './styles'
import { formatCurrency } from '../../utils/currency'

type FilterProps = {
  children: React.ReactNode
  onFilterChange?: (filters: any) => void
}

const FilterRoot = ({ children, onFilterChange }: FilterProps) => {
  const filters = useFilterStore((state) => state.filters)

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters)
    }
  }, [filters, onFilterChange])

  return (
    <S.FilterContainer>
      <S.FilterWrapper>
        <S.FilterHeader>
          <S.HeaderIcon>
            <FiSliders size={18} />
          </S.HeaderIcon>
          <S.FilterHeaderTitle>Filtros</S.FilterHeaderTitle>
        </S.FilterHeader>

        {children}
      </S.FilterWrapper>
    </S.FilterContainer>
  )
}

const FilterControls = ({ children }: Omit<FilterProps, 'onFilterChange'>) => {
  return <S.FilterGrid>{children}</S.FilterGrid>
}

type FilterSelectProps = {
  label: string
  filterKey: string
  options: string[]
}

const FilterSelect = ({ label, filterKey, options }: FilterSelectProps) => {
  const filters: Filters = useFilterStore((state) => state.filters)
  const updateFilter = useFilterStore((state) => state.updateFilter)

  return (
    <S.FilterGroup>
      <S.FilterLabel>{label}</S.FilterLabel>
      <S.Select
        value={filters[filterKey as keyof Filters]}
        onChange={(e) => updateFilter(filterKey, e.target.value)}
      >
        <option value="">Todos</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </S.Select>
    </S.FilterGroup>
  )
}

const FilterPriceRange = () => {
  const filters = useFilterStore((state) => state.filters)
  const updateFilter = useFilterStore((state) => state.updateFilter)

  return (
    <S.FilterGroup>
      <S.FilterLabel>Faixa de Preço</S.FilterLabel>
      <S.PriceInputs>
        <S.PriceInput
          type="number"
          placeholder="Min"
          value={formatCurrency(filters.priceMin)}
          onChange={(e) => updateFilter('priceMin', e.target.value)}
        />
        <S.PriceSeparator>até</S.PriceSeparator>
        <S.PriceInput
          type="number"
          placeholder="Max"
          value={formatCurrency(filters.priceMax)}
          onChange={(e) => updateFilter('priceMax', e.target.value)}
        />
      </S.PriceInputs>
    </S.FilterGroup>
  )
}

const FilterActiveTags = () => {
  const getActiveFilters = useFilterStore((state) => state.getActiveFilters)
  const updateFilter = useFilterStore((state) => state.updateFilter)
  const activeFilters = getActiveFilters()

  if (activeFilters.length === 0) return null

  const filterLabels: Record<string, string> = {
    genre: 'Gênero',
    artist: 'Artista',
    conservation: 'Conservação',
    type: 'Tipo',
    year: 'Ano',
    priceMin: 'Mínimo',
    priceMax: 'Máximo',
   
  }

  return (
    <S.ActiveFilters>
      {activeFilters.map(({ key, value }) => {
        const isPrice = key === 'priceMin' || key === 'priceMax'
        const displayValue = isPrice ? formatCurrency(Number(value)) : String(value)

        return (
          <S.FilterTag key={key} onClick={() => updateFilter(key, '')}>
            {filterLabels[key]}: {displayValue}
            <FiX size={14} />
          </S.FilterTag>
        )
      })}
    </S.ActiveFilters>
  )
}

const Filter = Object.assign(FilterRoot, {
  Controls: FilterControls,
  Select: FilterSelect,
  PriceRange: FilterPriceRange,
  ActiveTags: FilterActiveTags
})

export default Filter
