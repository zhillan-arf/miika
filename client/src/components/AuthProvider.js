import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);
const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const AuthProvider = () => {
    const [isAuth, setIsAuth ] = useState(false);

    useEffect(() => {
        const validateToken = async() => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/verify`, {
                    method: 'GET',
                    credentials: 'include'
                });
                setIsAuth(response.ok);
            } catch (err) {
                setIsAuth(false);
            }
        };
        validateToken();
    }, []);

    const handleLogout = () => {
        setIsAuth(false); // temp
    }
    const value = { isAuth, handleLogout };

    return (
        <AuthContext.Provider value={value}/>
    );
};

export const useAuth = () => useContext(AuthContext);