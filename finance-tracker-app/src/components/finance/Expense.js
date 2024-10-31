// src/components/Expense.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Expense.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Expense = () => {
    const { userId } = useParams();  // Retrieve the userId from the URL
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [expenseList, setExpenseList] = useState([]);
    const [viewType, setViewType] = useState('daily'); // Default to daily
    const [error, setError] = useState(null);
    const icons = ['fa-solid fa-utensils', 'fa-solid fa-cart-shopping', 'fa-solid fa-car', 'fa-solid fa-film', 'fa-solid fa-plus-circle'];
    const expenseApi = `http://localhost:8080/expense`;
    const dailyButtonRef = useRef(null);

    // const [icons, setIcons] = useState([
    //     { class: "fas fa-graduation-cap fa-2x", active: false },
    //     { class: "fas fa-tshirt fa-2x", active: false },
    //     { class: "fas fa-home fa-2x", active: false },
    //     { class: "fa-solid fa-dollar fa-2x", active: false },
    //     { class: "fa-solid fa-heart-pulse fa-2x", active: false },
    //     { class: "fa-solid fa-circle-dollar-to-slot fa-2x", active: false },
    //     { class: "fas fa-receipt fa-2x", active: false },
    //     { class: "fa-solid fa-hand-holding-dollar fa-2x", active: false },
    //     { class: "fas fa-users fa-2x", active: false },
    //     { class: "fas fa-table-tennis fa-2x", active: false },
    //   ]);

    // Function to fetch expense data based on the view type
    const fetchExpenseData = useCallback(async (type) => {
        try {
            const response = await axios.get(`${expenseApi}/${type}/${userId}`);
            setExpenseList(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching expense data:', error);
        }
        console.log(`Fetching expense data for userId: ${userId}, type: ${type}`);
    }, [userId, expenseApi]);

    useEffect(() => {
        fetchExpenseData(viewType); // Fetch data when viewType changes
    }, [viewType, fetchExpenseData]);

    useEffect(() => {
        // Set focus on the Daily button when the component mounts
        if (dailyButtonRef.current) {
            dailyButtonRef.current.focus();
        }
    }, []);

    const handleBoxClick = (expenseType) => {
        if (expenseType === 'Add') {
            setSelectedExpense(expenseType);
            setCategoryModalVisible(true);
        } else {
            setSelectedExpense(expenseType);
            setModalVisible(true);
        }
    };

    const handleClose = () => {
        setModalVisible(false);
        setCategoryModalVisible(false);
        setAmount('');
        setCategory('');
    };

    const saveExpense = async () => {
        try {
            const expenseData = {
                category: selectedExpense,
                amount: parseFloat(amount),
                date: new Date().toISOString().split('T')[0], // Set to today's date in YYYY-MM-DD format
            };
            const response = await axios.post(`${expenseApi}/add/${userId}`, expenseData);

            if (response.status === 201) {
                setExpenseList(prevList => [...prevList, response.data]); // Update the list with the new expense
                handleClose(); // Close the modal after saving
            }
        } catch (error) {
            console.error('Error saving expense:', error);
            setError("Failed to save expense");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(selectedExpense === 'Add'){
            saveExpense(category);
        }else{
            saveExpense(selectedExpense);
        }
        
        
        console.log(`Amount for ${selectedExpense}: ${amount}`);
        console.log(`Category: ${category}`);
        handleClose();
    };

    // const handleDelete = async (id) => {
    //     try {
    //         const response = await axios.delete(`${expenseApi}/${userId}/${id}`);
    //         if (!response.ok) {
    //             throw new Error('Failed to delete item');
    //         }
    //         setExpenseList(expenseList.filter((item) => item.id !== id));
    //     } catch (error) {
    //         setError(error.message);
    //         console.log(error);
    //     }
    // };

    return (
        <div className="expense-container mt-5">
            <p className='expense-head'>Choose Category</p>
            <div className="row-expense">
                {['Food', 'Shopping', 'Transportation', 'Entertainment', 'Add'].map((expenseType, index) => (
                    <div key={index} className='expense-card-container'>
                        <div className="expense-card text-center p-4" onClick={() => handleBoxClick(expenseType)}>
                            <h5 className='expense-type'>{expenseType}</h5>
                            <div className="circle-icon-e mb-3">
                                <i className={icons[index]} style={{ color: 'black' }}></i>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for adding expense */}
            {modalVisible && (
                <div className="modal-overlay" onClick={handleClose}>
                    <div className="modal show" style={{ display: 'block' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-dialog modal-dialog-centered expense-m">
                            <div className="modal-content expense-modal-c">
                                <div className="modal-header">
                                    <h5 className='expense-heading'>Add {selectedExpense}</h5>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body expense-body">
                                        <div className="expense-form">
                                            <div className='form-items-expense'>
                                                <label htmlFor="amount">Amount: </label>
                                                <input
                                                    type="text"
                                                    className="form-control expense-inputtext"
                                                    id="amount"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer expense-mfoot">
                                        <button type="button" className="expense-cbtn" onClick={handleClose}>Cancel</button>
                                        <button type="submit" className="btn expense-addbtn">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {categoryModalVisible && (
                <div className="modal-overlay" onClick={handleClose}>
                    <div className="modal show" style={{ display: 'block' }} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="expense-heading">Add new Category</h5>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body expense-body">
                                        <div className="expense-form category-form-e">
                                            <div className='form-items-category'>
                                                <label htmlFor="category" className='form-head'>Enter Category Name: </label>
                                                <input
                                                    type="text"
                                                    className="form-control expense-inputtext"
                                                    id="category"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-items-category icons'>
                                            <label htmlFor="icon" className='form-head'>Choose Icon: </label>
                                                <div className='icon-container'>
                                                <i className="fas fa-graduation-cap fa-2x"></i>
                                                <i className='fas fa-tshirt fa-2x'></i>
                                                <i className='fas fa-home fa-2x'></i>
                                                <i className='fa-solid fa-dollar fa-2x'></i>
                                                <i className='fa-solid fa-heart-pulse fa-2x'></i>
                                                </div>
                                                <div className='icon-container'>
                                                <i className="fa-solid fa-circle-dollar-to-slot fa-2x"></i>
                                                <i className='fas fa-receipt fa-2x'></i>
                                                <i className='fa-solid fa-hand-holding-dollar fa-2x'></i>
                                                <i className='fas fa-users fa-2x'></i>
                                                <i className='fas fa-table-tennis fa-2x'></i>
                                                </div>
                                            </div>
                                            <div className='form-items-category '>
                                                <label htmlFor="amount" className='form-head' >Enter Amount: </label>
                                                <input
                                                    type="text"
                                                    className="form-control expense-inputtext"
                                                    id="amount"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer expense-mfoot">
                                        <button type="button" className="expense-cbtn" onClick={handleClose}>Cancel</button>
                                        <button type="submit" className="btn expense-addbtn">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Expense List */}
            <div>
                <div className='buttongroup' style={{ marginBottom: '20px' }}>
                    <button ref={dailyButtonRef} onClick={() => setViewType('daily')} className='filter-expense' id="expensedaily">Daily</button>
                    <button onClick={() => setViewType('weekly')} className='filter-expense'>Weekly</button>
                    <button onClick={() => setViewType('monthly')} className='filter-expense'>Monthly</button>
                </div>

                <div className='expense-lists'>
                    {expenseList.map(expense => (
                        <div key={expense.id} className='expense-item'>
                            <div className="circle-icon-elist mb-3">
                                <i className="{expense.icon}" style={{ color: 'black' }}></i>
                            </div>
                            <div className='expense-category'>{expense.category}</div>
                            <div className='expense-amount'>${expense.amount}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Expense;