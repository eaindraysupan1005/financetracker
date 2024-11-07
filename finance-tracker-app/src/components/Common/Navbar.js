import React, { useState } from 'react';
import './Navbar.css';  // Import the CSS file
import { Link } from 'react-router-dom';  // Use Link from react-router-dom instead of anchor tags

const Navbar = ({ username, userId }) => {
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
          {/* Use Link component from react-router-dom to handle routing */}
          <li><Link to={`/dashboard/${userId}`} className="link">Dashboard</Link></li>
          <li><Link to={`/budgets/${userId}`} className="link">Budgets</Link></li>
          <li><Link to={`/settings/${userId}`} className="link">Settings</Link></li>
        </ul>

        <div className='menu-c'>
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
      </div>
    </nav>
  );
};

export default Navbar;
