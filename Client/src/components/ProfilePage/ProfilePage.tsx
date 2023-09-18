import { useOrderContext } from "../../context/OrderContext"
import { useEffect } from "react"
import { formatDate, formatPrice } from "../../utils/helpers"
import { useUserContext } from "../../context/UserContext"

const ProfilePage = () => {
    const { getOrders, orders } = useOrderContext()
    const { user } = useUserContext()

    useEffect(() => {
        getOrders()
    }, [])

  return (
    <div>
        <h1>Welcome to your profile,</h1>
        <div>
            {orders && orders.map((order) => (
                <div key={order.order_id}>
                    <p>Order number: {order.order_id}</p>
                    <p>Created: {formatDate(order.created)}</p>
                    <div>
                        {order.products.map((item) => (
                            <div key={item.product_id}>
                                <h2>{item.product}</h2>
                                <img src={item.image} alt={item.product} />
                                <p>Price: {formatPrice(item.price)}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <h2>Total order price: {formatPrice(order.order_total_price)} kr</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProfilePage