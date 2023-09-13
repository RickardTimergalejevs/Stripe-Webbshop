require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieSession = require("cookie-session")
const userRouter = require("./src/user/user.router")
const productRouter = require("./src/product/product.router")

const app = express()
const CLIENT_URL = "http://localhost:5173"

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
        secure: false,
    })
)

//Routes
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)

app.listen(3000, () => console.log("Server is up and running..."))