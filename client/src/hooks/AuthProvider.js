import React, { createContext, useState, useEffect } from "react"

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/verify`, {
                    method: 'GET',
                    credentials: 'include'
                });
                setAuth(response.ok);
            } catch (err) {
                setAuth(false);
            }
        }
        verify();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}