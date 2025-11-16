import styled from 'styled-components'

export const ImageWrapper = styled.div<{
  $isLoaded: boolean
  $width?: number
  $height?: number
}>`
  position: relative;
  overflow: hidden;
  background: #f0f0f0;

  /* se width e height forem passados usa eles */
  ${({ $width, $height }) =>
    $width && $height
      ? `
        width: ${$width}px;
        height: ${$height}px;
      `
      : `
        width: 100%;
        aspect-ratio: 1 / 1;
      `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${(p) => (p.$isLoaded ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`

export const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`
