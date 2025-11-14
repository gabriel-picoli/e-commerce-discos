import { useState } from 'react'

import { useLocation } from 'react-router-dom'

import {
  FiMinus,
  FiPlus,
  FiStar,
  FiDisc,
  FiCalendar,
  FiUser,
  FiTag,
  FiChevronDown,
  FiPackage,
  FiTruck,
  FiShield,
  FiShoppingCart,
  FiAlertCircle
} from 'react-icons/fi'

import { useCartStore } from '../../stores/cartStore'

import type { Ad } from '../../interfaces/Ad'

import { formatCurrency } from '../../utils/currency'

import theme from '../../styles/theme'

import * as S from './styles'

import Button from '../../components/button'

type ProductDetailProps = {
  ad: Ad
}

const CONSERVATION_NORMALIZE: Record<string, string> = {
  mint: 'Mint',
  'near mint': 'Near Mint',
  excellent: 'Excellent',
  'very good plus': 'Very Good Plus',
  'very good': 'Very Good',
  'good plus': 'Good Plus',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor'
}

const CONSERVATION_COLORS: Record<string, string> = {
  Mint: theme.colors.mint,
  'Near Mint': theme.colors['near-mint'],
  Excellent: theme.colors.excellent,
  'Very Good Plus': theme.colors['very-good-plus'],
  'Very Good': theme.colors['very-good'],
  'Good Plus': theme.colors['good-plus'],
  Good: theme.colors.good,
  Fair: theme.colors.fair,
  Poor: theme.colors.poor
}

const CONSERVATION_DESCRIPTIONS: Record<string, string> = {
  Mint: 'Perfect condition, never played, no marks or wear',
  'Near Mint': 'Almost perfect, minimal signs of use, excellent quality',
  Excellent: 'Excellent overall condition, few light signs of use',
  'Very Good Plus': 'Very good with minimal marks that do not affect playback',
  'Very Good': 'Good overall condition, some visible marks but plays well',
  'Good Plus': 'Acceptable condition with moderate marks',
  Good: 'Acceptable condition, visible marks and wear',
  Fair: 'Regular condition, considerable wear',
  Poor: 'Deteriorated condition, many marks and heavy wear'
}

function ProductDetail({ ad }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState({
    specs: true,
    conservation: false,
    shipping: false
  })

  const addToCart = useCartStore((state) => state.addToCart)

  const images = [ad.produto.capa, ad.produto.capa, ad.produto.capa]

  const maxQuantity = ad.produto.quanti

  const toggleDetail = (key: keyof typeof detailsOpen) => {
    setDetailsOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function normalizeConservation(value: string): string {
    if (!value) return 'None' // fallback

    return CONSERVATION_NORMALIZE[value.trim().toLowerCase()] || value
  }

  const conservation = normalizeConservation(ad.produto.conservacao)

  return (
    <S.Container>
      <S.GallerySection>
        <S.MainImage>
          <img src={images[selectedImage]} alt={ad.produto.name} />
        </S.MainImage>

        <S.Thumbs>
          {images.map((img, idx) => (
            <S.ThumbButton
              key={idx}
              $active={selectedImage === idx}
              onClick={() => setSelectedImage(idx)}
            >
              <img src={img} alt={`${ad.produto.name} ${idx + 1}`} />
            </S.ThumbButton>
          ))}
        </S.Thumbs>
      </S.GallerySection>

      <S.InfoSection>
        <S.Header>
          <S.TitleWrapper>
            <S.Title>{ad.titulo}</S.Title>

            <S.SizeBadge
              $active={true}
              style={{
                borderColor: CONSERVATION_COLORS[conservation],
                background: CONSERVATION_COLORS[conservation],
                color: '#fff'
              }}
            >
              {conservation}
            </S.SizeBadge>
          </S.TitleWrapper>

          <S.MetaInfo>
            <S.Artist>
              <FiUser size={16} />
              By <strong>{ad.produto.artista}</strong>
            </S.Artist>
          </S.MetaInfo>
        </S.Header>

        <S.PriceSection>
          {ad.preco && <S.Price>{formatCurrency(ad.preco)}</S.Price>}

          <S.StockBadge $available={ad.produto.quanti > 0}>
            {ad.produto.quanti > 0
              ? `${ad.produto.quanti} ${ad.produto.quanti === 1 ? 'unidade' : 'unidades'} disponível`
              : 'Produto esgotado'}
          </S.StockBadge>
        </S.PriceSection>

        <S.Description>{ad.descricao}</S.Description>

        <S.OptionsSection>
          {ad.produto.quanti > 0 && (
            <S.OptionGroup>
              <S.QuantityControl>
                <S.QuantitySelector>
                  <S.QuantityButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </S.QuantityButton>

                  <S.QuantityValue>{quantity}</S.QuantityValue>

                  <S.QuantityButton
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                  >
                    <FiPlus />
                  </S.QuantityButton>
                </S.QuantitySelector>
              </S.QuantityControl>
            </S.OptionGroup>
          )}

          {ad.produto.quanti > 0 && (
            <S.Actions>
              <Button.Primary
                size="small"
                onClick={() => {
                  addToCart(ad, quantity)
                }}
              >
                <FiShoppingCart size={20} />
                Adicionar ao carrinho
              </Button.Primary>
            </S.Actions>
          )}
        </S.OptionsSection>

        <S.IconGrid>
          <S.IconItem>
            <FiTruck />

            <S.IconLabel>Fast Shipping</S.IconLabel>

            <S.IconValue>3–5 days</S.IconValue>
          </S.IconItem>

          <S.IconItem>
            <FiShield />

            <S.IconLabel>Warranty</S.IconLabel>

            <S.IconValue>30 days</S.IconValue>
          </S.IconItem>

          <S.IconItem>
            <FiPackage />

            <S.IconLabel>Packaging</S.IconLabel>

            <S.IconValue>Protected</S.IconValue>
          </S.IconItem>
        </S.IconGrid>

        <S.DetailsAccordion>
          <S.DetailCard>
            <S.DetailHeader $open={detailsOpen.specs} onClick={() => toggleDetail('specs')}>
              Product Specifications
              <FiChevronDown size={20} />
            </S.DetailHeader>

            <S.DetailBody $open={detailsOpen.specs}>
              <S.DetailContent>
                <S.IconGrid>
                  <S.IconItem>
                    <FiDisc />
                    <S.IconLabel>Type</S.IconLabel>
                    <S.IconValue>{ad.produto.tipo}</S.IconValue>
                  </S.IconItem>

                  <S.IconItem>
                    <FiTag />
                    <S.IconLabel>Genre</S.IconLabel>
                    <S.IconValue>{ad.produto.genero}</S.IconValue>
                  </S.IconItem>

                  <S.IconItem>
                    <FiCalendar />
                    <S.IconLabel>Release</S.IconLabel>
                    <S.IconValue>{ad.produto.lancamento}</S.IconValue>
                  </S.IconItem>

                  <S.IconItem>
                    <FiStar style={{ color: CONSERVATION_COLORS[conservation] }} />
                    <S.IconLabel>Condition</S.IconLabel>
                    <S.IconValue style={{ color: CONSERVATION_COLORS[conservation] }}>
                      {conservation}
                    </S.IconValue>
                  </S.IconItem>
                </S.IconGrid>
              </S.DetailContent>
            </S.DetailBody>
          </S.DetailCard>

          <S.DetailCard>
            <S.DetailHeader
              $open={detailsOpen.conservation}
              onClick={() => toggleDetail('conservation')}
            >
              Condition Guide
              <FiChevronDown size={20} />
            </S.DetailHeader>

            <S.DetailBody $open={detailsOpen.conservation}>
              <S.DetailContent>
                <p style={{ marginBottom: '16px', fontWeight: 600, fontSize: '1.4rem' }}>
                  {CONSERVATION_DESCRIPTIONS[ad.produto?.conservacao]}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(CONSERVATION_COLORS).map(([grade, color]) => (
                    <div key={grade} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: color,
                          flexShrink: 0
                        }}
                      />

                      <span style={{ fontWeight: 600, fontSize: '1.4rem' }}>{grade}:</span>
                      <span style={{ color: '#777', fontSize: '1.2rem' }}>
                        {CONSERVATION_DESCRIPTIONS[grade]}
                      </span>
                    </div>
                  ))}
                </div>
              </S.DetailContent>
            </S.DetailBody>
          </S.DetailCard>

          <S.DetailCard>
            <S.DetailHeader $open={detailsOpen.shipping} onClick={() => toggleDetail('shipping')}>
              Shipping & Delivery
              <FiChevronDown size={20} />
            </S.DetailHeader>

            <S.DetailBody $open={detailsOpen.shipping}>
              <S.DetailContent>
                <p>
                  All vinyl records are carefully packed with special protection to ensure they
                  arrive in perfect condition. We use reinforced boxes and bubble wrap for maximum
                  safety during transport.
                </p>
                <p style={{ marginTop: '12px' }}>Delivery time: 3–5 business days across Brazil.</p>
              </S.DetailContent>
            </S.DetailBody>
          </S.DetailCard>
        </S.DetailsAccordion>
      </S.InfoSection>
    </S.Container>
  )
}

export default function ProductDetailWrapper() {
  const location = useLocation()

  const { ad } = location.state || {}

  if (!ad) {
    return (
      <S.NotFoundContainer>
        <S.NotFoundCard>
          <S.IconWrapper>
            <FiAlertCircle size={60} />
          </S.IconWrapper>

          <S.NotFoundTitle>Ad not found</S.NotFoundTitle>

          <S.NotFoundSubtitle>
            The ad you are looking for is not available or has been removed.
          </S.NotFoundSubtitle>
        </S.NotFoundCard>
      </S.NotFoundContainer>
    )
  }

  return (
    <>
      <ProductDetail ad={ad} />
    </>
  )
}
