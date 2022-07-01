import Head from 'next/head'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../lib/query'
import Product from '../components/Products'
import { Gallery } from '../styles/Gallery'

export default function Home() {
  // Fetch products from Strapi
  const [results] = useQuery({ query: PRODUCT_QUERY })
  const { data, fetching, error } = results

  // Check for the data coming in
  if (fetching) return <p>Loading...</p>
  if (error) return <p>oh no... {error.message}</p>
  const products = data.products.data

  return (
    <div>
      <Head>
        <title>Stld - styled by mrw</title>
        <meta name="description" content="Things for a minimalist, 82, with an accent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hi</h1>
        <Gallery>
          {products.map(product => (
            <Product product={product} key={product.attributes.slug} />
          ))}
        </Gallery>
      </main>
    </div>
  )
}
