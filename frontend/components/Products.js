import { ProductStyles } from '../styles/ProductsStyle'
import Link from 'next/link'

export default function Products({ product }) {
  const { title, price, image, slug } = product.attributes
  return (
    <ProductStyles>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.small.url} alt='' />
        </div>
      </Link>

      <h2>{title}</h2>
      <h3>${price}</h3>
    </ProductStyles>
  )
}
