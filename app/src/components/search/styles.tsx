import styled from 'styled-components'

import theme from '../../styles/theme'

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const SearchIcon = styled.button`
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
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  width: ${(props) => (props.$open ? '280px' : '0px')};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  margin-left: ${(props) => (props.$open ? '8px' : '0')};
  padding: ${(props) => (props.$open ? '6px 10px' : '0')};
  border-radius: 8px;
  border: none;
  height: 36px;
  font-size: 14px;
  outline: none;

  transition:
    width 220ms ease,
    opacity 220ms ease,
    margin-left 220ms ease,
    padding 220ms ease;

  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};

  &::placeholder {
    color: #9b9b9b;
  }
`

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  max-height: 360px;
  overflow: auto;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  z-index: 60;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const ResultItem = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 6px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background: #f6f6f6;
  }

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: 14px;
      color: ${theme.colors.text || '#111'};
    }

    span {
      color: #666;
      font-size: 13px;
    }
  }
`
