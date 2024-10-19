// src/components/SignUp.js
import React from 'react';
import './Login.css'; // Reusing the same CSS file for styling

const SignUp = () => {
    const color = 'black'; // You can change this if needed
    return (
        <div className="login-container">
            <div className="col-lg-6 col-md-8 col-sm-12 login-form">
                <div className="logo-section">
                    <img src="/logo.png" alt="Logo" className="logo" />
                    <h1 className="logohead">Budget Bee</h1>
                </div>
                <h1 style={{ color }}>Sign Up</h1>
                <form className="flex-form">
                    <div className="form-group">
                        <label htmlFor="name">Enter Your Name</label>
                        <input type="text" id="name" placeholder='Name' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Enter Your Email Address</label>
                        <input type="email" id="email" placeholder='Email Address' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" id="password" placeholder='Password' required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="retype-password">Retype Your Password</label>
                        <input type="password" id="retype-password" placeholder='Retype Password' required />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className='form-actions'>
                        <button type="button">
                            <img src="/Google.png" alt="Google" style={{ height: '24px', width: '24px' }} />
                            Sign Up with Google
                        </button>
                    </div>
                </form>
                <div>
                    <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex login-image">
                <img src="/Login.png" alt="Sign Up Visual" />
            </div>
        </div>
    );
};

export default SignUp;
