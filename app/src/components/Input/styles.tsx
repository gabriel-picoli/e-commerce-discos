import styled from 'styled-components'
import theme from '../../styles/theme'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  font-size: 1.6rem;
  color: ${theme.colors.neutral_900};
  margin-bottom: 0.2rem;
  font-weight: 600;
`

export const Input = styled.input<{ $hasError: boolean }>`
  padding: 0.8rem;
  border: 1px solid ${(props) => (props.$hasError ? `${theme.colors.red}` : '#ccc')};
  border-radius: 4px;
  font-size: 1.6rem;
  background-color: transparent;

  &:focus {
    border-color: ${(props) => (props.$hasError ? `${theme.colors.red}` : '#666')};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.neutral_500};
    font-size: 1.4rem;
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
  position: relative;
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

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

export const Checkbox = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
  border: 2px solid ${theme.colors.neutral_500};
  border-radius: 4px;
  background: transparent;
  transition: all 0.2s ease;
  position: relative;
  text-align: center;
  line-height: 18px;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    background: ${theme.colors.primary};
    border-radius: 4px;
    opacity: 0.3;
    transition:
      width 0.3s ease,
      height 0.3s ease,
      opacity 0.3s ease;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  ${CheckboxContainer}:hover &::before {
    width: 20px;
    height: 20px;
    opacity: 0.2;
  }

  ${HiddenCheckbox}:checked + & {
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
  }

  ${HiddenCheckbox}:checked + &::after {
    content: '✔';
    font-size: 1.2rem;
    color: white;
    display: block;
  }
`

export const CheckboxLabel = styled.label`
  font-size: 1.2rem;
  color: ${theme.colors.neutral_900};
`

export const ErrorMessage = styled.span`
  color: ${theme.colors.red};
  font-size: 1.2rem;
  margin-top: 0.2rem;
`
