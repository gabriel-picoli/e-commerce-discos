import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  /* @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  } */
`

export const BrandSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Logo = styled.img`
  object-fit: contain;
  max-height: 50px;
  width: auto;
`

export const LogoTitle = styled.h1`
  color: ${theme.colors.black};
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;

  a {
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    color: ${theme.colors.black};

    &:hover {
      transform: scale(1.1);
    }

    &:visited {
      color: ${theme.colors.black};
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

  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`
