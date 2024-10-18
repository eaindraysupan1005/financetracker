//COmponnents/Layout/Home
import React from 'react';
import './Home.css'; // Import the CSS file for styling


const Home = () => {
  return (
   
    <div className="home-container">
    <div className='banner'>
        <div className="home-description">
          <h1>Personal Finance Tracker</h1>
          <p>
            Welcome to BUDGET BEE!!<br></br>Your all-in-one personal finance tracker!! <br></br>
            Our intuitive platform helps you manage your money, <br></br>track spending, and reach your financial goals effortlessly.<br></br> Whether you want to budget, save, or analysis, we've got the tools you need to stay organized and financially fit.
          </p>
        </div>
        <div className="home-image">
          <img src="/home.png" alt="Placeholder" />
        </div>
        </div>      
        <h2> How it Works</h2>  
        <div className='how1'>
          <div className='text'>
            <h2>Dashboard</h2>
            <p>  Our intuitive platform helps you manage your money, <br></br>track spending, and reach your financial goals effortlessly.<br></br> Whether you want to budget, save, or analysis, we've got the tools you need to stay organized and financially fit.
            </p>
          </div>
          <div className='howimage'>
            <img src="./home.png" alt="dashboard"/>
          </div>
        </div>   
      
        </div>  
      
       
          
  );
};

export default Home;
