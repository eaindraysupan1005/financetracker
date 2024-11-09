import './App.css';
import React,{useState,useEffect  } from "react";
import {  Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';  // Import the Layout component
import Home from './components/Layout/Home';  // Import Home
import Footer from './components/Common/Footer';//Import Footer
import Login from './components/finance/Login';// import login 
import SignUp from './components/finance/SignUp';
import Dashboard from './components/finance/Dashboard';
import Budget from './components/finance/Budget';  // Import Budget page
import NavHome from './components/finance/NavHome'; // Import NavHome for Home Page
import Income from './components/finance/Income';
import Expense from './components/finance/Expense';//Import Expense
import Profile from './components/finance/Profile';
import Settings from './components/finance/Settings';


const App = () => {
  const [username, setUsername] = useState('');
  const location = useLocation();
  const userId = location?.state?.userId;

  const [mainUserId, setMainUserId] = useState(userId);
  
  useEffect(() => {
    // Retrieve username and userId from localStorage on initial load
    const storedUsername = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUsername) {
      setUsername(storedUsername); // Update the username state
    }
    
    if (storedUserId) {
      setMainUserId(storedUserId); // Update the mainUserId state
    }
  }, [userId]); // Reload username if userId changes


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <NavHome />
              <Home />
            </>
          } />
          <Route path="/login" element={<Login setUserId={mainUserId} />} />  {/* Pass setUserId to Login */}
          <Route path="/signup" element={<SignUp/>}/>
          {/* NavHome only on home page */}
          <Route element={<Layout username={username} userId={mainUserId}/>}>  {/* Layout for the rest */}

          <Route path="/dashboard/:userId" element={<Dashboard/>} />
          <Route path="/budgets/:userId" element={<Budget />} />  {/* Route to Budget */}
          <Route path="/income/:userId" element={<Income />}/>
          <Route path="/expense/:userId" element={<Expense />}/>
          <Route path="/settings/:userId" element={<Settings/>} />
          <Route path="/profile/:userId" element={<Profile/>} />

          </Route>
        </Routes>
        <Footer />
    </div>
  );
};

export default App;