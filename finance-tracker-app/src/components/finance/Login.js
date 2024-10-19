// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch('https://your-api-url.com/login', { // Replace with your login API URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // You can store user data in local storage or context here
                navigate('/dashboard'); // Redirect to a dashboard or home page
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed! Please try again.');
            }
        } catch (error) {
            setError('An error occurred: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const color = 'black';
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
                <h1 style={{ color }}>{isLoading ? 'Logging in...' : 'Login'}</h1>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <form className="flex-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Enter Your Email Address</label>
                        <input
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
                        <label htmlFor="password">Enter Your Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Password'
                            required
                            value={user.password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Log In</button>
                    </div>
                    <div className='form-actions'>
                        <button type="button"><img src="/Google.png" alt="google" style={{ height: '24px', width: '24px' }}></img> Login with Google</button>
                    </div>
                </form>
                <div>
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;