import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import * as S from './styles'

export default function SellerDashboard() {
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <S.Container>
      <S.Header>
        <S.Title>Seller Dashboard</S.Title>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>My Products</S.SectionTitle>
          <S.Button onClick={() => navigate('/seller/products')}>Manage Products</S.Button>
        </S.Section>

        <S.Section>
          <S.SectionTitle>My Advertisements</S.SectionTitle>
          <S.Button onClick={() => navigate('/seller/ads')}>Manage Ads</S.Button>
        </S.Section>

        <S.Section>
          <S.SectionTitle>My Profile</S.SectionTitle>
          <S.Button onClick={() => navigate('/seller/profile')}>Manage Profile</S.Button>
        </S.Section>
      </S.Content>
    </S.Container>
  )
}
