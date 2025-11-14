import styled from 'styled-components'

import theme from '../../../styles/theme'

export const DropdownContainer = styled.div`
  position: relative;
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid ${theme.colors.neutral_700};
`

export const UserButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  background: ${props => props.$isOpen ? theme.colors.neutral_700 : 'transparent'};
  border: none;
  padding: 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.neutral_700};
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const UserIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${theme.colors.neutral_600};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  flex-shrink: 0;
`

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`

export const UserName = styled.span`
  color: ${theme.colors.white};
  font-size: 1.4rem;
  font-weight: 600;
  text-align: left;
`

export const UserRole = styled.span`
  color: ${theme.colors.neutral_400};
  font-size: 1.2rem;
  text-align: left;
`

export const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  color: ${theme.colors.neutral_300};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`

export const DropdownMenu = styled.div`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background-color: ${theme.colors.neutral_700};
  border-radius: 0.8rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.3);
  padding: 0.5rem 0;
  z-index: 1001;
  animation: slideUp 0.2s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(0.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const DropdownItem = styled.button`
  width: 100%;
  padding: 1.2rem 1.5rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${theme.colors.neutral_300};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.neutral_600};
    color: ${theme.colors.white};
  }

  svg {
    flex-shrink: 0;
  }
`

export const Divider = styled.div`
  height: 1px;
  background: ${theme.colors.neutral_600};
  margin: 0.5rem 0;
`