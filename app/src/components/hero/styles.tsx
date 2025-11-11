import styled from 'styled-components'
import hero from '/images/hero-image.jpg'
import theme from '../../styles/theme'

export const HeroContainer = styled.div`
  background-image: url(${hero});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 70vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  color: white;
  padding: 4rem;
`

export const Card = styled.div`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: ${theme.shadows.lg};
  max-width: 550px;
  width: 100%;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Subtitle = styled.p`
  font-size: 2rem;
  text-align: left;
  color: ${theme.colors.neutral_900};
  letter-spacing: 4px;
  font-weight: 500;
  margin-bottom: 1rem;
`

export const Title = styled.h1`
  font-size: 4.8rem;
  color: ${theme.colors.primary};
  line-height: 1.2;
  max-width: 450px;
  text-align: left;
  margin-bottom: 1rem;
`

export const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${theme.colors.neutral_900};
  text-align: left;
  margin-bottom: 2rem;
`

export const BreadcrumbContainer = styled.div`
  background-image: url(${hero});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 15vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(56, 30, 30, 0.671);
  }
`

export const BreadcrumbWrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`

export const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
`

export const BreadcrumbLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.neutral_200};
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    color: ${theme.colors.neutral_400};
  }
`

export const BreadcrumbCurrent = styled.span`
  color: ${theme.colors.neutral_300};
  font-size: 1.4rem;
  font-weight: 600;
`

export const BreadcrumbSeparator = styled.span`
  color: ${theme.colors.neutral_500};
  font-size: 1.4rem;
  margin: 0 0.25rem;
`

export const BreadcrumbTitle = styled.h1`
  font-size: 4.2rem;
  font-weight: 700;
  color: ${theme.colors.neutral_100};
  margin: 0;
  position: relative;
  z-index: 1;
  letter-spacing: -0.5px;
`
