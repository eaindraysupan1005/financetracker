// src/components/Layout/Layout.js
import React from 'react';
import Footer from '../Common/Footer'; // Adjust path as necessary
import './Layout.css';  // Ensure this file is linked correctly

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="header">Header</header>
      <main className="main-content">{children}</main>
      <Footer /> {/* The footer will be rendered after all content */}
    </div>
  );
};

export default Layout;
