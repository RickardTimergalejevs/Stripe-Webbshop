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
    <main>
      <div className="cart-wrapper">
        <h1 className="cart-title">Cart</h1>
        <div className="cart-product-list">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-product-card">
            <h1>{item.product.name}</h1>
            <img src={item.product.image} alt={item.product.name} className="cart-product-card-img" />
            <h2>{formatPrice(item.product.price)} kr</h2>
            <p>Quantity: {item.quantity}</p>
            <div className="cart-product-btns">
              <button>Deacrease</button>
              <button>Increase</button>
            </div>
          </div>
        ))}
      </div>
      <h2 className="cart-total-price">Total price: {totalPrice(cartItems)} kr</h2>
        <button className="checkout-btn" onClick={handlePayment}>To checkout</button>
      </div>
    </main>
  )
}

export default CartPage