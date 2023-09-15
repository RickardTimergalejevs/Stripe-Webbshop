const { initStripe }= require("../../stripe")
const stripe = initStripe()

const getAllProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            limit: 10,
            expand: ["data.default_price"]
        })

        if(!products) {
            return res.status(400).json({ message: "Could not get products" })
        }

        const productsInfo = products.data.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.default_price.unit_amount,
            default_price: product.default_price,
            image: product.images,
            description: product.description
        }))

        res.status(200).json(productsInfo)
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getAllProducts }