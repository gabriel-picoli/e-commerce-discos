import { useState, useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { FiUser, FiUserCheck, FiLogOut } from 'react-icons/fi'

import { useAuth } from '../../hooks/useAuth'

import * as S from './styles'

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setIsOpen(!isOpen)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.IconButton onClick={handleToggle}>
        <FiUser size={20} />
      </S.IconButton>

      {isOpen && user && (
        <S.DropdownMenu>
          <S.DropdownItem onClick={handleProfileClick}>
            <FiUserCheck size={18} />
            My Profile
          </S.DropdownItem>

          <S.DropdownItem onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  )
}
