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

        //Hash customer password
        const hashedPassword = await bcrypt.hash(password, 10)
        newUser.password = hashedPassword

        //Read users json
        const usersData = await fs.promises.readFile(usersFilePath, "utf8")
        if (!usersData) {
            return res.status(500).json("Error reading user data");
        }
        const users = JSON.parse(usersData)

        //Check existed email
        if(users.some(user => user.email === email)) {
            return res.status(404).json("Email already exists!")
        }

        //Create customer on stripe
        const customer = await stripe.customers.create({
            email: email,
            name: username
        })

        //Add id to new customer
        newUser = { ...newUser, id: customer.id }

        //Push new customer to users json
        users.push(newUser)
        await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2))
        res.status(201).json({ message: "User created" })    
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async () => {

}

const logout = async () => {

}

module.exports = { register }