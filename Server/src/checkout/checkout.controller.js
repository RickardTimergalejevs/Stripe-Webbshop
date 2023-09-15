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

        res.status(200).json({ url: session.url, sessionId: session.id })
    } catch (error) {
        console.log(error.message);
        res.status(400).json("Det gick inte bra...")
    }
}

const verifyOrder = async (req, res) => {
    try {
        const { sessionId } = req.body

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status !== "paid") {
            return res.status(400).json({ verified: false })
        }

        const line_items = await stripe.checkout.sessions.listLineItems(sessionId)

        const order = {
            id: session.id,
            created: session.created,
            customer: session.customer_details.name,
            products: await Promise.all(line_items.data.map(async (item) => {
                const productInfo = await stripe.products.retrieve(item.price.product);
                return {
                    product: productInfo.name,
                    quantity: item.quantity,
                    price: (item.price.unit_amount * item.quantity),
                    image: productInfo.images[0],
                    total_price: item.amount_total
                };
            })),
            total_price: session.amount_total
        }

        console.log(order);
        res.status(200).json({ verified: true })
    } catch (error) {
        console.error(error.message)
        res.status(500).json(error.message)
    }
}

module.exports = { createCheckoutSession, verifyOrder }