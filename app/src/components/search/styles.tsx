import styled from 'styled-components'

import theme from '../../styles/theme'

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const SearchIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  color: ${theme.colors.primary};
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 6px;
  margin: 0;
  cursor: pointer;
  border-radius: 6px;
`

export const SearchInput = styled.input<{ $open?: boolean }>`
  width: ${(props) => (props.$open ? '220px' : '0px')};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  margin-left: ${(props) => (props.$open ? '8px' : '0')};
  padding: ${(props) => (props.$open ? '6px 10px' : '0')};
  border-radius: 8px;
  border: none;
  height: 36px;
  font-size: 14px;
  transition:
    width 220ms ease,
    opacity 220ms ease,
    margin-left 220ms ease,
    padding 220ms ease;
  outline: none;

  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};

  &::placeholder {
    color: #9b9b9b;
  }
`
