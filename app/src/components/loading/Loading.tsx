import BounceLoader from 'react-spinners/BounceLoader'

import theme from '../../styles/theme'

import * as S from './styles'

export default function Loading({ transparent = false }) {
  return (
    <S.Overlay $transparent={transparent}>
      <S.GlowCircle>
        <BounceLoader size={85} color={theme.colors.primary} />
      </S.GlowCircle>

      <S.LoadingText>
        Carregando<span className="dots">...</span>
      </S.LoadingText>
    </S.Overlay>
  )
}
