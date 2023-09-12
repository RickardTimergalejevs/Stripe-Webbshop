const express = require("express")
const { register } = require("./user.controller")

const userRouter = express
.Router()
.post("/register", register)

module.exports = userRouter