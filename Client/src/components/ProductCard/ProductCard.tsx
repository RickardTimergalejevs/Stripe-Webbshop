import { useCartContext } from "../../context/CartContext"
import { IProduct } from "../../context/ProductContext" 
import "./ProductCard.css"

type Props = {
    product: IProduct
}

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartContext()

  return (
    <div className="product-card">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <h2>{product.price} kr</h2>
        <button onClick={() => addToCart(product, 1)}>Lägg till cart</button>
    </div>
  )
}

export default ProductCard