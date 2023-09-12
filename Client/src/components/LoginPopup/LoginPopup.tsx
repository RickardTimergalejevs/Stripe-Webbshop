import { useState } from "react"
import "./LoginPopup.css"

const LoginPopup = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(true)

  return (
    <div className="login-popup">
        <h1>Welcome</h1>
        {loginFormVisible ? (
        <div className="login-form">
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="Password"/>
            <button>Login</button>
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