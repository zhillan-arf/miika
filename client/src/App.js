import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider }  from './hooks/AuthProvider.js';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';
import ChatRoom from './components/ChatRoom';
import { DataProvider } from './hooks/DataProvider.js';
import { SocketProvider } from './hooks/SocketProvider.js';

const AuthedApp = () => {
    const [showRegister, setShowRegister] = useState(false);
    const { auth } = useContext(AuthContext);

    const SPA = () => {
        return (
            <DataProvider>
                <SocketProvider>
                    <ChatRoom/>
                </SocketProvider>
            </DataProvider>
        );
    }

    const Gate = () => {
        if (showRegister) {
            return (
                <Register onBackToLogin={() => {setShowRegister(false)}}/>
            );
        } else return (
            <Login onRegister={() => {setShowRegister(true)}}/>
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

const App = () => {
    return (
        <AuthProvider>
            <AuthedApp/>
        </AuthProvider>
    )
}

export default App;