import styled from 'styled-components'

import theme from '../../styles/theme'

export const FilterContainer = styled.aside`
  position: sticky;
  top: 0;
  z-index: 90;
  height: 100vh;
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
    height: auto;
    border-right: none;
    border-bottom: 1px solid ${theme.colors.neutral_100};
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
  padding-bottom: 0.4rem;
  border-bottom: 1px solid ${theme.colors.neutral_100};
`

export const HeaderIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral_900};
`

export const FilterHeaderTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${theme.colors.neutral_900};
  margin: 0;
`

export const FilterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const FilterLabel = styled.label`
  font-size: 1.2rem;
  color: ${theme.colors.neutral_600};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const Select = styled.select`
  appearance: none;
  border: none;
  border-bottom: 1.5px solid ${theme.colors.neutral_200};
  border-radius: 0;
  padding: 0.8rem 2.4rem 0.8rem 0;
  font-size: 1.4rem;
  color: ${theme.colors.neutral_900};
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23999' d='M1.41 0L6 4.58 10.59 0 12 1.42l-6 6-6-6z'/%3E%3C/svg%3E")
    no-repeat right center;
  background-size: 12px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 400;

  &:hover {
    border-bottom-color: ${theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${theme.colors.primary};
    background-color: ${theme.colors.neutral_50 || '#fafafa'};
  }

  option {
    padding: 0.8rem;
  }
`

export const PriceInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

export const PriceInput = styled.input`
  width: 100%;
  max-width: 100px;
  padding: 0.8rem 0;
  border: none;
  border-bottom: 1.5px solid ${theme.colors.neutral_200 || '#e5e5e5'};
  border-radius: 0;
  font-size: 1.4rem;
  text-align: left;
  color: ${theme.colors.neutral_900 || '#111'};
  transition: all 0.3s ease;
  background: transparent;
  font-weight: 400;

  &::placeholder {
    color: ${theme.colors.neutral_400 || '#999'};
  }

  &:hover {
    border-bottom-color: ${theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-bottom-color: ${theme.colors.primary};
    background-color: ${theme.colors.neutral_50 || '#fafafa'};
  }
`

export const PriceSeparator = styled.span`
  color: ${theme.colors.neutral_400 || '#999'};
  font-weight: 300;
  font-size: 1.4rem;
`

export const ClearButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.neutral_300 || '#ddd'};
  color: ${theme.colors.neutral_700 || '#444'};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover:not(:disabled) {
    background: ${theme.colors.neutral_900 || '#111'};
    color: white;
    border-color: ${theme.colors.neutral_900 || '#111'};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  padding-top: 0.8rem;
`

export const FilterTag = styled.div`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.neutral_200 || '#e5e5e5'};

  &:hover {
    background: ${theme.colors.primaryHover};
    color: white;
    border-color: ${theme.colors.primaryHover};
  }

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`
