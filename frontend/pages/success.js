import { useRouter } from 'next/router'
import Image from 'next/image'
import shiba from '../public/shiba.png'
import styled from 'styled-components'

const { motion } = require('framer-motion')
const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ['line_items'],
    }
  )
  return { props: { order } }
}

export default function Success({ order }) {
  const route = useRouter()

  return (
    <Wrapper>
      <Card
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details.email}</h2>
        <InfoWrapper>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => (
                <p key={key}>
                  {key} : {value}
                </p>

              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items.data.map(item => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoWrapper>
        <button onClick={() => route.push('/')}>Continue shopping</button>
        <Image src={shiba} alt='shiba inu' />
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 2rem 0rem;
`

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 2rem;
  padding: 3rem;

  h2 {
    margin: 0.2rem 0rem;
  }

  button {
    color: #fff;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    cursor: pointer;
  }
`

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
  margin-right: 1rem;
`

const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  padding-bottom: 1rem;
`

const InfoWrapper = styled.div`
  display: flex;
  margin: 2rem 0rem;
`
