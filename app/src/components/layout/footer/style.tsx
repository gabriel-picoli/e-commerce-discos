// Footer.styles.ts
import styled from 'styled-components'
import theme from '../../../styles/theme'

export const Footer = styled.footer`
  border-top: 1px solid ${theme.colors.neutral_400};
  padding: 2rem;
  color: ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2rem;
`

export const Logo = styled.h1`
  color: ${theme.colors.primary};
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NavLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`

export const Socials = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
`

export const SocialLink = styled.a`
  color: ${theme.colors.primary};
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`

export const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.neutral_400};
  padding: 1rem 0;
  font-size: 0.8rem;
  color: ${theme.colors.neutral_500};
`

export const Copyright = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.neutral_500};
`
