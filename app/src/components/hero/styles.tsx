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
  padding: 2rem;
`
export const Card = styled.div`
  background-color: ${theme.colors.white};
  padding: 2rem;
  border-radius: 5px;
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
  font-size: 1.3rem;
  text-align: left;
  color: ${theme.colors.neutral_900};
  letter-spacing: 4px;
  font-weight: 500;
  margin-bottom: 1rem;
`

export const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.primary};
  line-height: 1.3;
  max-width: 450px;
  text-align: left;
  margin-bottom: 1rem;
`
export const Description = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${theme.colors.neutral_900};
  text-align: left;
  margin-bottom: 2rem;
`
