const { initStripe } = require("../../stripe")
const fs = require("fs")
const path = require("path")
const ordersFilePath = path.join(__dirname, "../../db/orders.json")

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
            order_id: session.id,
            created: session.created,
            customer: {
                customer_id: session.customer,
                name: session.customer_details.name
            },
            products: await Promise.all(line_items.data.map(async (item) => {
                const productInfo = await stripe.products.retrieve(item.price.product);
                return {
                    product_id: item.price.product,
                    product: productInfo.name,
                    quantity: item.quantity,
                    price: item.price.unit_amount,
                    image: productInfo.images[0],
                    total_price: item.amount_total
                };
            })),
            order_total_price: session.amount_total
        }

        await saveOrder(order, sessionId)
        console.log(order);
        res.status(200).json({ verified: true, data: order })
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ error: "Payment verification failed", message: error.message });
    }
}

const saveOrder = async (order, sessionId) => {
    try {
        const ordersData = await fs.promises.readFile(ordersFilePath, "utf8")
        if (!ordersData) {
            return res.status(500).json("Error reading orders data");
        }
        const orders = JSON.parse(ordersData)

        if (orders.some(order => order.order_id === sessionId)) {
            return res.status(404).json("Order already exists!")
        };

        orders.push(order)

        await fs.promises.writeFile(ordersFilePath, JSON.stringify(orders, null, 2))
    } catch (error) {
        throw error
    }
}

module.exports = { createCheckoutSession, verifyOrder }