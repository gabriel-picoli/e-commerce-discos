import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useAdsByUser } from '../../../hooks/useAds'

import type { Ad } from '../../../interfaces/Ad'

import { formatCurrency } from '../../../utils/currency'

import * as S from './styles'

import Loading from '../../../components/loading/Loading'

export default function ManageAds() {
  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { data: ads = [], isLoading, isError } = useAdsByUser(userId)

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/')
      return
    }
  }, [user, navigate])

  const handleCreateAd = () => navigate('/seller/ads/new')

  const handleEditAd = (ad: Ad) => navigate(`/seller/ads/edit/${ad.id}`)

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Advertisements</S.Title>
        <S.Button onClick={handleCreateAd}>Create New Ad</S.Button>
      </S.Header>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Failed to load ads.</div>
      ) : ads.length === 0 ? (
        <div>No ads found. Create your first ad.</div>
      ) : (
        <S.AdList>
          {ads.map((ad) => (
            <S.AdCard key={ad.id_produto}>
              <S.AdInfo>
                <S.AdTitle>{ad.titulo}</S.AdTitle>
                <S.AdDescription>{ad.descricao}</S.AdDescription>
                <S.AdPrice>{formatCurrency(ad.preco)}</S.AdPrice>
                <S.EditButton onClick={() => handleEditAd(ad)}>Edit Advertisement</S.EditButton>
              </S.AdInfo>
            </S.AdCard>
          ))}
        </S.AdList>
      )}
    </S.Container>
  )
}
