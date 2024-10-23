// src/components/Income.js
import React, { useState } from 'react';
import './Income.css';

const Income = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState('');
    const [amount, setAmount] = useState('');

    const handleBoxClick = (incomeType) => {
       if(incomeType=='Add'){
        setSelectedIncome(incomeType);
        setCategoryModalVisible(true);
       }else{
        setSelectedIncome(incomeType);
        setModalVisible(true);
       }
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
                            <i class="fa-solid fa-wallet"></i>
                            </div>
                            <h5>{incomeType}</h5>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className="modal show modal-dialog-centered" style={{ display: 'block' }} onClick={handleClose}>
                    <div className="modal-dialog income-m">
                        <div className="modal-content income-modal-c">
                            <div className="modal-header">
                                <h5>Add {selectedIncome}</h5>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="cancel-btn" onClick={handleClose}>Cancel</button>
                                    <button type="submit" className="btn set-btn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}  {/* Modal */}



            {/*Add Category Modal */}
            {categoryModalVisible && (
                <div className="modal show" style={{ display: 'block' }} onClick={handleClose}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new Category</h5>
                                <button type="button" className="modalclose" onClick={handleClose}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                        <label htmlFor="amount">Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )} 
            {/*Add Category Modal */}
            

        </div>
    );
};

export default Income;
