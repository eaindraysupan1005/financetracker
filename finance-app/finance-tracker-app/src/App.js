// src/App.js
import './App.css';
import React from "react";
import Layout from './components/Layout/Layout'; // Adjust the path as necessary
import Home from './components/Layout/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Common/Navbar";  // Importing the Navbar
import Budget from "./components/finance/Budget";  // Importing the Budget page

const App = () => {
  const username = 'Eaindray Su Pan';
  return (
    <div className="App">
         <BrowserRouter>
      <Navbar username={username}/>
     <Layout>
     <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/budgets" element={<Budget />} />  {/* Route to Budget */}
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
     </Layout>
      </BrowserRouter>
    </div>

  );
};

export default App;

