import styled, { css } from 'styled-components'

import theme from '../../styles/theme'

type ButtonProps = {
  $variant: 'primary' | 'outline' | 'rounded-outline' | 'cancel'
  $size: 'small' | 'medium' | 'large'
}

const buttonVariants = {
  primary: css`
    background-color: ${theme.colors.primary};
    border: none;
    color: white;

    &:hover {
      background-color: ${theme.colors.primaryHover};
    }
  `,
  outline: css`
    background-color: transparent;
    border: 2px solid ${theme.colors.primary};
    color: ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primary};
      color: white;
    }
  `,
  'rounded-outline': css`
    background-color: transparent;
    border: 2px solid ${theme.colors.primary};
    border-radius: 25px;
    color: ${theme.colors.primary};

    &:hover {
      background-color: ${theme.colors.primary};
      color: white;
    }
  `,
  cancel: css`
    background-color: ${theme.colors.red};
    border: none;
    color: white;

    &:hover {
      background-color: ${theme.colors.redHover};
    }
  `
}

const buttonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  medium: css`
    padding: 13px 30px;
    font-size: 16px;
  `,
  large: css`
    padding: 16px 40px;
    font-size: 18px;
  `
}

export const Button = styled.button<ButtonProps>`
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
  font-weight: 500;

  ${({ $variant }) => buttonVariants[$variant]}

  ${({ $size }) => buttonSizes[$size]}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: initial;
      color: initial;
    }
  }
`
