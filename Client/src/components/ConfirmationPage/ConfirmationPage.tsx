import { useEffect, useState } from "react"

const ConfirmationPage = () => {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false)

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id")
      const response = await fetch("api/checkout/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId })
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const { verified } = await response.json()

      if (verified) {
        setIsPaymentVerified(true)
        localStorage.removeItem("session-id")
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
    isPaymentVerified ? ( <h1>Tack för ditt köp</h1>) : ( <h1>Något gick fel</h1> ) 
  )
}

export default ConfirmationPage