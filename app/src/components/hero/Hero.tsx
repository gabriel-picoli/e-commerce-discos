import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../button'
import * as S from './styles'

export default function Hero() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // gera breadcrumbs baseado na rota atual
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Home', path: '/' }]

    let currentPath = ''

    paths.forEach((path) => {
      currentPath += `/${path}`

      breadcrumbs.push({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        path: currentPath
      })
    })

    return breadcrumbs
  }

  if (!isHomePage) {
    const breadcrumbs = getBreadcrumbs()

    return (
      <S.BreadcrumbContainer>
        <S.BreadcrumbWrapper>
          {breadcrumbs.map((crumb, index) => (
            <S.BreadcrumbItem key={crumb.path}>
              {index > 0 && <S.BreadcrumbSeparator>/</S.BreadcrumbSeparator>}

              {index === breadcrumbs.length - 1 ? (
                <S.BreadcrumbCurrent>{crumb.label}</S.BreadcrumbCurrent>
              ) : (
                <S.BreadcrumbLink onClick={() => navigate(crumb.path)}>
                  {crumb.label}
                </S.BreadcrumbLink>
              )}
            </S.BreadcrumbItem>
          ))}
        </S.BreadcrumbWrapper>

        <S.BreadcrumbTitle>{breadcrumbs[breadcrumbs.length - 1].label}</S.BreadcrumbTitle>
      </S.BreadcrumbContainer>
    )
  }

  return (
    <S.HeroContainer>
      <S.Card>
        <S.CardContainer>
          <S.Subtitle>Feel the Groove</S.Subtitle>

          <S.Title>Discover Vinyl Like Never Before</S.Title>

          <S.Description>
            Step into the golden age of music. Explore rare finds, timeless classics, and exclusive
            editions that bring every track to life — only on vinyl.
          </S.Description>

          <Button.Primary
            size="large"
            onClick={() => {
              navigate('/shop')
            }}
          >
            Shop Now
          </Button.Primary>
        </S.CardContainer>
      </S.Card>
    </S.HeroContainer>
  )
}
