import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyle, NavItems } from '../styles/NavStyles'
import Cart from './Cart'
import { useStateContext } from '../lib/context'

const { AnimatePresence } = require('framer-motion')

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <NavStyle>
      <Link href={'/'}>STLD.</Link>
      <NavItems>
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <span>{totalQuantities}</span>}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>
        {showCart && <Cart />}
      </AnimatePresence>

    </NavStyle>
  )
}
