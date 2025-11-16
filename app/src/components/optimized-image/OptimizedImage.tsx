import { memo, useEffect, useState } from 'react'

import * as S from './styles'

type OptimizedImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: string
  className?: string
}

const OptimizedImage = memo(
  ({ src, alt, width, height, placeholder, className }: OptimizedImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [imageSrc, setImageSrc] = useState(placeholder || '')

    useEffect(() => {
      const img = new Image()

      img.src = src

      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }

      return () => {
        img.onload = null
      }
    }, [src])

    return (
      <S.ImageWrapper $isLoaded={isLoaded} $width={width} $height={height} className={className}>
        {!isLoaded && <S.Placeholder />}
        
        <img src={imageSrc} alt={alt} loading="lazy" decoding="async" />
      </S.ImageWrapper>
    )
  }
)

export default OptimizedImage
