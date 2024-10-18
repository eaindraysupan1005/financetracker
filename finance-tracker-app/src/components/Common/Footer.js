// src/components/Common/Footer.js
import React from 'react';
import './Footer.css';  // Optional: Import a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Finance Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
