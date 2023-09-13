import { useState } from "react"
import "./LoginPopup.css"
import { useUserContext } from "../../context/UserContext"

const LoginPopup = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(true)
    const [loginData, setLoginData] = useState({
      username: "",
      password: ""
    })

    const { login, user } = useUserContext()
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setLoginData({
        ...loginData,
        [name]: value
      })
    }

    const handleLogin = async () => {
      await login(loginData)
    }

  return (
    <div className="login-popup">
        <h1>Welcome</h1>
        {loginFormVisible ? (
        <div className="login-form">
            <input type="text" placeholder="Username" name="username" onChange={handleInputChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleInputChange}/>
            <button onClick={handleLogin}>Login</button>
        </div>
        ) : (
        <div className="register-form">
            <input type="text" placeholder="E-mail"/>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <button>Register</button>
        </div>
        )}
        <p onClick={() => setLoginFormVisible(!loginFormVisible)}>{loginFormVisible ? "Register" : "Back to Login"}</p>
    </div>
  )
}

export default LoginPopup