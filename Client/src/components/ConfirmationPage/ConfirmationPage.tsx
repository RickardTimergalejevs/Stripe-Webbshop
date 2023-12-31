import { useEffect, useRef } from "react"
import { useUserContext } from "../../context/UserContext"
import { formatDate, formatPrice } from "../../utils/helpers"
import { useOrderContext } from "../../context/OrderContext"
import "./ConfirmationPage.css"
import Loader from "../Loader/Loader"

const ConfirmationPage = () => {
  const { verifyPayment, isPaymentVerified, order } = useOrderContext()
  const { user } = useUserContext()

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      verifyPayment()
      isFirstRender.current = false
  }
  }, [])

  return (
    <main>
      {isPaymentVerified && user && order ? (
        <div className="confirmation-wrapper">
          <h1 className="confirmation-title">Thank you for your order, {user.username}!</h1>
          <div className="confirmation-details">
            <div>
              <h2>Order details:</h2>
              <p>Order number: {order.order_id}</p>
              <p>Created: {formatDate(order.created)}</p>
            </div>
            <div className="confirmation-order-list">
              {order.products.map((item) => (
                <div key={item.product_id}>
                  <h2>{item.product}</h2>
                  <img src={item.image} alt={item.product} className="confirmation-product-img"/>
                  <p>Price: {formatPrice(item.total_price)} kr</p>
                  {item.discount !== 0 && <p className="confirmation-product-discount">-{formatPrice(item.discount)} kr</p>}
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
            <div>
              {order.order_amount_discount !== 0 && <p>Savings: <span className="confirmation-product-discount">{formatPrice(order.order_amount_discount)} kr</span></p>}
              <h2>Total order price: {formatPrice(order.order_total_price)} kr</h2>
            </div>
          </div>
        </div>
      ) : (<div>
        <h2><Loader /> </h2>
      </div>)}
    </main>
  )
}

export default ConfirmationPage