import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';  // Import the Layout component
import Home from './components/Layout/Home';  // Import Home
import Footer from './components/Common/Footer';//Import Footer
import Login from './components/finance/Login';// import login 
import SignUp from './components/finance/SignUp';
import Budget from './components/finance/Budget';  // Import Budget page
import NavHome from './components/finance/NavHome'; // Import NavHome for Home Page
import Income from './components/finance/Income';
import Profile from './components/finance/Profile';
import Settings from './components/finance/Settings';


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
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          {/* NavHome only on home page */}
          <Route element={<Layout username={username} />}>  {/* Layout for the rest */}

          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/budgets" element={<Budget />} />  {/* Route to Budget */}
          <Route path="/income/:userId/daily" element={<Income />}/>
          <Route path="/settings" element={<Settings/>} />
          <Route path="/profile" element={<Profile/>} />

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
