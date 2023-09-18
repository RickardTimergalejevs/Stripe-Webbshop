import { useOrderContext } from "../../context/OrderContext"
import { useEffect } from "react"
import { formatDate, formatPrice } from "../../utils/helpers"
import { useUserContext } from "../../context/UserContext"
import "./ProfilePage.css"

const ProfilePage = () => {
    const { getOrders, orders } = useOrderContext()
    const { user } = useUserContext()

    useEffect(() => {
        getOrders()
    }, [])

  return (
    <main>
        <div className="user-profile-wrapper">
        <h1 className="user-profile-title">Welcome to your profile, {user?.username}</h1>
        <h2>Your orders:</h2>
        <div className="order-list">
            {orders && orders.map((order) => (
                <div key={order.order_id} className="order-card">
                    <div>
                        <p>Order number: {order.order_id}</p>
                        <p>Created: {formatDate(order.created)}</p>
                    </div>
                    <div className="order-product-details">
                        {order.products.map((item) => (
                            <div key={item.product_id}>
                                <img src={item.image} alt={item.product} className="order-img" />
                                <div className="order-card-details">
                                    <h2>{item.product}</h2>
                                    <p>Price: {formatPrice(item.price)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2>Total order price: {formatPrice(order.order_total_price)} kr</h2>
                </div>
            ))}
        </div>
        </div>
    </main>
  )
}

export default ProfilePage