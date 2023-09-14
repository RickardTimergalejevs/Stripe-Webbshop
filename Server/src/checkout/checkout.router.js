const express = require("express")
const { createCheckoutSession } = require("./checkout.controller")

const checkoutRouter = express
.Router()
.post("/create-session", createCheckoutSession)

module.exports = checkoutRouter