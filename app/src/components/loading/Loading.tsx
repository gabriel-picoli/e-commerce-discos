import * as S from './styles'
export default function Loading() {
  return (
    <S.Overlay>
      <S.Spinner />
      <S.LoadingText>Carregando...</S.LoadingText>
    </S.Overlay>
  )
}
