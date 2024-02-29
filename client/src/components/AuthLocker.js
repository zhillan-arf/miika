import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AuthLocker = ({ children }) => {
    const { isAuth } = useAuth();
    if (!isAuth) return <Navigate to='/login' />;
    return children;
}

export default AuthLocker;