import styled from 'styled-components'

import theme from '../../styles/theme'

export const Section = styled.section`
  padding: 2rem 4rem;
`

export const SectionTitle = styled.h2`
  font-size: 2.8rem;
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
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`

export const VinylAdCard = styled.div`
  background: ${theme.colors.neutral_50};
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
`

export const VinylImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition:
    transform 0.4s ease,
    filter 0.4s ease;
  border-bottom: 1px solid ${theme.colors.neutral_200};

  ${VinylAdCard}:hover & {
    transform: scale(1.08) rotate(1deg);
    filter: brightness(1.05);
  }
`

export const VinylInfo = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const VinylName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.neutral_900};
  line-height: 1.2;
  transition: color 0.3s ease;

  ${VinylAdCard}:hover & {
    color: ${theme.colors.primary};
  }
`

export const VinylPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  transition: transform 0.3s ease;

  ${VinylAdCard}:hover & {
    transform: translateX(2px);
  }
`
