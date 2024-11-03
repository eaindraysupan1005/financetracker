import React, { useState, useEffect, useCallback} from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { userId } = useParams();
    const [currentBalance, setCurrentBalance] = useState(0);
    const balanceApi=`http://localhost:8080/balance`;

 // Fetch the current balance from the backend
const fetchCurrentBalance = useCallback(async () => {
    try {
        const response = await axios.get(`${balanceApi}/${userId}`);
        setCurrentBalance(response.data);
    } catch (error) {
        console.error("Error fetching current balance:", error);
    }
}, [userId,balanceApi]);

// Initial fetch and set up polling to auto-refresh balance every 10 seconds
useEffect(() => {
    fetchCurrentBalance(); // Fetch balance when component mounts

    // Polling interval for automatic updates (e.g., every 10 seconds)
    const intervalId = setInterval(fetchCurrentBalance, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
}, [fetchCurrentBalance]);

    return(
        <div className='dashboard-container'>
            <div className='left-column'>
            <div className='left-items'>
            <h1 style={{color: 'white'}}>Total Balance</h1>
            <p>${currentBalance.toFixed(2)}</p> {/* Display balance */}
            </div>
            <div className='left-items'>

            </div>
            <div className='left-items'>
            

            </div>
            </div>
            <div className='right-column'>
            <div className='right-items'>

            </div>
            <div className='right-items'>

            </div>
            </div>
        </div>

    );

};
export default Dashboard;