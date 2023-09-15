import { PropsWithChildren, createContext, useContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { IProduct } from "./ProductContext"

interface ICartItem {
    product: IProduct,
    quantity: number
}

const CartContext = createContext(null as any)

export const useCartContext = () => useContext(CartContext)

const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>("cart", [])

    const addToCart = (product: IProduct, quantity: number) => {
        const existingCartItemIndex = cartItems.findIndex(item => product.id === item.product.id)

        if (existingCartItemIndex !== -1) {
            const updatedCartItems = [...cartItems]
            updatedCartItems[existingCartItemIndex].quantity += 1
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
            <CartContext.Provider value={{ addToCart }}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export default CartProvider