require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
const userRouter = require("./src/user/user.router")
const productRouter = require("./src/product/product.router")
const checkoutRouter = require("./src/checkout/checkout.router")
const orderRouter = require("./src/order/order.router")

const app = express()
const CLIENT_URL = process.env.CLIENT_URL

//Middlewares
app.use(
    cors({
    origin: CLIENT_URL,
    credentials: true
})
)
app.use(express.json())
app.use(
    cookieSession({
        name: "session",
        secret: process.env.COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "strict",
        httpOnly: true,
    })
)

//Routes
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api/orders", orderRouter)

app.listen(3000, () => console.log("Server is up and running..."))