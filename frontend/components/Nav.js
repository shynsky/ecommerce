import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyle, NavItems } from '../styles/NavStyles'

export default function Nav() {
  return (
    <NavStyle>
      <Link href={'/'}>STLD.</Link>
      <NavItems>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
    </NavStyle>
  )
}
