import { useEffect, useState } from "react"
import axios from "axios"
import { useUserContext } from "../../context/UserContext"
import { formatDate, formatPrice } from "../../utils/helpers"

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

const ConfirmationPage = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false)
  const [order, setOrder] = useState<IOrder | null>(null)
  const { user } = useUserContext()
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

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div>
      {isPaymentVerified && user && order && (
        <div>
          <h1>Thank you for your order, {user.username}!</h1>
          <div>
            <h2>Order details:</h2>
            <p>Order number: {order.order_id}</p>
            <p>Created: {formatDate(order.created)}</p>
            <div>
              {order.products.map((item) => (
                <div key={item.product_id}>
                  <h2>{item.product_name}</h2>
                  <img src={item.image} alt={item.product_name} />
                  <p>Price: {formatPrice(item.total_price)} kr</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
            <h2>Total order price: {formatPrice(order.order_total_price)} kr</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfirmationPage