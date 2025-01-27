'use client'

import { useLoginMutation } from "../services/LoginService";
import { userLoginData } from "../@types/orders-query";
import { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

type userLoginResponse = {
    email: string
    name: string
}

type AuthContextProps = {
    user: userLoginResponse | null
    login: ({email, password}: userLoginData) => void,
    setUser: (user: userLoginResponse) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<userLoginResponse | null>(null)

    const loginMutation = useLoginMutation()

    const login = ({email, password}: userLoginData) => {
            loginMutation.mutate({email, password}, {
                onSuccess: (data) => {
                    setUser(data)
                },
                onError: (error) => { 
                    console.log("Failed to authenticate user:", error)
                }
            })
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, isLoading: loginMutation.isPending}}>
            {children}
        </AuthContext.Provider>
    )
}