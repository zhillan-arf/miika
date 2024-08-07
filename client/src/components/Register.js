import React, { useState } from 'react';
import '../assets/register.css';

const REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const Register = ({onBackToLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewUser = async(e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                alert("Password does not match!");
                return;
            }
            const response = await fetch(`${REACT_APP_BACKEND_URI}/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                onBackToLogin();
            } else alert(response.status);

        } catch (err) {
            console.error(`ERROR Register: ${err.message} // ${err.stack}`);
        }
    };
    return (
        <div>
            <form onSubmit={handleNewUser}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </label>
                <button type='submit'>Continue</button>
            </form>
            <button onClick={onBackToLogin}>Back to Login</button>
        </div>
    );
}

export default Register;