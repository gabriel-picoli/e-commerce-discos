import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiX } from 'react-icons/fi'
import * as S from './style'

export default function Footer() {
  return (
    <S.Footer>
      <S.FooterTop>
        <S.Logo>Pozzoleone</S.Logo>

        <S.Nav>
          <S.NavLink href="#">Home</S.NavLink>
          <S.NavLink href="#">Shop</S.NavLink>
          <S.NavLink href="#">Contact</S.NavLink>
        </S.Nav>

        <S.Socials>
          <S.SocialLink href="#">
            <FiFacebook size={22} />
          </S.SocialLink>
          <S.SocialLink href="#">
            <FiInstagram size={22} />
          </S.SocialLink>
          <S.SocialLink href="#">
            <FiLinkedin size={22} />
          </S.SocialLink>
        </S.Socials>
      </S.FooterTop>

      <S.FooterBottom>
        <S.Copyright>© {new Date().getFullYear()} Pozzoleone. All rights reserved.</S.Copyright>
      </S.FooterBottom>
    </S.Footer>
  )
}
