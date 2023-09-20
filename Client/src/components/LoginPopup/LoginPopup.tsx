import { useState } from "react"
import "./LoginPopup.css"
import { ILoginForm, IRegisterForm, useUserContext } from "../../context/UserContext"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const LoginPopup = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(true)

    const { login, register, error } = useUserContext()

    const loginSchema = yup.object({
      username: yup.string().required(),
      password: yup.string().required()
    })

    const registerSchema = yup.object({
      email: yup.string().email().required(),
      username: yup.string().required(),
      password: yup.string().required(),
    })

    const { register: loginForm, formState: { errors: loginErrors }, handleSubmit: loginHandleSubmit } = useForm({ resolver: yupResolver(loginSchema)})
    const { register: registerForm, formState: { errors: registerErrors }, handleSubmit: registerHandleSubmit } = useForm({ resolver: yupResolver(registerSchema)})
    
    const handleLogin = async (data: ILoginForm) => {
      await login(data)
    }

    const handleRegister = async (data: IRegisterForm) => {
      await register(data)
    }

  return (
    <div className="login-popup">
        <h1>Welcome</h1>
        {loginFormVisible ? (
        <form onSubmit={loginHandleSubmit(handleLogin)} className="login-form">
            <p className="validation-error">{error}</p>
            <input type="text" placeholder="Username" {...loginForm("username")}/>
            <p className="validation-error">{loginErrors.username?.message}</p>
            <input type="password" placeholder="Password" {...loginForm("password")}/>
            <p className="validation-error">{loginErrors.password?.message}</p>
            <button type="submit">Login</button>
        </form>
        ) : (
        <form onSubmit={registerHandleSubmit(handleRegister)} className="register-form">
            <p className="validation-error">{error}</p>
            <input type="text" placeholder="Username" {...registerForm("username")}/>
            <p className="validation-error">{registerErrors.username?.message}</p>
            <input type="email" placeholder="E-mail" {...registerForm("email")}/>
            <p className="validation-error">{registerErrors.email?.message}</p>
            <input type="password" placeholder="Password" {...registerForm("password")}/>
            <p className="validation-error">{registerErrors.password?.message}</p>
            <button type="submit">Register</button>
        </form>
        )}
        <p onClick={() => setLoginFormVisible(!loginFormVisible)}>{loginFormVisible ? "Register" : "Back to Login"}</p>
    </div>
  )
}

export default LoginPopup