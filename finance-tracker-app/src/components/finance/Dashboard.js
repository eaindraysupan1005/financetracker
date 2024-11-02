import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { userId } = useParams();

    return(
        <div className='dashboard-container'>
            <div className='left-column'>
            <div className='left-items'>

            </div>
            <div className='left-items'>

            </div>
            <div className='left-items'>
                <h1>Current Balance</h1>

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