import styled from 'styled-components'

import theme from '../../../styles/theme'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 520px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: ${theme.shadows.md};
`

export const CardDescription = styled.h1`
  font-size: 2.4rem;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  color: ${theme.colors.neutral_900};
`
