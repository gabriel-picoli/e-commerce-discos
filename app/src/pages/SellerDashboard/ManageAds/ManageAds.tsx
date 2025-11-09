import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

import type { Ad } from '../../../interfaces/Ad'

import * as S from './styles'

export default function ManageAds() {
  const [ads, setAds] = useState<Ad[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/')
      return
    }

    // TODO: Fetch user's ads
    const fetchAds = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/anuncios`)
        const data = await response.json()
        setAds(data)
      } catch (error) {
        console.error('Error fetching ads:', error)
      }
    }

    fetchAds()
  }, [user, navigate])

  const handleCreateAd = () => {
    navigate('/seller/ads/new')
  }

  const handleEditAd = (ad: Ad) => {
    navigate(`/seller/ads/edit/${ad.id}`)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Advertisements</S.Title>
        <S.Button onClick={handleCreateAd}>Create New Ad</S.Button>
      </S.Header>

      <S.AdList>
        {ads.map((ad) => (
          <S.AdCard key={ad.id_produto}>
            <S.AdInfo>
              <S.AdTitle>{ad.titulo}</S.AdTitle>
              <S.AdDescription>{ad.descricao}</S.AdDescription>
              <S.AdPrice>R$ {ad.preco.toFixed(2)}</S.AdPrice>
              <S.EditButton onClick={() => handleEditAd(ad)}>Edit Advertisement</S.EditButton>
            </S.AdInfo>
          </S.AdCard>
        ))}
      </S.AdList>
    </S.Container>
  )
}
