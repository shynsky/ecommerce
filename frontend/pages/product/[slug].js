import { useQuery } from 'urql'
import { GET_PRODUCT_QUERY } from '../../lib/query'
import { useRouter } from 'next/router'
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  BuyStyles,
  ImageWrapper
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
  const { title, description, image, price } = data.products.data[0].attributes

  return (
    <DetailsStyle>
      <ImageWrapper>
        <img src={image.data.attributes.formats.medium.url} alt={title} />
      </ImageWrapper>

      <ProductInfo>
        <h3>{title}</h3>
        <p><strong>Description: </strong><br />{description}</p>
        <p><strong>Price: </strong><br />${price}</p>
        <Quantity>
          <span
          >Quantity:</span>
          <button><AiFillMinusCircle onClick={decreaseQty} /></button>
          <span>{qty}</span>
          <button><AiFillPlusCircle onClick={increaseQty} /></button>
        </Quantity>
        <BuyStyles onClick={() => onAdd(data.products.data[0].attributes, qty)}><button>Add to card</button></BuyStyles>
      </ProductInfo>
    </DetailsStyle >
  )
}
