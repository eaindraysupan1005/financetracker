// src/App.js
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Common/Navbar';
import Layout from './components/Layout/Layout'; // Adjust the path as necessary
import Home from './components/Layout/Home';

const App = () => {
  const username = 'Eaindray Su Pan';

  return (
    <div className="App">
         <BrowserRouter>
      <Navbar username={username}/>
     <Layout>
     <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
     </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
