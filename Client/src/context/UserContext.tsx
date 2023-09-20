import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import axios from "axios";

interface IUser {
    id: string
    username: string,
    email: string,
}

export interface ILoginForm {
    username: string,
    password: string
}

export interface IRegisterForm {
    email: string,
    username: string,
    password: string
}

interface IUserContext {
    user: IUser | null,
    error: string | null,
    login: (credentials: ILoginForm) => Promise<void>,
    register: (registerData: IRegisterForm) => Promise<void>,
    logout: () => Promise<void>
}

const UserContext = createContext<IUserContext>({
    user: null,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
})

export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<IUser | null>(null)
    const [error, setError] = useState<string | null>(null)
    
    console.log(user);
    console.log(error);
    
    const authorize = async () => {
        try {
            const response = await axios.get("api/users/authorize", {
                withCredentials: true
            })

        if (response.status === 200) {
            setUser(response.data)
        }
        } catch (error: any) {
            throw new Error("Authorize failed: " + error.message);
        }
    }

    useEffect(() => {
        authorize()
    }, [])

    const login = async (credentials: ILoginForm) => {
        try {
            const { username, password } = credentials
            
            const response = await axios.post("api/users/login", {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            if (response.status === 200) {
                setUser(response.data)
                console.log("Login successful");
                setError(null)
            } else {
                throw new Error("Login failed with status: " + response.status);
            }
        } catch (error: any) {
            console.error("Login error:", error);
            setError(error.response.data.message)
            throw new Error("Login failed: " + error.message);
        }
    }

    const register = async (registerData: IRegisterForm) => {
        try {
            const { email, username, password } = registerData
            
            const response = await axios.post("api/users/register", {
                email,
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.status === 201) {
                console.log(response.data);
                console.log("Registration successful");
                login({ username, password })
                setError(null)
            } else {
                throw new Error("Registration failed with status: " + response.status);
            }
        } catch (error: any) {
            setError(error.response.data.message)
            throw new Error("Registration failed: " + error.message);
        }
    }
    
    const logout = async () => {
        try {
            await axios.post("api/users/logout", null, {
                withCredentials: true
            })
            setUser(null)
            console.log("Logout successful!");
        } catch (error: any) {
            throw new Error("Logout failed: " + error.message);
        }
    }

    return (
        <div>
            <UserContext.Provider value={{ login, logout, register, user, error }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserProvider