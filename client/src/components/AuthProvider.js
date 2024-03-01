import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);
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
                setIsAuth(response.ok);  // Based on response statuds
            } catch (error) {
                setIsAuth(false);
            }
        };
        validateToken();
    }, []);

    const value = { isAuth, setIsAuth };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);