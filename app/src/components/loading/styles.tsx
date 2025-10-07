import styled, { keyframes } from 'styled-components'

import theme from '../../styles/theme'

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`

export const LoadingText = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${theme.colors.primary};
  letter-spacing: 0.5px;
`
