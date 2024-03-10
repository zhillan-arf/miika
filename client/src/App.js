import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import AuthLocker from './components/AuthLocker';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';
import ChatRoom from './components/ChatRoom';
import Test from './components/Test';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' exact element={<AuthLocker><Aigis/></AuthLocker>}/>
                    <Route path='/register' exact element={<Register/>}/>
                    <Route path='/login' exact element={<Login/>}/>
                    <Route path='/aigis' exact element={<AuthLocker><Aigis/></AuthLocker>}/>
                    <Route path='/chatroom' exact element={<ChatRoom/>}/>
                    <Route path='/test' exact element={<Test/>}/>
                    <Route path='*' element={<AuthLocker><Aigis/></AuthLocker>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;