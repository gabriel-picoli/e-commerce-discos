import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { FiEdit, FiAlertCircle, FiTrash2 } from 'react-icons/fi'

import { useAuth } from '../../../hooks/useAuth'
import { useAdsByUser, useDeleteAd } from '../../../hooks/useAds'

import type { Ad } from '../../../interfaces/Ad'

import { formatCurrency } from '../../../utils/currency'
import { truncate } from '../../../utils/truncate'

import * as S from './styles'

import Loading from '../../../components/loading/Loading'
import OptimizedImage from '../../../components/optimized-image'

export default function ManageAds() {
  const { user } = useAuth()
  const userId = user?.id ?? 0

  const navigate = useNavigate()

  const { data: ads = [], isFetching, isLoading, isError } = useAdsByUser(userId)
  const deleteMutation = useDeleteAd()

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Delete failed', error)
    }
  }

  const handleCreateAd = () => navigate('/seller/ads/new')

  const handleEditAd = (ad: Ad) => navigate(`/seller/ads/edit/${ad.id}`)

  useEffect(() => {
    if (!user || user.vendedor !== 'S') {
      navigate('/')
      return
    }
  }, [user, navigate])

  if (isLoading || isFetching) {
    return (
      <S.Container>
        <S.Header>
          <S.Title>Manage Advertisements</S.Title>
          <S.Button onClick={handleCreateAd}>+ Create New Ad</S.Button>
        </S.Header>

        <Loading transparent />
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Manage Advertisements</S.Title>
        <S.Button onClick={handleCreateAd}>+ Create New Ad</S.Button>
      </S.Header>

      {isError ? (
        <S.NotFoundContainer>
          <S.NotFoundCard>
            <S.IconWrapper>
              <FiAlertCircle size={60} />
            </S.IconWrapper>

            <S.NotFoundTitle>An error occurred</S.NotFoundTitle>

            <S.NotFoundSubtitle>Failed to load products.</S.NotFoundSubtitle>
          </S.NotFoundCard>
        </S.NotFoundContainer>
      ) : ads.length === 0 ? (
        <S.NotFoundContainer>
          <S.NotFoundCard>
            <S.IconWrapper>
              <FiAlertCircle size={60} />
            </S.IconWrapper>

            <S.NotFoundTitle>No ads found </S.NotFoundTitle>

            <S.NotFoundSubtitle>You have not added any ads yet.</S.NotFoundSubtitle>
          </S.NotFoundCard>
        </S.NotFoundContainer>
      ) : (
        <S.AdList>
          {ads.map((ad) => (
            <S.AdCard key={ad.id_produto}>
              <OptimizedImage src={ad.produto.capa} alt={ad.titulo} />

              <S.AdContent>
                <S.Meta>
                  <S.AdTitle>{ad.titulo}</S.AdTitle>

                  <S.MetaText>{ad.produto.genero}</S.MetaText>
                </S.Meta>

                <S.AdDescription>{truncate(ad.descricao, 80)}</S.AdDescription>

                <S.AdPrice>{formatCurrency(ad.preco)}</S.AdPrice>

                <S.ButtonGroup>
                  <S.EditButton onClick={() => handleEditAd(ad)}>
                    <FiEdit size={14} /> Edit
                  </S.EditButton>

                  <S.DeleteButton onClick={() => handleDelete(ad.id!)}>
                    <FiTrash2 size={14} /> Delete
                  </S.DeleteButton>
                </S.ButtonGroup>
              </S.AdContent>
            </S.AdCard>
          ))}
        </S.AdList>
      )}
    </S.Container>
  )
}
