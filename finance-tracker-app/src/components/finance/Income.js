// src/components/Income.js
import React, { useState, useEffect, useCallback } from 'react';
import './Income.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Income = () => {
    const { userId } = useParams();  // Retrieve the userId from the URL
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [incomeList, setIncomeList] = useState([]);
    const [viewType, setViewType] = useState('daily'); // Default to daily
    const [error, setError] = useState(null);
    const icons = ['fa-solid fa-wallet', 'fa-solid fa-briefcase', 'fa-solid fa-coins', 'fa-solid fa-plus-circle'];
    const incomeApi = `https://gloomy-spooky-goblin-4jj57w6vwvv927gp6-8080.app.github.dev/api/income`;

    // Function to fetch income data based on the view type
    const fetchIncomeData = useCallback(async (type) => {
        try {
            const response = await axios.get(`${incomeApi}/${type}/${userId}`);
            setIncomeList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching income data:', error);
        }
        console.log(`Fetching income data for userId: ${userId}, type: ${type}`);
    }, [userId, incomeApi]);
    
    useEffect(() => {
        fetchIncomeData(viewType); // Fetch data when viewType changes
    }, [viewType, fetchIncomeData]);

    const handleBoxClick = (incomeType) => {
        if (incomeType === 'Add') {
            setSelectedIncome(incomeType);
            setCategoryModalVisible(true);
        } else {
            setSelectedIncome(incomeType);
            setModalVisible(true);
        }
    };

    const handleClose = () => {
        setModalVisible(false);
        setCategoryModalVisible(false);
        setAmount('');
        setCategory('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Amount for ${selectedIncome}: ${amount}`);
        console.log(`Category: ${category}`);
        handleClose();
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${incomeApi}/${userId}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            setIncomeList(incomeList.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <p className='income-head'>Choose Category</p>
            <div className="row-income">
                {['Salary', 'Freelance', 'Pocket Money', 'Add'].map((incomeType, index) => (
                    <div
                        key={index}
                        className="col-md-3 d-flex justify-content-center"
                        onClick={() => handleBoxClick(incomeType)}
                        style={{ cursor: 'pointer', marginBottom: '20px' }}
                    >
                        <div
                            className="income-card text-center p-4"
                            style={{
                                width: '150px',
                                height: '170px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div className="circle-icon mb-3">
                                <i className={icons[index]} style={{ color: 'black' }}></i>
                            </div>
                            <h5>{incomeType}</h5>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding income */}
            {modalVisible && (
                <div className="modal show" style={{ display: 'block' }} onClick={handleClose}>
                    <div className="modal-dialog modal-dialog-centered income-m">
                        <div className="modal-content income-modal-c">
                            <div className="modal-header">
                                <h5>Add {selectedIncome}</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body income-body">
                                    <div className="income-form">
                                        <div className='form-items-income'>
                                            <label htmlFor="amount">Amount: </label>
                                            <input
                                                type="text"
                                                className="form-control income-inputtext"
                                                id="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer income-mfoot">
                                    <button type="button" className="income-cbtn" onClick={handleClose}>Cancel</button>
                                    <button type="submit" className="btn income-addbtn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {categoryModalVisible && (
                <div className="modal show" style={{ display: 'block' }} onClick={handleClose}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Category</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body income-body">
                                    <div className="income-form">
                                        <div className='form-items-income'>
                                            <label htmlFor="category">Enter Category Name: </label>
                                            <input
                                                type="text"
                                                className="form-control income-inputtext"
                                                id="category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='form-items-income'>
                                            <label htmlFor="amount">Enter Amount: </label>
                                            <input
                                                type="text"
                                                className="form-control income-inputtext"
                                                id="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer income-mfoot">
                                    <button type="button" className="income-cbtn" onClick={handleClose}>Cancel</button>
                                    <button type="submit" className="btn income-addbtn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Income List */}
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <button onClick={() => setViewType('daily')}>Daily</button>
                    <button onClick={() => setViewType('weekly')}>Weekly</button>
                    <button onClick={() => setViewType('monthly')}>Monthly</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {incomeList.map(income => (
                        <div key={income.id} className='income-lists'>
                            <p>Category: {income.category}</p>
                            <p>Amount: ${income.amount}</p>
                            <p>Date: {new Date(income.date).toLocaleDateString()}</p>
                            <button onClick={() => handleDelete(income.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Income;
