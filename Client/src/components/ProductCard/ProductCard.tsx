import { useCartContext } from "../../context/CartContext"
import { IProduct } from "../../context/ProductContext" 
import { formatPrice } from "../../utils/helpers"
import "./ProductCard.css"

type Props = {
    product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartContext()

  return (
    <div className="product-card">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} className="product-card-img" />
        <p className="product-description">{product.description}</p>
        <h2>{formatPrice(product.price)} kr</h2>
        <button className="product-btn" onClick={() => addToCart(product, 1)}>Add cart</button>
    </div>
  )
}

export default ProductCard