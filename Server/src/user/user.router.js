const express = require("express")
const { register, login } = require("./user.controller")

const userRouter = express
.Router()
.post("/register", register)
.post("/login", login)

module.exports = userRouter