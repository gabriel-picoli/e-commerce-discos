import styled from 'styled-components'

import theme from '../../styles/theme'

export const DropdownContainer = styled.div`
  position: relative;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  background-color: ${theme.colors.white};
  border-radius: 0.8rem;
  box-shadow: ${theme.shadows.lg};
  min-width: 18rem;
  padding: 0.8rem 0;
  z-index: 1001;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const DropdownItem = styled.button`
  width: 100%;
  padding: 1.2rem 2rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.neutral_100};
    color: ${theme.colors.primaryHover};
  }

  svg {
    flex-shrink: 0;
  }
`
