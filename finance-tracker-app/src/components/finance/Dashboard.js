import axios from "axios";
import WeeklyReportChart from "./WeeklyReportChart";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import "./Dashboard.css";

const Dashboard = () => {
  const { userId } = useParams();
  const [currentBalance, setCurrentBalance] = useState(0);
  const [latestIncomes, setLatestIncomes] = useState([]);
  const [latestExpenses, setLatestExpenses] = useState([]);
  
  const balanceApi = `http://localhost:8080/balance`;
  const incomeApi = `http://localhost:8080/income/latest`; // API for latest incomes
  const expenseApi = `http://localhost:8080/expense/latest`; // API for latest expenses

  // Fetch the current balance from the backend
  const fetchCurrentBalance = useCallback(async () => {
    try {
      const response = await axios.get(`${balanceApi}/${userId}`);
      setCurrentBalance(response.data);
    } catch (error) {
      console.error("Error fetching current balance:", error);
    }
  }, [userId, balanceApi]);

  // Fetch the latest incomes for the user
  const fetchLatestIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${incomeApi}/${userId}`);
      setLatestIncomes(response.data);
    } catch (error) {
      console.error("Error fetching latest incomes:", error);
    }
  }, [userId, incomeApi]);

  // Fetch the latest expenses for the user
  const fetchLatestExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${expenseApi}/${userId}`);
      setLatestExpenses(response.data);
    } catch (error) {
      console.error("Error fetching latest expenses:", error);
    }
  }, [userId, expenseApi]);

  // Initial fetch and setup polling for balance, latest incomes, and latest expenses
  useEffect(() => {
    fetchCurrentBalance(); // Fetch balance when component mounts
    fetchLatestIncomes(); // Fetch latest incomes
    fetchLatestExpenses(); // Fetch latest expenses

    // Polling interval for automatic updates (e.g., every 10 seconds)
    const intervalId = setInterval(() => {
      fetchCurrentBalance();
      fetchLatestIncomes();
      fetchLatestExpenses();
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchCurrentBalance, fetchLatestIncomes, fetchLatestExpenses]);

  return (
    <div className="dashboard-container">
      <div className="left-column">
        <div className="left-items">
          <div className="balance-heading">
          <i className="fa-solid fa-wallet" style={{fontSize: '25px'}}></i>
          <h4 style={{ color: "white" }}>Total Balance</h4>
          </div>
          <div className="current">
          <p>${currentBalance.toFixed(2)}</p> {/* Display balance */}
          </div>
        </div>

        <div className="left-items">
          <div className="ilatest-head">
            <div className="header-latest"><h4 style={{ color: "white" }}>Latest Incomes</h4></div>
            <div className="icon-l"><i className="fa-solid fa-circle-plus"></i></div>
          </div>
          <div className="latest-incomes">
            {latestIncomes.length > 0 ? (
              latestIncomes.map((income, index) => (
                <div key={income.id} className='latest-income-item'>
                  <div className='latest-category-income'>
                    <div className="latest-circle-icon-ilist mb-3">
                      <i className={income.icon} style={{ color: 'black' }}></i>
                    </div>
                    <div className='latest-income-category'>{income.category}</div>
                  </div>
                  <div className="latest-income-date">
                    {format(new Date(income.date), 'dd MMM yyyy')}
                  </div>
                  <div className='latest-income-amount'>{income.amount} $</div>
                </div>
              ))
            ) : (
              <p>No latest incomes available.</p>
            )}
          </div>
        </div>

        <div className="left-items">
        <div className="ilatest-head">
            <div className="header-latest"><h4 style={{ color: "white" }}>Latest Expenses</h4></div>
            <div className="icon-l"><i className="fa-solid fa-circle-minus"></i></div>
          </div>
          <div className="latest-expenses">
            {latestExpenses.length > 0 ? (
              latestExpenses.map((expense, index) => (
                <div key={expense.id} className='latest-expense-item'>
                  <div className='latest-category-expense'>
                    <div className="latest-circle-icon-expense mb-3">
                      <i className={expense.icon} style={{ color: 'black' }}></i>
                    </div>
                    <div className='latest-expense-category'>{expense.category}</div>
                  </div>
                  <div className="latest-expense-date">
                    {format(new Date(expense.date), 'dd MMM yyyy')}
                  </div>
                  <div className='latest-expense-amount'>{expense.amount} $</div>
                </div>
              ))
            ) : (
              <p>No latest expenses available.</p>
            )}
          </div>
        </div>

      </div>

      <div className="right-column">
        <div className="right-items">
          <WeeklyReportChart userId={userId} /> {/* Pass the user ID here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;