import React, { useState } from 'react';
import { useAuth } from './AuthProvider'
import '../assets/login.css';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const Login = ({onRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleAfterLogin } = useAuth();

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
            });
            if (response.ok) handleAfterLogin(); 
        } catch (err) {
            alert(`500 internal error!: ${err}`);
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
            <button onClick={onRegister}>Register</button>
        </div>
    )
}

export default Login;