const fs = require("fs")
const path = require("path")
const ordersFilePath = path.join(__dirname, "../../db/orders.json")

const getOrders = async (req, res) => {
    try {
        if(!req.session?.id) {
            return res.status(400).json({ message: "No one is logged in" })
        }

        const ordersData = await fs.promises.readFile(ordersFilePath, "utf8")
        if (!ordersData) {
            return res.status(500).json("Error reading orders data");
        }
        const orders = JSON.parse(ordersData)

        const customerId = req.session.id
        const userOrders = orders.filter((order) => order.customer.customer_id === customerId)

        res.status(200).json (userOrders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getOrders }