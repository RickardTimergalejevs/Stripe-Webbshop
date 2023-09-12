import { IProduct } from "../../context/ProductContext" 
import "./ProductCard.css"

type Props = {
    product: IProduct
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <h2>{product.price} kr</h2>
        <button>Buy</button>
    </div>
  )
}

export default ProductCard