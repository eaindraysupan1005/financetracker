import React, { useState, useEffect } from 'react';
import './Login.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(null);  // State for storing userId
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
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const data = await response.json();
            // Store userId in localStorage
            localStorage.setItem('userId', data.user.id);
            // Update the userId state to trigger a re-render in the parent component
            setUserId(data.user.id);
            console.log("Logged in with userId:", data.user.id);
            // Navigate to the dashboard page
            navigate(`/dashboard/${data.user.id}`);
        }
    } catch (error) {
        setError('An error occurred: ' + error.message);
    } finally {
        setIsLoading(false);
    }
};


    // Use useEffect to log userId after it's updated
    useEffect(() => {
        if (userId) {
            console.log("UserID after update: ", userId);  // Log after state update
            navigate(`/dashboard/${userId}`);  // Navigate to the dashboard page with userId
        }
    }, [userId]);  // This effect runs whenever userId changes

    const color = 'black';
    return (
        <div className="login-container">
            <div className="col-lg-6 d-none d-lg-flex login-image">
                <img src="/Login.png" alt="Login Visual" />
            </div>
            <div className="col-lg-6 col-md-8 col-sm-12 login-form">
                <div className="logo-section logo-login">
                    <img src="/logo.png" alt="Logo" className="logo-img" />
                    <h1 className="logohead">Budget Bee</h1>
                </div>
                <h1 style={{ color }}>{isLoading ? 'Logging in...' : 'Login'}</h1>

                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <form className="login-flex-form" onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="email" className='login-label'>Enter Your Email Address</label>
                        <input
                            className='login-input'
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Email Address'
                            required
                            value={user.email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password" className='login-label'>Enter Your Password</label>
                        <input
                            className='login-input'
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
                        <button type="submit" className='login-submit'>Log In</button>
                    </div>
                    <div className='form-actions'>
                        <button type="button" className='login-btn'><img src="/Google.png" alt="google" style={{ height: '24px', width: '24px' }}></img> Login with Google</button>
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