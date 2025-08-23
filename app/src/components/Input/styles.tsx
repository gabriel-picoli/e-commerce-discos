import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & + & {
    margin-top: 0.8rem;
  }
`

export const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
`

export const Input = styled.input<{ $hasError: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${(props) => (props.$hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: ${(props) => (props.$hasError ? 'red' : '#666')};
    outline: none;
  }
`

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.2rem;
`
