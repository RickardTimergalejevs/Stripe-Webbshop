const express = require("express")
const { register, login, logout } = require("./user.controller")

const userRouter = express
.Router()
.post("/register", register)
.post("/login", login)
.post("/logout", logout)

module.exports = userRouter