// import logo from './logo.svg';

// import { Route, Routes } from 'react-router-dom';
// import LayoutWithHeader from './components/Layout/LayoutWithHeader';
// import Home from './components/Layout/Home';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




// src/App.js
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Common/Navbar";  // Importing the Navbar
import Budget from "./components/finance/Budget";  // Importing the Budget page

const App = () => {
  const username = 'Eaindray Su Pan';
  return (
    <Router>
      <Navbar username={username}/>  {/* Navbar displayed across pages */}
      <Routes>
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/budgets" element={<Budget />} />  {/* Route to Budget */}
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;

