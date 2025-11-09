import BounceLoader from 'react-spinners/BounceLoader'
import theme from '../../styles/theme'
import * as S from './styles'

export default function Loading() {
  return (
    <S.Overlay>
      <S.GlowCircle>
        <BounceLoader size={85} color={theme.colors.primary} />
      </S.GlowCircle>

      <S.LoadingText>
        Carregando<span className="dots">...</span>
      </S.LoadingText>
    </S.Overlay>
  )
}
