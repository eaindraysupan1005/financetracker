import React from 'react';
import './NavHome.css';  // Import the CSS file

const NavHome = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className='logo-title'>Budget Bee</h1>
      </div>

      <div className='main-nav'>
        {/* Buttons */}
        <a href ="/login" className='nav-button login'>Login</a>
        <a href ="/signup" className='nav-button signup'>Sign Up</a>
      </div>
    </nav>
  );
};

export default NavHome;
