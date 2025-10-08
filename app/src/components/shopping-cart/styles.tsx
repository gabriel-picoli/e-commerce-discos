import styled from 'styled-components'

import theme from '../../styles/theme'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 90;
`

export const CartWrapper = styled.div`
  position: relative;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  z-index: 100;
  position: relative;
`

export const SideCart = styled.aside`
  position: fixed;
  top: 0;
  right: -400px;
  width: 360px;
  height: 100vh;
  background: #fff;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;

  &.active {
    right: 0;
  }

  .items {
    flex: 1;
    overflow-y: auto;
    padding: 16px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        margin-right: 12px;
      }

      p {
        font-size: 14px;
        margin: 0;
      }

      span {
        font-size: 12px;
        color: #555;
      }
    }
  }
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
`

export const Title = styled.h2`
  color: ${theme.colors.primary};
  font-size: 2rem;
  font-weight: 600;
`

export const CloseButton = styled.button`
  background: none;
  color: ${theme.colors.primary};
  border: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`

export const ItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-top: 1px solid #eee;
`

export const SubtotalTitle = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.6rem;
  font-weight: 600;
`

export const Subtotal = styled.div`
  color: ${theme.colors.primary};
  font-size: 2rem;
  font-weight: 600;
`

export const EmptyMessage = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.8rem;
  color: ${theme.colors.neutral_400};
  text-align: center;
  padding: 2.2rem;
`
