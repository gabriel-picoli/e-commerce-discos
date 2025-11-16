import styled from 'styled-components'

import theme from '../../../styles/theme'

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: 2.4rem;
  color: ${theme.colors.text.primary};
`

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.primary}dd;
  }
`

export const AdList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`

export const AdCard = styled.div`
  background: ${theme.colors.background.card};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: ${theme.shadows.md};
  display: flex;
  flex-direction: column;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`

export const AdContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const AdHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const AdTitle = styled.h3`
  font-size: 1.6rem;
  color: ${theme.colors.text.primary};
  font-weight: 600;
`

export const MetaText = styled.p`
  font-size: 1.4rem;
  color: ${theme.colors.neutral_500};
`

export const AdDescription = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  line-height: 1.4;
  color: ${theme.colors.text.secondary};

  svg {
    font-size: 1.6rem;
    color: ${theme.colors.primary};
  }
`

export const AdPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${theme.colors.primary};
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const EditButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex: 1;
  background: ${theme.colors.blue};

  &:hover {
    background: ${theme.colors.blueHover};
  }
`

export const DeleteButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  flex: 1;
  background: ${theme.colors.red};

  &:hover {
    background: ${theme.colors.redHover};
  }
`

export const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
`

export const NotFoundCard = styled.div`
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
