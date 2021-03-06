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
import toast from 'react-hot-toast'
import { useEffect } from 'react'

export default function ProductDetails() {
  // Use state/context 
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext()

  // Reset qty
  useEffect(() => {
    setQty
  }, [])

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

  // Create a toast
  const notify = () => {
    toast.success(`${title} successfully added to your cart`, {
      duration: 1500,
      icon: '👏',
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px'
      },
    })
  }

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
        <BuyStyles onClick={() => {
          onAdd(data.products.data[0].attributes, qty)
          notify()
        }
        }><button>Add to card</button></BuyStyles>
      </ProductInfo>
    </DetailsStyle >
  )
}
