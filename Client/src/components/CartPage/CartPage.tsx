const CartPage = () => {

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
      <button onClick={handlePayment}>Buy</button>
    </div>
  )
}

export default CartPage