import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';
import ChatRoom from './components/ChatRoom';


const AuthedApp = () => {
    const { isAuth, handleLogout } = useAuth();
    const [showRegister, setShowRegister] = useState(false);
    const SPA = () => {
        return (<ChatRoom onLogout={() => {handleLogout()}}/>);
    }
    const Gate = () => {
        if (showRegister) {
            return (<Register onBackToLogin={() => {setShowRegister(false)}}/>);
        } else return (<Login onRegister={() => {setShowRegister(true)}}/>);
    }

    return (
        <Router>
            <Routes>
                <Route path='/aigis' exact element={<Aigis/>}/>
                <Route path='*' element={isAuth ? SPA() : Gate()}/>
            </Routes>
        </Router>
    );
}

const App = () => {
    return (
        <AuthProvider>
            <AuthedApp/>
        </AuthProvider>
    );
}

export default App;