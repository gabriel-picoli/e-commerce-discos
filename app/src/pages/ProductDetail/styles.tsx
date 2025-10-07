import styled from 'styled-components'

import theme from '../../styles/theme'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 48px 64px;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 32px 24px;
  }
`

export const GallerySection = styled.div`
  position: sticky;
  top: 32px;
  height: fit-content;
`

export const MainImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 24px;
  overflow: hidden;
  background: #f8f8f8;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }
`

export const Thumbs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 12px;
`

export const ThumbButton = styled.button<{ $active?: boolean }>`
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid ${({ $active }) => ($active ? theme.colors.primary : 'transparent')};
  background: #f8f8f8;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${({ $active }) => ($active ? theme.colors.primary : '#ddd')};
    transform: translateY(-2px);
  }
`

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e5e5;
`

export const TitleWrapper = styled.div`
  display: flex;
  gap: 18px;
`

export const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const SizeBadge = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 32px;
  height: 32px;
  padding: 0 22px;
  border-radius: 16px;
  font-size: 0.8125rem;
  text-transform: uppercase;
  font-weight: 600;
  cursor: default;
  transition: all 0.2s ease;
`

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`

export const Artist = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  color: ${theme.colors.neutral_500};

  strong {
    color: ${theme.colors.neutral_900};
    font-size: 1.4rem;
    font-weight: 600;
  }
`

export const PriceSection = styled.div`
  display: flex;
  gap: 12px;
`

export const Price = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${theme.colors.neutral_900};
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

export const StockBadge = styled.div<{ $available: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 100px;
  color: ${({ $available }) => ($available ? theme.colors.green : theme.colors.red)};
  font-size: 1.2rem;
  font-weight: 600;
  width: fit-content;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
`

export const Description = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
  color: ${theme.colors.neutral_500};
`

export const OptionsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #e5e5e5;
`

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const OptionLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.neutral_900};
`

export const Sizes = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const Colors = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
`

export const QuantityButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #111;
  font-size: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f8f8;
  }

  &:active {
    background: #e5e5e5;
  }
`

export const QuantityValue = styled.span`
  min-width: 48px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
`

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

export const DetailsAccordion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DetailCard = styled.div`
  border-radius: 16px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  background: #fff;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`

export const DetailHeader = styled.button<{ $open?: boolean }>`
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  text-align: left;

  svg {
    transition: transform 0.2s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0)')};
  }
`

export const DetailBody = styled.div<{ $open?: boolean }>`
  max-height: ${({ $open }) => ($open ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`

export const DetailContent = styled.div`
  padding: 0 24px 20px;
  color: #555;
  font-size: 1.9rem;
  line-height: 1.6;
`

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

export const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 16px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }

  svg {
    width: 32px;
    height: 32px;
    color: #555;
  }
`

export const IconLabel = styled.span`
  font-size: 1.2rem;
  color: #777;
  font-weight: 500;
`

export const IconValue = styled.span`
  font-size: 1rem;
  color: #111;
  font-weight: 600;
`

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: #f8f9fa;
  padding: 2rem;
`

export const NotFoundCard = styled.div`
  background: #fff;
  padding: 3rem 4rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 480px;
  transition: all 0.3s ease;
`

export const IconWrapper = styled.div`
  color: ${theme.colors.red};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`

export const NotFoundTitle = styled.h2`
  font-size: 2.6rem;
  color: #222;
  margin-bottom: 0.75rem;
  font-weight: 600;
`

export const NotFoundSubtitle = styled.p`
  font-size: 1.4rem;
  color: #777;
  line-height: 1.6;
`
