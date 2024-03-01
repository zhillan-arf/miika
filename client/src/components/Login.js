import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider'
import '../assets/login.css';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_BACKEND_URI}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            if (response.ok) {
                setIsAuth(true); 
                navigate('/aigis');
            } else {
                alert(response.status);
            }
        } catch (error) {
            alert("500 internal error!");
        }
    };
    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type='submit'>Continue</button>
            </form>
        </div>
    )
}

export default Login;