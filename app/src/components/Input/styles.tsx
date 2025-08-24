import styled from 'styled-components'
import theme from '../../styles/theme'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  font-size: 1rem;
  color: ${theme.colors.neutral_900};
  margin-bottom: 0.2rem;
  font-weight: 600;
`

export const Input = styled.input<{ $hasError: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.$hasError ? `${theme.colors.red}` : '#ccc')};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: ${(props) => (props.$hasError ? `${theme.colors.red}` : '#666')};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.neutral_500};
    font-size: 0.9rem;
  }
`

export const ErrorMessage = styled.span`
  color: ${theme.colors.red};
  font-size: 0.775rem;
  margin-top: 0.2rem;
`
