import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  align-items: center;
  padding: 2rem 4rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  /* @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  } */
`

export const Logo = styled.img`
  object-fit: contain;
  max-height: 50px;
  width: auto;
`

export const LogoTitle = styled.h1`
  color: ${theme.colors.primary};
  font-weight: 900;
  font-size: 3rem;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;

  a {
    text-decoration: none;
    font-weight: 500;
    font-size: 1.6rem;
    transition: all 0.2s ease;
    color: ${theme.colors.primary};

    &:hover {
      color: ${theme.colors.primaryHover};
    }

    &:visited {
      color: ${theme.colors.primary};
    }
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`

export const Icon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${theme.colors.primary};

  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`
