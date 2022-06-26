import { useQuery } from 'urql'
import { GET_PRODUCT_QUERY } from '../../lib/query'
import { useRouter } from 'next/router'
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy
} from '../../styles/ProductDetails'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useStateContext } from '../../lib/context'

export default function ProductDetails() {
  // Use state/context 
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext()

  // Fetch slug
  const { query } = useRouter()
  // Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug }
  })

  const { data, fetching, error } = results

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  // extract our data
  const { title, description, image } = data.products.data[0].attributes

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity:</span>
          <button><AiFillMinusCircle onClick={decreaseQty} /></button>
          <p>{qty}</p>
          <button><AiFillPlusCircle onClick={increaseQty} /></button>
        </Quantity>
        <Buy onClick={() => onAdd(data.products.data[0].attributes, qty)}>add to card</Buy>
      </ProductInfo>
    </DetailsStyle>
  )
}
