import { ICartItem, useCartContext } from "../../context/CartContext"
import { formatPrice, totalPrice } from "../../utils/helpers"
import "./CartPage.css"

const CartPage = () => {

  const { cartItems } = useCartContext()

  const handlePayment = async () => {
    const response = await fetch("http://localhost:3000/api/checkout/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    if (!response.ok) {
      return
    }

    const { url } = await response.json()
    window.location = url
  } 

  return (
    <div>
      <div className="cart-product-list">
      {cartItems.map((item: ICartItem) => (
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