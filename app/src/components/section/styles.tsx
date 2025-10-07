import styled from 'styled-components'

import theme from '../../styles/theme'

export const Section = styled.section`
  padding: 2rem 4rem;
`

export const SectionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  color: ${theme.colors.neutral_900};
  letter-spacing: -0.5px;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    display: block;
    width: 30%;
    height: 3px;
    background: ${theme.colors.primary};
    border-radius: 2px;
    margin-top: 0.5rem;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::after {
    width: 100%;
  }
`

export const SectionContainer = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.2rem;
  }
`

export const VinylAdCard = styled.div`
  background: ${theme.colors.white};
  border-radius: 1rem;
  border: 1px solid ${theme.colors.neutral_200};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  }
`

export const VinylImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition: transform 0.35s ease;

  ${VinylAdCard}:hover & {
    transform: scale(1.04);
  }
`

export const VinylInfo = styled.div`
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const VinylName = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${theme.colors.neutral_900};
  line-height: 1.3;
  transition: color 0.25s ease;

  ${VinylAdCard}:hover & {
    color: ${theme.colors.primary};
  }
`

export const VinylPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${theme.colors.primary};
`
