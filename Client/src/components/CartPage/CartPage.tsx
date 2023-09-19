import axios from "axios"
import { useCartContext } from "../../context/CartContext"
import { useUserContext } from "../../context/UserContext"
import { formatPrice, totalPrice } from "../../utils/helpers"
import "./CartPage.css"

const CartPage = () => {

  const { cartItems, setCartItems, addToCart, removeFromCart } = useCartContext()
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
        {cartItems.length >= 1 ? <div className="cart-product-list">
        {cartItems.map((item) => (
          <div key={item.product.id} className="cart-product-card">
            <h1>{item.product.name}</h1>
            <img src={item.product.image} alt={item.product.name} className="cart-product-card-img" />
            <h2>{formatPrice(item.product.price * item.quantity)} kr</h2>
            <p>Quantity: {item.quantity}</p>
            <div className="cart-product-btns">
              <button className="cart-increase-btn" onClick={() => {addToCart(item.product, item.quantity)}}>+</button>
              <button className="cart-decrease-btn" onClick={() => {removeFromCart(item.product, item.quantity)}}>-</button>
            </div>
          </div>
        ))}
      </div> : <div>
        <h1 className="cart-empty">Your cart is empty</h1>
      </div> }
      <h2 className="cart-total-price">Total price: {totalPrice(cartItems)} kr</h2>
        {user ? <button className="checkout-btn" onClick={handlePayment}>To checkout</button> : <div>
          <h2>You must login to proceed!</h2>
        </div> }
      </div>
    </main>
  )
}

export default CartPage