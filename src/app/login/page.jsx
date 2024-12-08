"use client"

import React, { useState } from 'react';
import "./page.module.css";
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            Email: email,
            Password: password
        }).then((response) => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

            }
            window.location.href = '/';
        }).catch((error) => {
            console.log(error);
        });
    };


    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Giriş Yap</button>
            </form>
        </div>
    );
}

export default LoginPage;