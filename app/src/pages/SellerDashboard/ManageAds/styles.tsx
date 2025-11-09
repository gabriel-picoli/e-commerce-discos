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
  border-radius: 4px;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.primary}dd;
  }
`

export const AdList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

export const AdCard = styled.div`
  background: ${theme.colors.background.card};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

export const AdInfo = styled.div`
  padding: 1.5rem;
`

export const AdTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`

export const AdDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 1rem;
`

export const AdPrice = styled.div`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  font-weight: bold;
  margin-bottom: 1rem;
`

export const EditButton = styled(Button)`
  width: 100%;
`
