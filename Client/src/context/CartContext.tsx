import { PropsWithChildren, createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { IProduct } from "./ProductContext"

export interface ICartItem {
    product: IProduct,
    quantity: number
}

interface ICartContext {
    cartItems: ICartItem[],
    setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>,
    addToCart: (product: IProduct, quantity: number) => void
}

const CartContext = createContext<ICartContext>({
    cartItems: [],
    setCartItems: () => {},
    addToCart: (product: IProduct, quantity: number) => {}
})

export const useCartContext = () => useContext(CartContext)

const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("cart", [])

    const addToCart = (product: IProduct, quantity: number) => {
        const existingCartItemIndex = cartItems.findIndex(item => product.id === item.product.id)

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems]
            updatedCartItems[existingCartItemIndex].quantity += 1
            setCartItems(updatedCartItems)
        } else {
            const newCartItem: ICartItem = {
                product,
                quantity: 1
            }
            setCartItems([...cartItems, newCartItem])
        }
    }

    return (
        <div>
            <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export default CartProvider