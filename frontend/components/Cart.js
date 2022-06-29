import { useStateContext } from '../lib/context'
import {
  CartWrapper,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Cards,
} from '../styles/CartStyles'
import { Quantity } from '../styles/ProductDetails'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { Checkout } from '../styles/CartStyles'
import getStripe from '../lib/getStripe'

// Animation Variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    }
  }
}

export default function Cart() {
  const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext()

  // Payment
  const handleCheckout = async () => {
    const stripe = await getStripe()
    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems)
    })
    const data = await response.json()
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <CartWrapper
      onClick={() => setShowCart(false)}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <CartStyle
        onClick={(e) => e.stopPropagation()}
        initial={{ x: '50%' }}
        animate={{ x: '0%' }}
        transition={{ type: 'tween' }}
        exit={{ x: '50%' }}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>Cart is empty! You have more shopping to do 👀</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        <Cards
          variants={cards}
          initial='hidden'
          animate='show'
          layout
        >
          {cartItems.length >= 1 && (
            cartItems.map((item) => {
              return (
                <Card
                  key={item.slug}
                  variants={card}
                  layout
                >
                  <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price} $</h3>
                    <Quantity>
                      <span>Quantity:</span>
                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onAdd(item, 1)}>
                        <AiFillPlusCircle />
                      </button>
                    </Quantity>
                  </CardInfo>
                </Card>
              )
            })
          )}
        </Cards>
        {cartItems.length >= 1 && (
          <Checkout layout>
            <h3>Subtotal: ${totalPrice}</h3>
            <button onClick={handleCheckout}>Purchase</button>
          </Checkout>
        )}
      </CartStyle>
    </CartWrapper >
  )
}
