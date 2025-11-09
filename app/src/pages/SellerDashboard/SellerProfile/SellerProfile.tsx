import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

import * as S from './styles'

export default function SellerProfile() {
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
        <S.Title>Seller Profile</S.Title>
      </S.Header>

      <S.ProfileCard>
        <S.ProfileSection>
          <S.Label>Name</S.Label>
          <S.Value>{user?.name}</S.Value>
        </S.ProfileSection>

        <S.ProfileSection>
          <S.Label>Email</S.Label>
          <S.Value>{user?.email}</S.Value>
        </S.ProfileSection>

        <S.ProfileSection>
          <S.Label>Account Type</S.Label>
          <S.Value>Seller</S.Value>
        </S.ProfileSection>

        <S.Button>Edit Profile</S.Button>
      </S.ProfileCard>
    </S.Container>
  )
}
