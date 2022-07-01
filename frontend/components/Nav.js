import Link from 'next/link'
import { FiShoppingBag } from 'react-icons/fi'
import { NavStyle, NavItems } from '../styles/NavStyles'
import Cart from './Cart'
import { useStateContext } from '../lib/context'
import User from './User'

const { AnimatePresence, motion } = require('framer-motion')

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext()
  return (
    <NavStyle>
      <Link href={'/'}>STLD.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>{totalQuantities}</motion.span>}
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
