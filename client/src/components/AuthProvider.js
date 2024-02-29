import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async() => {
            try {
                const response = await fetch(`${REACT_APP_BACKEND_URI}/api/verify`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsAuth(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };
        validateToken();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{isAuth}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);