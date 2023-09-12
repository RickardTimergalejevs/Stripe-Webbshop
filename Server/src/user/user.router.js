const express = require("express")
const { register, login, logout, authorize } = require("./user.controller")

const userRouter = express
.Router()
.post("/register", register)
.post("/login", login)
.post("/logout", logout)
.post("/authorize", authorize)

module.exports = userRouter