import { createClient, Provider } from 'urql'

const client = createClient({ url: 'http://localhost:1337/graphql' })

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
