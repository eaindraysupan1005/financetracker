import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const Navbar = ({ username, userId }) => {
  // to select currency
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <h1 className="logo-title">Budget Bee</h1>
      </div>

      <div className="main-nav">
        {/* Links */}
        <ul className="nav-links">
          <li>
            <NavLink
              to={`/dashboard/${userId}`}
              className="link"
              activeClassName="active-link"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/budgets/${userId}`}
              className="link"
              activeClassName="active-link"
            >
              Budgets
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/settings/${userId}`}
              className="link"
              activeClassName="active-link"
            >
              Settings
            </NavLink>
          </li>
        </ul>

        <div className="menu-c">
          {/* Currency Dropdown */}
          <div className="currency">
            <label htmlFor="currency"></label>
            <select
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="dropdown"
            >
              <option value="USD" className="dropdown-option">
                USD
              </option>
              <option value="EUR" className="dropdown-option">
                EUR
              </option>
              <option value="THB" className="dropdown-option">
                THB
              </option>
            </select>
          </div>

          {/* Profile Section */}
          <button className="profile">
            <i className="fas fa-user-circle profile-icon"></i>
            <NavLink to={`/profile/${userId}`} className="profile-link">
              {username}
            </NavLink>
          </button>
          {/* You can add a profile picture or menu later */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
