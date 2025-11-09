import styled from 'styled-components'

import theme from '../../../styles/theme'

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: ${theme.colors.background.card};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Title = styled.h2`
  font-size: 2.4rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 2rem;
  text-align: center;
`
