import styled from 'styled-components'

import theme from '../../styles/theme'

const arrowSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23888' d='M1.41 0L6 4.58 10.59 0 12 1.42l-6 6-6-6z'/%3E%3C/svg%3E\")"

export const FilterContainer = styled.aside`
  position: sticky;
  top: 8.5rem;
  z-index: 90;
  height: 100%;
  width: 280px;
  flex-shrink: 0;
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: auto;

  @media (max-width: 900px) {
    position: relative;
    width: 100%;
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
    backdrop-filter: none;
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`

export const FilterHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${theme.colors.neutral_200};
`

export const HeaderIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
`

export const FilterHeaderTitle = styled.h3`
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
  color: ${theme.colors.neutral_900};
`

export const FilterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const FilterLabel = styled.label`
  font-size: 1.25rem;
  color: ${theme.colors.neutral_700};
  font-weight: 600;
  letter-spacing: 0;
`

export const Select = styled.select`
  appearance: none;
  padding: 1rem 1.2rem;
  background: ${theme.colors.neutral_50};
  border-radius: 10px;
  border: 1px solid ${theme.colors.neutral_200};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${theme.colors.neutral_900};
  transition: all 0.25s ease;
  cursor: pointer;

  background-image: ${arrowSvg};
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: white;

    background-image: ${arrowSvg};
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 12px;
  }
`

export const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

export const PriceInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  background: ${theme.colors.neutral_50};
  border: 1px solid ${theme.colors.neutral_200};
  font-size: 1.4rem;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: white;
  }
`

export const PriceSeparator = styled.span`
  font-size: 1.3rem;
  color: ${theme.colors.neutral_500};
`

export const ClearButton = styled.button`
  padding: 0.8rem 1.6rem;
  background: ${theme.colors.neutral_100};
  border-radius: 8px;
  border: 1px solid ${theme.colors.neutral_300};
  color: ${theme.colors.neutral_800};
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${theme.colors.neutral_900};
    border-color: ${theme.colors.neutral_900};
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 0.8rem;
`

export const FilterTag = styled.div`
  padding: 0.5rem 1.2rem;
  background: ${theme.colors.neutral_900};
  color: white;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid ${theme.colors.neutral_800};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  svg {
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`
