import styled from 'styled-components'

import { Link } from 'react-router-dom'

import theme from '../../../styles/theme'

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${theme.colors.neutral_50};
`

export const Sidebar = styled.aside`
  width: 280px;
  background: ${theme.colors.neutral_800};
  padding: 2rem;
  position: fixed;
  height: 100vh;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
`

export const Logo = styled.h1`
  color: ${theme.colors.white};
  font-size: 2.4rem;
  margin: 1.5rem 0 3rem 0;
  text-align: center;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NavLink = styled(Link)`
  color: ${theme.colors.neutral_300};
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover,
  &.active {
    color: ${theme.colors.white};
    background: ${theme.colors.neutral_700};
    transform: translateX(4px);
  }

  &:not(:hover) {
    transform: translateX(0);
    transition: transform 0.2s ease;
  }
`

export const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background: ${theme.colors.neutral_50};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primaryHover});
    opacity: 0.5;
  }
`
