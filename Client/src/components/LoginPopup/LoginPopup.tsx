import { useState } from "react"
import "./LoginPopup.css"
import { useUserContext } from "../../context/UserContext"

const LoginPopup = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(true)
    const [loginData, setLoginData] = useState({
      username: "",
      password: ""
    })
    const [registerData, setRegisterData] = useState({
      email: "",
      username: "",
      password: ""
    })

    const { login, register } = useUserContext()
    
    const handleInputLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setLoginData({
        ...loginData,
        [name]: value
      })
    }

    const handleInputRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setRegisterData({
        ...registerData,
        [name]: value
      })
    }

    const handleLogin = async () => {
      await login(loginData)
    }

    const handleRegister = async () => {
      await register(registerData)
    }

  return (
    <div className="login-popup">
        <h1>Welcome</h1>
        {loginFormVisible ? (
        <div className="login-form">
            <input type="text" placeholder="Username" name="username" onChange={handleInputLoginFormChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleInputLoginFormChange}/>
            <button onClick={handleLogin}>Login</button>
        </div>
        ) : (
        <div className="register-form">
            <input type="text" placeholder="E-mail" name="email" onChange={handleInputRegisterFormChange}/>
            <input type="text" placeholder="Username" name="username" onChange={handleInputRegisterFormChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleInputRegisterFormChange}/>
            <button onClick={handleRegister}>Register</button>
        </div>
        )}
        <p onClick={() => setLoginFormVisible(!loginFormVisible)}>{loginFormVisible ? "Register" : "Back to Login"}</p>
    </div>
  )
}

export default LoginPopup