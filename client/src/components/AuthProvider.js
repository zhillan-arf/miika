import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();
const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const AuthProvider = ({ children }) => {
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

    const handleAfterLogin = () => {
        setIsAuth(true);
    }

    const handleLogout = () => {
        setIsAuth(false); // temp
    }
    
    const value = { isAuth, handleAfterLogin, handleLogout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);