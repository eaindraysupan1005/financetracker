import React, { useState } from 'react';
import './Navbar.css';  // Import the CSS file


const Navbar = ({ username }) => { 
  // to select currency
  const [currency, setCurrency] = useState('USD');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
      <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className='logo-title'>Budget Bee</h1>
      </div>

      <div className='main-nav'>
        {/* Links */}
      <ul className="nav-links">
        <li><a href="/dashboard" className="link">Dashboard</a></li>
        <li><a href="/budgets" className="link">Budgets</a></li>
        <li><a href="/settings" className="link">Settings</a></li>
      </ul>

      {/* Currency Dropdown */}
      <div className="currency">
        <label htmlFor="currency"></label>
        <select id="currency" value={currency} onChange={handleCurrencyChange} className="dropdown">
          <option value="USD" className='dropdown-option'>USD</option>
          <option value="EUR" className='dropdown-option'>EUR</option>
          <option value="THB" className='dropdown-option'>THB</option>
        </select>
      </div>

      {/* Profile Section */}
      <button className="profile">
            <i className="fas fa-user-circle profile-icon"></i>
            <a href='/profile' className='profile-link'>{username}</a>
          </button>
        {/* You can add a profile picture or menu later */}
      
      </div>
    </nav>
  );
};

export default Navbar;
