import styled from 'styled-components'
import theme from '../../styles/theme'

export const InputContainer = styled.div`
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
  background-color: transparent;

  &:focus {
    border-color: ${(props) => (props.$hasError ? `${theme.colors.red}` : '#666')};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.neutral_500};
    font-size: 0.9rem;
  }
`

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${theme.colors.neutral_900};
  user-select: none;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const Checkbox = styled.span<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  display: inline-block;
  border: 2px solid ${theme.colors.neutral_500};
  border-radius: 4px;
  background: ${(props) => (props.$checked ? theme.colors.primary : 'transparent')};
  transition: all 0.2s ease;
  position: relative;

  ${CheckboxContainer}:hover & {
    border-color: ${theme.colors.primary};
  }

  ${(props) =>
    props.$checked &&
    `
      &::after {
        content: '';
        position: absolute;
        left: 4px;
        top: 0px;
        width: 6px;
        height: 12px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
  `}
`

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${theme.colors.neutral_900};
`

export const ErrorMessage = styled.span`
  color: ${theme.colors.red};
  font-size: 0.775rem;
  margin-top: 0.2rem;
`
