import styled from 'styled-components'

import theme from '../../../styles/theme'

export const Item = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 12px;
  padding: 24px 10px;
  min-height: 64px;
`

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Name = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${theme.colors.neutral_900};
  margin: 0;
`

export const Price = styled.span`
  font-size: 1.3rem;
  color: ${theme.colors.neutral_700};
  margin-top: 4px;
`

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: ${theme.colors.neutral_800};
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;

  &:hover {
    color: ${theme.colors.neutral_600};
  }
`
