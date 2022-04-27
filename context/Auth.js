import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const getUser = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
    })

    return (
        <AuthContext.Provider
            value = {{ user, getUser, loading }}
        >
            { children }
        </AuthContext.Provider>
    )
}