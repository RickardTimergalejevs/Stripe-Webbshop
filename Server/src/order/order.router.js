const express = require("express")
const { getOrders } = require("./order.controller")

const orderRouter = express
.Router()
.get("/", getOrders)

module.exports = orderRouter