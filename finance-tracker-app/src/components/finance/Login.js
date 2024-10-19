// src/components/Login.js
import React from 'react';
import './Login.css'; // Make sure to create this CSS file

const Login = () => {
    return (
        <div className="login-container">
            <div className="col-lg-6 col-md-8 col-sm-12 login-form">
                <h1>Login</h1>
                <form>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" className="login-button">Log In</button>
                    <button type="button" className="google-button">Login with Google</button>
                </form>
            </div>
            <div className="col-lg-6 d-none d-lg-flex login-image">
                <img src="/path/to/your/image.jpg" alt="Login Visual" />
            </div>
        </div>
    );
};

export default Login;
