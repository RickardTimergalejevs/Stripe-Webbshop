const express = require("express")
const { getAllProducts } = require("./product.controller")

const productRouter = express
.Router()
.get("/", getAllProducts)

module.exports = productRouter