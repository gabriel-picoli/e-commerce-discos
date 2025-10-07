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

import type { Product } from '../../interfaces/Products'

import * as S from './styles'

import Button from '../../components/button'

type ProductDetailProps = {
  product: Product
}

function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [detailsOpen, setDetailsOpen] = useState({
    specs: true,
    conservation: false,
    shipping: false
  })

  const images = [product.capa, product.capa, product.capa]

  const conservacaoColors: Record<string, string> = {
    Mint: '#10b981',
    'Near Mint': '#22c55e',
    Excellent: '#84cc16',
    'Very Good Plus': '#eab308',
    'Very Good': '#f59e0b',
    'Good Plus': '#f97316',
    Good: '#ef4444',
    Fair: '#dc2626',
    Poor: '#991b1b'
  }

  const conservacaoDescriptions: Record<string, string> = {
    Mint: 'Perfeito estado, nunca tocado, sem qualquer marca ou desgaste',
    'Near Mint': 'Quase perfeito, mínimos sinais de uso, excelente qualidade',
    Excellent: 'Excelente estado geral, poucas marcas leves de uso',
    'Very Good Plus': 'Muito bom com marcas mínimas que não afetam reprodução',
    'Very Good': 'Bom estado geral, algumas marcas visíveis mas reproduz bem',
    'Good Plus': 'Estado aceitável com marcas moderadas',
    Good: 'Estado aceitável, marcas e desgastes visíveis',
    Fair: 'Estado regular, desgaste considerável',
    Poor: 'Estado deteriorado, muitas marcas e desgastes'
  }

  const maxQuantity = product.quanti

  const toggleDetail = (key: keyof typeof detailsOpen) => {
    setDetailsOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <S.Container>
      <S.GallerySection>
        <S.MainImage>
          <img src={images[selectedImage]} alt={product.name} />
        </S.MainImage>

        <S.Thumbs>
          {images.map((img, idx) => (
            <S.ThumbButton
              key={idx}
              $active={selectedImage === idx}
              onClick={() => setSelectedImage(idx)}
            >
              <img src={img} alt={`${product.name} ${idx + 1}`} />
            </S.ThumbButton>
          ))}
        </S.Thumbs>
      </S.GallerySection>

      <S.InfoSection>
        <S.Header>
          <S.TitleWrapper>
            <S.Title>{product.name}</S.Title>

            <S.SizeBadge
              $active={true}
              style={{
                borderColor: conservacaoColors[product.conservacao],
                background: conservacaoColors[product.conservacao],
                color: '#fff'
              }}
            >
              {product.conservacao}
            </S.SizeBadge>
          </S.TitleWrapper>

          <S.MetaInfo>
            <S.Artist>
              <FiUser size={16} />
              By <strong>{product.artista}</strong>
            </S.Artist>
          </S.MetaInfo>
        </S.Header>

        <S.PriceSection>
          {product.preco && <S.Price>R$ {product.preco.toFixed(2).replace('.', ',')}</S.Price>}

          <S.StockBadge $available={product.quanti > 0}>
            {product.quanti > 0
              ? `${product.quanti} ${product.quanti === 1 ? 'unidade' : 'unidades'} disponível`
              : 'Produto esgotado'}
          </S.StockBadge>
        </S.PriceSection>

        <S.Description>
          Vinil original em {product.tipo}, gênero {product.genero}. Lançado em {product.lancamento}
          , este disco traz a autenticidade e qualidade sonora que só o vinil pode oferecer.
        </S.Description>

        <S.OptionsSection>
          {product.quanti > 0 && (
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

          {product.quanti > 0 && (
            <S.Actions>
              <Button.Primary size="small">
                <FiShoppingCart size={20} />
                Adicionar ao carrinho
              </Button.Primary>
            </S.Actions>
          )}
        </S.OptionsSection>

        <S.IconGrid>
          <S.IconItem>
            <FiTruck />

            <S.IconLabel>Envio rápido</S.IconLabel>

            <S.IconValue>3-5 dias</S.IconValue>
          </S.IconItem>
          <S.IconItem>
            <FiShield />

            <S.IconLabel>Garantia</S.IconLabel>

            <S.IconValue>30 dias</S.IconValue>
          </S.IconItem>
          <S.IconItem>
            <FiPackage />

            <S.IconLabel>Embalagem</S.IconLabel>
            
            <S.IconValue>Protegida</S.IconValue>
          </S.IconItem>
        </S.IconGrid>

        <S.DetailsAccordion>
          <S.DetailCard>
            <S.DetailHeader $open={detailsOpen.specs} onClick={() => toggleDetail('specs')}>
              Especificações do Produto
              <FiChevronDown size={20} />
            </S.DetailHeader>
            <S.DetailBody $open={detailsOpen.specs}>
              <S.DetailContent>
                <S.IconGrid>
                  <S.IconItem>
                    <FiDisc />
                    <S.IconLabel>Tipo</S.IconLabel>
                    <S.IconValue>{product.tipo}</S.IconValue>
                  </S.IconItem>
                  <S.IconItem>
                    <FiTag />
                    <S.IconLabel>Gênero</S.IconLabel>
                    <S.IconValue>{product.genero}</S.IconValue>
                  </S.IconItem>
                  <S.IconItem>
                    <FiCalendar />
                    <S.IconLabel>Lançamento</S.IconLabel>
                    <S.IconValue>{product.lancamento}</S.IconValue>
                  </S.IconItem>
                  <S.IconItem>
                    <FiStar style={{ color: conservacaoColors[product.conservacao] }} />
                    <S.IconLabel>Conservação</S.IconLabel>
                    <S.IconValue style={{ color: conservacaoColors[product.conservacao] }}>
                      {product.conservacao}
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
              Guia de Conservação
              <FiChevronDown size={20} />
            </S.DetailHeader>

            <S.DetailBody $open={detailsOpen.conservation}>
              <S.DetailContent>
                <p style={{ marginBottom: '16px', fontWeight: 600, fontSize: '1.4rem' }}>
                  {conservacaoDescriptions[product.conservacao]}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(conservacaoColors).map(([grade, color]) => (
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
                        {conservacaoDescriptions[grade]}
                      </span>
                    </div>
                  ))}
                </div>
              </S.DetailContent>
            </S.DetailBody>
          </S.DetailCard>

          <S.DetailCard>
            <S.DetailHeader $open={detailsOpen.shipping} onClick={() => toggleDetail('shipping')}>
              Envio e Entrega
              <FiChevronDown size={20} />
            </S.DetailHeader>
            <S.DetailBody $open={detailsOpen.shipping}>
              <S.DetailContent>
                <p>
                  Todos os vinis são cuidadosamente embalados com proteção especial para garantir
                  que cheguem em perfeito estado. Utilizamos caixas reforçadas e plástico bolha para
                  máxima proteção durante o transporte.
                </p>
                <p style={{ marginTop: '12px' }}>
                  Prazo de entrega: 3-5 dias úteis para todo o Brasil.
                </p>
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
  const { product } = location.state || {}

  if (!product) {
    return (
      <S.NotFoundContainer>
        <S.NotFoundCard>
          <S.IconWrapper>
            <FiAlertCircle size={60} />
          </S.IconWrapper>

          <S.NotFoundTitle>Produto não encontrado</S.NotFoundTitle>

          <S.NotFoundSubtitle>
            O produto que você procura não está disponível ou foi removido.
          </S.NotFoundSubtitle>
        </S.NotFoundCard>
      </S.NotFoundContainer>
    )
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}
