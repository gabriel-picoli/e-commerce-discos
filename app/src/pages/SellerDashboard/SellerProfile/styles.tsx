import styled from 'styled-components'

import theme from '../../../styles/theme'

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text.primary};
`

export const ProfileCard = styled.div`
  background: ${theme.colors.background.card};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const ProfileSection = styled.div`
  margin-bottom: 1.5rem;
`

export const Label = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`

export const Value = styled.div`
  font-size: 1.1rem;
  color: ${theme.colors.text.primary};
`

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.primary}dd;
  }
`
