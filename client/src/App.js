import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from './components/AuthProvider';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';
import ChatRoom from './components/ChatRoom';

const App = () => {
    const { isAuth, setIsAuth } = useAuth();
    const SPA = () => <ChatRoom onLogout={() => {setIsAuth(false)}}/>;
    const Gate = () => {
        const [showRegister, setShowRegister] = useState(false);

        if (showRegister) return <Register  onBackToLogin={() => {setShowRegister(false)}}/>;
        return <Login onRegister={() => {setShowRegister(true)}}/>
    }

    return (
        <Router>
            <Routes>
                <Route path='/aigis' exact element={<Aigis/>}/>
                <Route path='*' element={isAuth ? SPA : Gate}/>
            </Routes>
        </Router>
    );
}

export default App;