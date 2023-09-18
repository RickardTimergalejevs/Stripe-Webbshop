import { useProductContext } from "../../context/ProductContext"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductList.css"

const ProductList = () => {
    const { products } = useProductContext()

  return (
    <div className="product-wrapper">
        <h1 className="product-list-title">Popular products</h1>
        <div className="product-list">
            {products.map((product) => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    </div>
  )
}

export default ProductList