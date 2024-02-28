import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/login.css';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_BACKEND_URI}/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            console.log("Retrieved!");
            if (response.ok) {
                history('/aigis');
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