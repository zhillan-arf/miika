import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import AuthLocker from './components/AuthLocker';
import Register from './components/Register';
import Login from './components/Login';
import Aigis from './components/Aigis';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/' exact element={<AuthLocker><Aigis/></AuthLocker>}/>
                    <Route path='/register' exact element={<Register/>}/>
                    <Route path='/login' exact element={<Login/>}/>
                    <Route path='/aigis' exact element={<AuthLocker><Aigis/></AuthLocker>}/>
                    <Route path='*' exact element={<AuthLocker><Aigis/></AuthLocker>}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;