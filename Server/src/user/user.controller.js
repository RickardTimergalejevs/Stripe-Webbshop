const bcrypt = require("bcrypt")
const fs = require("fs")
const path = require("path")
const { initStripe } = require("../../stripe")
const stripe = initStripe()
const usersFilePath = path.join(__dirname, "../../db/users.json")


const register = async (req, res) => {
    try {
        const { email, username, password} = req.body

        let newUser = {
            email,
            username,
            password
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        newUser.password = hashedPassword

        const usersData = await fs.promises.readFile(usersFilePath, "utf8")
        if (!usersData) {
            return res.status(500).json({ message: "Error reading user data" });
        }
        const users = JSON.parse(usersData)

        if(users.some(user => user.email === email)) {
            return res.status(404).json({ message: "Email already exists!" })
        }

        const customer = await stripe.customers.create({
            email: email,
            name: username
        })

        newUser = { ...newUser, id: customer.id }

        users.push(newUser)
        await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2))
        res.status(201).json({ message: "User created" })    
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const usersData = await fs.promises.readFile(usersFilePath, "utf8")
        if (!usersData) {
            return res.status(500).json({ message: "Error reading user data" });
        }
        const users = JSON.parse(usersData)

        const existingUser = users.find((user) => user.username === username)

        if (!existingUser) {
            return res.status(500).json({ message: "User not found" })
        }

        const passwordCheck = await bcrypt.compare(password, existingUser.password)

        if (!passwordCheck) {
            return res.status(500).json({ message: "Incorrect password"})
        }

        req.session = existingUser
        res.status(200).json(existingUser)
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const logout = async (req, res) => {
    if(!req.session?.id) {
        return res.status(400).json({ message: "No one is logged in" })
    }

    req.session = null
    res.status(200).json({ message: "You have successfully logged out" })
}

const authorize = async (req,res) => {
    if(!req.session?.id) {
        return res.status(400).json({ message: "No one is logged in" })
    }
    res.status(200).json(req.session)
}

module.exports = { register, login, logout, authorize }