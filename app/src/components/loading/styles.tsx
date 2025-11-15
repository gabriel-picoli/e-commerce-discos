import styled, { keyframes } from 'styled-components'

import theme from '../../styles/theme'

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.06); opacity: 0.85; }
`

const dots = keyframes`
  0%, 20% { color: transparent; text-shadow: none; }
  40% { color: ${theme.colors.primary}; }
  60% { color: ${theme.colors.primary}; }
  80%, 100% { color: transparent; text-shadow: none; }
`

export const Overlay = styled.div<{ $transparent?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  background: ${({ $transparent }) =>
    $transparent
      ? 'rgba(255, 255, 255, 0.4)' /* fundo mais transparente */
      : 'linear-gradient(120deg, #f8f9ff, #edf0ff, #eae6ff)'};

  background-size: 300% 300%;

  animation:
    ${({ $transparent }) => !$transparent && gradientFlow} 9s ease-in-out infinite,
    ${fadeIn} 0.6s ease-out;

  backdrop-filter: blur(6px);
`

export const GlowCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulse} 2.8s ease-in-out infinite;
  filter: drop-shadow(0 0 12px rgba(113, 97, 255, 0.3));
`

export const LoadingText = styled.span`
  margin-top: 24px;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  letter-spacing: 0.8px;
  opacity: 0.95;
  text-align: center;
  text-shadow: 0 0 8px rgba(113, 97, 255, 0.25);
  animation: ${fadeIn} 1.2s ease-out;

  .dots {
    animation: ${dots} 1.4s infinite;
  }
`
