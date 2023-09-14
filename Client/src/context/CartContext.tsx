import { PropsWithChildren, createContext, useContext, useState } from "react"

const CartContext = createContext(null as any)

export const useCartContext = () => useContext(CartContext)

const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState([])
    return (
        <div>
            <CartContext.Provider value={{}}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export default CartProvider