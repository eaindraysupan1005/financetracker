// src/components/Login.js
import React from 'react';
import './Login.css'; // Make sure to create this CSS file

const Login = () => {
    const color='black';
    return (
        <div className="login-container">
            <div className="col-lg-6 d-none d-lg-flex login-image">
                <img src="/Login.png" alt="Login Visual" />
            </div>
            <div className="col-lg-6 col-md-8 col-sm-12 login-form">
                <div className="logo-section">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <h1 className="logohead">Budget Bee</h1>
                </div>
                <h1 style={{color}}>Login</h1>
                <form className="flex-form">
                    <div className="form-group">
                        <label htmlFor="email">Enter Your Email Address</label>
                        <input type="email" id="email" placeholder='Email Address' required />
                    </div>
                    <div className="form-group">
                       <label htmlFor="password">Enter Your Password</label>
                        <input type="password" id="password" placeholder='Password' required />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Log In</button>
                    </div>
                    <div className='form-actions'>
                        <button type="button"><img src="/Google.png" alt="google" style={{height: '24px', width: '24px',}}></img> Login with Google</button>
                    </div>
                </form>
                <div>
                    <p>Don't have an account? <a href ="/signup">Sign Up</a></p>
                </div>
            </div>

        </div>
    );
};

export default Login;
