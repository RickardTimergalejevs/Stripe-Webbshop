import { useState, useContext, createContext, PropsWithChildren } from "react"
import axios from "axios"

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
        product_name: string,
        image: string,
        price: number,
        quantity: number,
        total_price: number
      }
    ],
    order_total_price: number
  }

const OrderContext = createContext(null as any)

export const useOrderContext = () => useContext(OrderContext)

const OrderProvider = ({ children }: PropsWithChildren) => {
const [isPaymentVerified, setIsPaymentVerified] = useState(false)
  const [order, setOrder] = useState<IOrder | null>(null)
  console.log("order cart", order);

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
      } else {
        setIsPaymentVerified(false)
      }
    } catch (error: any) {
      console.error(error);
    }
  } 

    return (
        <div>
            <OrderContext.Provider value={{ verifyPayment, isPaymentVerified, setIsPaymentVerified, order }}>
                {children}
            </OrderContext.Provider>
        </div>
    )
}

export default OrderProvider