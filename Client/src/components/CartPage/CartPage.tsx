import axios from "axios"
import { useCartContext } from "../../context/CartContext"
import { useUserContext } from "../../context/UserContext"
import { formatPrice, totalPrice } from "../../utils/helpers"
import "./CartPage.css"

const CartPage = () => {

  const { cartItems, setCartItems } = useCartContext()
  const { user } = useUserContext()

  const handlePayment = async () => {
    try {
      const response = await axios.post("api/checkout/create-session", {
        cartItems,
        user: user?.id
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      if (response.status === 200) {
        const { url, sessionId } = response.data
        localStorage.setItem("session-id", sessionId)
        window.location = url
      } else {
        console.error("Failed to create session");
      }
      
    } catch (error) {
      console.error("Error creating session:", error);
    }
  } 

  return (
    <div>
      <div className="cart-product-list">
      {cartItems.map((item) => (
        <div key={item.product.id} className="cart-product-card">
          <h1>{item.product.name}</h1>
          <img src={item.product.image} alt={item.product.name} />
          <p>{formatPrice(item.product.price)} kr</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
    <h2>Total products: {cartItems.length}</h2>
    <p>Total price: {totalPrice(cartItems)} kr</p>
      <button onClick={handlePayment}>Buy</button>
    </div>
  )
}

export default CartPage