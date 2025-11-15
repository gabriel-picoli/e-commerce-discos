import { useState, useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { FiUser, FiUserCheck, FiLogOut, FiChevronDown } from 'react-icons/fi'

import { useAuth } from '../../../hooks/useAuth'

import { capitalize } from '../../../utils/capitalize'

import * as S from './styles'

export default function SellerUserDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const dropdownRef = useRef<HTMLDivElement>(null)

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
    setIsOpen(!isOpen)
  }

  const handleProfileClick = () => {
    navigate('/seller/profile')
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.UserButton onClick={handleToggle} $isOpen={isOpen}>
        <S.UserInfo>
          <S.UserIcon>
            <FiUser size={20} />
          </S.UserIcon>
          <S.UserDetails>
            <S.UserName>{capitalize(user?.name!)}</S.UserName>

            <S.UserRole>Seller</S.UserRole>
          </S.UserDetails>
        </S.UserInfo>
        <S.ChevronIcon $isOpen={isOpen}>
          <FiChevronDown size={18} />
        </S.ChevronIcon>
      </S.UserButton>

      {isOpen && (
        <S.DropdownMenu>
          <S.DropdownItem onClick={handleProfileClick}>
            <FiUserCheck size={18} />
            My Profile
          </S.DropdownItem>

          <S.Divider />
          
          <S.DropdownItem onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  )
}
