import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding: 24px;
`

export const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 32px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 1.4rem;
  cursor: pointer;
  margin-bottom: 16px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`

export const Title = styled.h1`
  color: ${theme.colors.primary};
  font-size: 2.8rem;
  font-weight: 600;
  margin: 0;
`

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

export const MainContent = styled.div``

export const Section = styled.section`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  color: ${theme.colors.primary};
`

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const GridItem = styled.div<{ $span?: number }>`
  grid-column: span ${(props) => props.$span || 1};
`

export const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const PaymentMethod = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${(props) => (props.$active ? theme.colors.primary : '#ddd')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.$active ? '#f8f8f8' : 'white')};

  &:hover {
    border-color: ${theme.colors.primary};
  }

  input {
    cursor: pointer;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
  }
`

export const Sidebar = styled.aside`
  @media (max-width: 968px) {
    order: -1;
  }
`

export const SummaryCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  position: sticky;
  top: calc(80px + 16px); /* altura do header + espaçamento */
`

export const SummaryTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  margin: 0 0 20px 0;
`

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`

export const SummaryItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`

export const ItemInfo = styled.div`
  flex: 1;
`

export const ItemName = styled.p`
  font-size: 1.4rem;
  margin: 0 0 4px 0;
  color: ${theme.colors.primary};
`

export const ItemQuantity = styled.p`
  font-size: 1.2rem;
  margin: 0;
  color: ${theme.colors.neutral_400};
`

export const ItemTotal = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.primary};
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.neutral_200};
  margin: 20px 0;
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: ${theme.colors.neutral_400};
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${theme.colors.primary};
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${theme.colors.primary};
`

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${(props) => (props.$hasError ? '#e53e3e' : '#ddd')};
  border-radius: 4px;
  font-size: 1.4rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.neutral_400};
  }
`

export const StyledSelect = styled.select<{ $hasError?: boolean }>`
  padding: 12px;
  border: 1px solid ${(props) => (props.$hasError ? '#e53e3e' : '#ddd')};
  border-radius: 4px;
  font-size: 1.4rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`

export const ErrorMessage = styled.span`
  font-size: 1.2rem;
  color: #e53e3e;
`
