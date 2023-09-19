import { useState, useContext, createContext, PropsWithChildren } from "react"
import axios from "axios"
import { useCartContext } from "./CartContext"

interface IOrder {
    order_id: string,
    created: number,
    customer: {
      customer_id: string,
      name: string
    },
    products: [
      {
        product_id: string,
        product: string,
        image: string,
        price: number,
        quantity: number,
        total_price: number
      }
    ],
    order_total_price: number
}

interface IOrderContext {
    order: IOrder | null,
    orders: IOrder[] | null, 
    isPaymentVerified: boolean,
    setIsPaymentVerified: React.Dispatch<React.SetStateAction<boolean>>,
    verifyPayment: () => Promise<void>,
    getOrders: () => Promise<void>
}

const OrderContext = createContext<IOrderContext>({
    order: null,
    orders: null,
    isPaymentVerified: false,
    setIsPaymentVerified: () => {},
    verifyPayment: async () => {},
    getOrders: async () => {}
})

export const useOrderContext = () => useContext(OrderContext)

const OrderProvider = ({ children }: PropsWithChildren) => {
const [isPaymentVerified, setIsPaymentVerified] = useState(false)
  const [order, setOrder] = useState<IOrder | null>(null)
  const [orders, setOrders] = useState<IOrder[] | null> (null)
  console.log("order cart", order);
  console.log("User orders", orders);
  const { setCartItems } = useCartContext()

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id")
      const response = await axios.post("api/checkout/verify-session", { sessionId }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (response.status !== 200) {
        throw new Error("Failed to fetch data from the server");
      }

      const { verified, data } = response.data

      if (verified) {
        setIsPaymentVerified(true)
        localStorage.removeItem("session-id")
        setOrder(data)
        setCartItems([])
      } else {
        setIsPaymentVerified(false)
      }
    } catch (error: any) {
      console.error(error);
    }
  } 

  const getOrders = async () => {
    try {
        const response = await axios.get("api/orders", {
            withCredentials: true
        })

        if (response.status === 200) {
            setOrders(response.data)
        }

    } catch (error: any) {
        console.error(error);
    }
  }
  

    return (
        <div>
            <OrderContext.Provider value={{ verifyPayment, isPaymentVerified, setIsPaymentVerified, order, getOrders, orders }}>
                {children}
            </OrderContext.Provider>
        </div>
    )
}

export default OrderProvider