import Stripe from 'stripe'
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
import { getSession } from '@auth0/nextjs-auth0'

export default async function handler(req, res) {
  const session = getSession(req, res)
  const user = session?.user
  const stripeId = user['http://localhost:3000/stripe_customer_id']

  if (req.method === 'POST') {
    try {
      // Create a checkout session
      const session = await stripe.checkout.sessions.create({
        submit_type: 'pay',
        mode: 'payment',
        customer: stripeId,
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['PL', 'US']
        },
        allow_promotion_codes: true,
        shipping_options: [
          { shipping_rate: 'shr_1LGKomJKGLQ42yiDSyTZ6qBt' }, { shipping_rate: 'shr_1LGPz1JKGLQ42yiDN34s0Hvs' }
        ],
        line_items: req.body.map(item => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url]
              },
              unit_amount: item.price * 100
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            },
            quantity: item.quantity,
          }
        }),
        // Bring ppl to the success or failure page
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      })
      res.status(200).json(session)
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message)
    }
  }
}
