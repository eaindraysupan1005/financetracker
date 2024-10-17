// src/components/Navbar.js
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
        <h1>Finance Tracker</h1>
      </div>

      {/* Links */}
      <ul className="nav-links">
        <li><a href="/dashboard" className="link">Dashboard</a></li>
        <li><a href="/budgets" className="link">Budgets</a></li>
        <li><a href="/settings" className="link">Settings</a></li>
      </ul>

      {/* Currency Dropdown */}
      <div className="currency">
        <label htmlFor="currency">Currency: </label>
        <select id="currency" value={currency} onChange={handleCurrencyChange} className="dropdown">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="THB">THB</option>
        </select>
      </div>

      {/* Profile Section */}
      <div className="profile">
        <span>{username}</span>
        {/* You can add a profile picture or menu later */}
      </div>
    </nav>
  );
};

export default Navbar;
