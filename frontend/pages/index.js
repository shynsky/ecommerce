import Head from 'next/head'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../lib/query'

export default function Home() {
  // Fetch products from Strapi
  const [results] = useQuery({ query: PRODUCT_QUERY })
  const { data, fetching, error } = results

  // Check for the data coming in
  if (fetching) return <p>Loading...</p>
  if (error) return <p>oh no... {error.message}</p>
  console.log(data)

  return (
    <div>
      <Head>
        <title>Styled Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello</h1>
      </main>

    </div>
  )
}
