import styled from 'styled-components'

import theme from '../../styles/theme'

export const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${theme.colors.neutral_900};
  text-align: center;
  margin: 3rem 0 1.5rem 0;
  line-height: 1.1;
`

export const Description = styled.p`
  font-size: 1.5rem;
  color: ${theme.colors.neutral_900};
  font-weight: 300;
  letter-spacing: 1.5px;
  margin-bottom: 3rem;
  text-align: center;
  z-index: 1;
`
