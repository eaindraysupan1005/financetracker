import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';  // Import the Layout component
import Home from './components/Layout/Home';  // Import Home
import Footer from './components/Common/Footer';
import Budget from './components/finance/Budget';  // Import Budget page
import NavHome from './components/finance/NavHome'; // Import NavHome for Home Page

const App = () => {
  const username = 'Eaindray Su Pan';

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <NavHome />
              <Home />
            </>
          } />
          {/* NavHome only on home page */}
          <Route element={<Layout username={username} />}>  {/* Layout for the rest */}

          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/budgets" element={<Budget />} />  {/* Route to Budget */}
          <Route path="/settings" element={<div>Settings Page</div>} />

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
