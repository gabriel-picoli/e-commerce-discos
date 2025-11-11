import { useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { FiSearch } from 'react-icons/fi'

import type { Ad } from '../../interfaces/Ad'
import type { Product } from '../../interfaces/Products'

import useDebounce from '../../hooks/useDebounce'
import { useAds } from '../../hooks/useAds'

import * as S from './styles'

import Icon from '../icon'

type SearchProps = {
  placeholder?: string
  keepValueOnClose?: boolean
}

export default function Search({
  placeholder = 'Search...',
  keepValueOnClose = false
}: SearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(query, 300)

  const navigate = useNavigate()

  const { data: ads } = useAds()

  // foco no input ao abrir
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)

        if (!keepValueOnClose) {
          setQuery('')
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [keepValueOnClose])

  const results = (ads || []).filter((ad: Ad) => {
    if (!debouncedValue || debouncedValue.trim() === '') return false

    // pesquisa no titulo e no nome do anuncio
    const query = debouncedValue.toLowerCase()

    const title = (ad.titulo || '').toLowerCase()
    const prodName = ad.produto?.name?.toLowerCase() || ''

    // retorna se o titulo ou o nome do anuncio contem a query
    return title.includes(query) || prodName.includes(query)
  })

  const handleResultClick = (ad: Ad) => {
    // navega para o produto
    const product = { ...(ad.produto as Product), preco: Number(ad.preco) }

    navigate('/product', { state: { product } })

    setOpen(false)

    if (!keepValueOnClose) setQuery('')
  }

  return (
    <S.SearchContainer ref={containerRef} data-open={open}>
      <Icon
        aria-expanded={open}
        aria-label={open ? 'Close search' : 'Open search'}
        onClick={() => setOpen(!open)}
      >
        <FiSearch size={20} />
      </Icon>

      <S.SearchInput
        ref={inputRef}
        $open={open}
        placeholder={placeholder}
        value={query}
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setOpen(false)

            if (!keepValueOnClose) {
              setQuery('')
            }
          }

          if (e.key === 'Enter') {
            if (results && results.length > 0) {
              handleResultClick(results[0])
            }
          }
        }}
      />

      {open && results && results.length > 0 && (
        <S.SearchResults role="list">
          {results.slice(0, 6).map((ad) => (
            <S.ResultItem key={ad.id} onClick={() => handleResultClick(ad)}>
              <img src={ad.produto?.capa} alt={ad.produto?.name} />
              <div>
                <strong>{ad.titulo || ad.produto?.name}</strong>
                <span>R$ {Number(ad.preco).toFixed(2).replace('.', ',')}</span>
              </div>
            </S.ResultItem>
          ))}
        </S.SearchResults>
      )}
    </S.SearchContainer>
  )
}
