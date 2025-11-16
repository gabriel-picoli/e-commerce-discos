import { memo, useEffect, useRef, useState } from 'react'

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
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)

    // Intersection Observer para lazy loading mais eficiente
    useEffect(() => {
      if (!imgRef.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true)
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: '50px', // carrega um pouco antes de entrar na viewport
          threshold: 0.01
        }
      )

      observer.observe(imgRef.current)

      return () => observer.disconnect()
    }, [])

    // Carrega imagem apenas quando visivel
    useEffect(() => {
      if (!isInView || !src) return

      const img = new Image()
      img.src = src

      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }

      img.onerror = () => {
        console.error(`Failed to load image: ${src}`)

        setIsLoaded(true)
      }

      return () => {
        img.onload = null
        img.onerror = null
      }
    }, [src, isInView])

    return (
      <S.ImageWrapper
        ref={imgRef}
        $isLoaded={isLoaded}
        $width={width}
        $height={height}
        className={className}
      >
        {!isLoaded && <S.Placeholder />}

        {isInView && (
          <img src={imageSrc} alt={alt} loading="lazy" decoding="async" fetchPriority="low" />
        )}
      </S.ImageWrapper>
    )
  },
  (prevProps, nextProps) => {
    // comparaçao otimizada
    return (
      prevProps.src === nextProps.src &&
      prevProps.alt === nextProps.alt &&
      prevProps.width === nextProps.width &&
      prevProps.height === nextProps.height
    )
  }
)

export default OptimizedImage
