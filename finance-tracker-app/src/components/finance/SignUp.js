// src/components/SignUp.js
import React, { useState } from 'react';
import './SignUp.css'; // New CSS file for Sign-Up
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        retypePassword: ''
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
        if (name === "retypePassword" && value !== user.password) {
            setError("Passwords do not match!");
        } else {
            setError(null); // Clear the error if they match
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== user.retypePassword) {
            setError("Passwords do not match!");
            return;
        }
        
        try {
            setIsLoading(true);
            const response = await fetch('https://vigilant-funicular-v669vqwrqqww24pq-8080.app.github.dev/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                }),
            });

            if (response.ok) {
                console.log('Signup successful');
                navigate('/login'); // Redirect to login page
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed! Please try again.');
            }
        } catch (error) {
            setError('An error occurred: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="col-lg-6 col-md-8 col-sm-12 signup-form">
                <div className="logo-section logo-signup">
                    <img src="/logo.png" alt="Logo" className="logo-signup" />
                    <h1 className="logohead">Budget Bee</h1>
                </div>
                <h1>{isLoading ? 'Signing up...' : 'Sign Up'}</h1>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <form className="signup-flex-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className='signup-label'>Enter Your Name</label>
                        <input
                            className='signup-input'
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Name'
                            required
                            value={user.name}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='signup-label'>Enter Your Email Address</label>
                        <input
                        className='signup-input'
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email Address'
                            required
                            value={user.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='signup-label'>Enter Your Password</label>
                        <input
                        className='signup-input'
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            required
                            value={user.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="retype-password" className='signup-label'>Retype Your Password</label>
                        <input
                        className='signup-input'
                            type="password"
                            id="retype-password"
                            name="retypePassword"
                            placeholder='Retype Password'
                            required
                            value={user.retypePassword}
                            onChange={handleInput}
                        />
                        {error && user.retypePassword && <p className="error-message">{error}</p>} {/* Display error message for password mismatch */}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className='signup-submit'>Sign Up</button>
                    </div>
                    <div className='form-actions'>
                        <button type="button" className='google-signup'>
                            <img src="/Google.png" alt="Google" style={{ height: '24px', width: '24px' }} />
                            Sign Up with Google
                        </button>
                    </div>
                </form>
                <div>
                    <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex signup-image">
                <img src="/Login.png" alt="Sign Up Visual" />
            </div>
        </div>
    );
};

export default SignUp;