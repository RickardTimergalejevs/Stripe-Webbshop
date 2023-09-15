const { initStripe } = require("../../stripe")

const stripe = initStripe()

const CLIENT_URL = process.env.CLIENT_URL

const createCheckoutSession = async (req, res) => {
    try {
        const { cartItems, user } = req.body

        const session = await stripe.checkout.sessions.create({
            line_items: cartItems.map((item) => {
                return {
                    price: item.product.default_price.id,
                    quantity: item.quantity
                }
            }),
            customer: user,
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
        })

        res.status(200).json({ url: session.url })
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Det gick inte bra...")
    }
}

module.exports = { createCheckoutSession }