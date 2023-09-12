import { useProductContext } from "../../context/ProductContext"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductList.css"

const ProductList = () => {
    const { products } = useProductContext()

  return (
    <div>
        <h1>Products</h1>
        <div className="product-list">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    </div>
  )
}

export default ProductList