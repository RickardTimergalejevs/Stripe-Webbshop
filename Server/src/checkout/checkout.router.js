const express = require("express")
const { createCheckoutSession, verifyOrder } = require("./checkout.controller")

const checkoutRouter = express
.Router()
.post("/create-session", createCheckoutSession)
.post("/verify-session", verifyOrder)

module.exports = checkoutRouter