import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import axios from "axios";

interface IUser {
    id: string
    username: string,
    email: string,
}

interface ILoginForm {
    username: string,
    password: string
}

const UserContext = createContext(null as any)

export const useUserContext = () => useContext(UserContext)

const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<IUser | null>(null)
    console.log(user);
    

    useEffect(() => {
        const authorize = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/users/authorize", {
                    withCredentials: true
                })

            if (response.status === 200) {
                setUser(response.data)
            }
            } catch (error: any) {
                throw new Error("Authorize failed: " + error.message);
            }
        }

        authorize()
    }, [])

    const login = async (credentials: ILoginForm) => {
        try {
            const { username, password } = credentials
            
            const response = await axios.post("http://localhost:3000/api/users/login", {
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
            } else {
                throw new Error("Login failed with status: " + response.status);
            }
        } catch (error: any) {
            console.error("Login error:", error);
            throw new Error("Login failed: " + error.message);
        }
    }
    
    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/api/users/logout", null, {
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
            <UserContext.Provider value={{ login, logout, user }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserProvider