import { ProductStyles } from '../styles/ProductsStyle'

export default function Products({ product }) {
  const { title, price, image } = product.attributes
  return (
    <ProductStyles>
      <div>
        <img src={image.data.attributes.formats.small.url} alt='' />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductStyles>
  )
}
