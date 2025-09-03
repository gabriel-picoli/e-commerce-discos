import styled from 'styled-components'

import theme from '../../styles/theme'

export const Section = styled.section`
  padding: 2rem 4rem;
`

export const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`

export const SectionDescription = styled.p`
  color: #666;
  font-size: 1.8rem;
  font-weight: 400;
`

export const SectionContainer = styled.div`
  margin-top: 0.3rem;
  border-top: 1px solid ${theme.colors.neutral_300};
`
