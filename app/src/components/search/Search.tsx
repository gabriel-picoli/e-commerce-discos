import { useEffect, useRef, useState } from 'react'

import * as S from './styles'

import { FiSearch } from 'react-icons/fi'

import useDebounce from '../../hooks/useDebounce'

import Icon from '../icon'

type SearchProps = {
  onSearch: (query: string) => void
  placeholder?: string
  keepValueOnClose?: boolean
}

export default function Search({
  onSearch,
  placeholder = 'Search...',
  keepValueOnClose = false
}: SearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedValue = useDebounce(query, 500)

  // foco no input ao abrir
  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  // chama o onSearch quando o debouncedValue mudar
  useEffect(() => {
    if (onSearch && query) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, onSearch])

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)

        if (keepValueOnClose) {
          setQuery('')
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [keepValueOnClose])

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
            onSearch?.(query)
          }
        }}
      />
    </S.SearchContainer>
  )
}
