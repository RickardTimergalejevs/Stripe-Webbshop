import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import axios from "axios"

export interface IProduct {
    id: string,
    name: string,
    price: number,
    image: string
}

interface IProductContext {
    products: IProduct[],
}

const ProductContext = createContext<IProductContext>({
    products: [],
})

export const useProductContext = () => useContext(ProductContext)

const ProductProvider = ({ children }: PropsWithChildren) => {
    const [products, setProducts] = useState<IProduct[]>([])
    
    const getAllProducts = async () => {
        try {
            const response = await axios.get("api/products")
            setProducts(response.data)
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    console.log(products);
    return (
        <div>
            <ProductContext.Provider value={{ products }}>
                {children}
            </ProductContext.Provider>
        </div>
    )
}

export default ProductProvider