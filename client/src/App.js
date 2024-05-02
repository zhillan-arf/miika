import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider, useAuth } from './components/AuthProvider';
import { AuthContext }  from './components/AuthProvider.js';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';
import ChatRoom from './components/ChatRoom';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const App = () => {
    const [auth, setAuth] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

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

    // Remove the token from a cookie
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    const SPA = () => {
        return (
            <AuthContext.Provider value={setAuth}>
                <ChatRoom/>
            </AuthContext.Provider>
        );
    }

    const Gate = () => {
        if (showRegister) {
            return (
                <AuthContext.Provider value={setAuth}>
                    <Register onBackToLogin={() => {setShowRegister(false)}}/>
                </AuthContext.Provider>
            );
        } else return (
            <AuthContext.Provider value={setAuth}>
                <Login onRegister={() => {setShowRegister(true)}}/>
            </AuthContext.Provider>
        );
    }

    return (
            <Router>
                <Routes>
                    <Route path='/aigis' exact element={<Aigis/>}/>
                    <Route path='*' element={auth ? SPA() : Gate()}/>
                </Routes>
            </Router>
    );
}

export default App;