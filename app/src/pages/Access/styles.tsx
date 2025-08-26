import styled from 'styled-components'

import theme from '../../styles/theme'

import vinyl from '/images/vinyl.jpg'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`

export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-image: url(${vinyl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(139, 19, 19, 0.6) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export const BrandSection = styled.div`
  text-align: center;
  z-index: 1;
`

export const BrandName = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: ${theme.colors.white};
  letter-spacing: -2px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  text-align: center;
  z-index: 1;
  position: relative;

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }
`

export const BrandTagline = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.neutral_400};
  font-weight: 300;
  letter-spacing: 1.5px;
  margin-bottom: 3rem;
  text-align: center;
  z-index: 1;
  position: relative;
`

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${theme.colors.neutral_100};
  position: relative;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    min-height: 100vh;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 3rem 2rem;
  background: ${theme.colors.neutral_50};
  border-radius: 0 0 ${theme.radius.lg} ${theme.radius.lg};
  box-shadow: ${theme.shadows.lg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary} 0%,
      ${theme.colors.primaryHover} 100%
    );
    border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem 1.5rem;
    box-shadow: none;
    border-radius: 0;

    &::before {
      display: none;
    }
  }
`

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

export const FormTitle = styled.h2`
  font-size: 3.3rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: -0.5px;
`

export const FormSubtitle = styled.p`
  color: #666;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.5;
`

export const FormFooter = styled.div`
  margin-top: 2rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
`

export const FooterText = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`

export const FooterLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primaryHover};
    text-decoration: underline;
  }
`
