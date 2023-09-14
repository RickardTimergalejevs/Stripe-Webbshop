const { initStripe } = require("../../stripe")

const stripe = initStripe()

const CLIENT_URL = process.env.CLIENT_URL

const createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "Test",
                        description: "Bla bla bla..."
                    },
                    unit_amout: "24900"
                },
                quantity: 2
            }],
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