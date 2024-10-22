// src/components/Income.js
import React, { useState } from 'react';
import './Income.css';

const Income = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState('');
    const [amount, setAmount] = useState('');

    const handleBoxClick = (incomeType) => {
        setSelectedIncome(incomeType);
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
        setAmount('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the amount submission
        console.log(`Amount for ${selectedIncome}: ${amount}`);
        handleClose();
    };

    return (
        <div className="container mt-5">
            <p className='income-head'>Choose Category</p>
            <div className="row-income">
                {['Salary', 'Freelance', 'Pocket Money', 'Add'].map((incomeType, index) => (
                    <div
                        key={index}
                        className="col-md-3 d-flex justify-content-start"
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
                            <i class="fa-solid fa-wallet"></i>
                            </div>
                            <h5>{incomeType}</h5>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className="modal show" style={{ display: 'block' }} onClick={handleClose}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add {selectedIncome}</h5>
                                <button type="button" className="modalclose" onClick={handleClose}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Income;
