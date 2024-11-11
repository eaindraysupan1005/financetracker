// src/components/Expense.js
import axios from "axios";
import { format } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Expense.css";

const Expense = () => {
  const { userId } = useParams(); // Retrieve the userId from the URL
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); // For editing expense
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [viewType, setViewType] = useState("daily"); // Default to daily
  const [error, setError] = useState(null);
  const icons = [
    "fa-solid fa-utensils",
    "fa-solid fa-film",
    "fa-solid fa-car",
    "fa-solid fa-cart-shopping",
    "fa-solid fa-plus-circle",
  ];
  const expenseApi = `http://localhost:8080/expense`;
  const dailyButtonRef = useRef(null);
  const categoryIcons = [
    "fas fa-graduation-cap",
    "fas fa-tshirt",
    "fas fa-home",
    "fa-solid fa-dollar",
    "fa-solid fa-heart-pulse",
    "fa-solid fa-circle-dollar-to-slot",
    "fas fa-receipt",
    "fa-solid fa-hand-holding-dollar",
    "fas fa-users",
    "fas fa-table-tennis",
  ];
  const [selectedIcon, setSelectedIcon] = useState(categoryIcons[0]); // Default icon

  // Function to fetch expense data based on the view type
  const fetchExpenseData = useCallback(
    async (type) => {
      try {
        const response = await axios.get(`${expenseApi}/${type}/${userId}`);
        setExpenseList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
      console.log(`Fetching expense data for userId: ${userId}, type: ${type}`);
    },
    [userId, expenseApi]
  );

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
    if (expenseType === "Add") {
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
    setEditModalVisible(false);
    setAmount("");
    setCategory("");
    setError(null); // Clear error message on close
  };

  const saveExpense = async (categoryName) => {
    try {
      const expenseData = {
        category: categoryName,
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0], // Set to today's date in YYYY-MM-DD format
        icon: selectedIcon,
      };
      const response = await axios.post(
        `${expenseApi}/add/${userId}`,
        expenseData
      );

      if (response.status === 201) {
        setExpenseList((prevList) => [...prevList, response.data]); // Update the list with the new expense
        handleClose(); // Close the modal after saving
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Set the error message from the backend if available
        setError("Your Total Expense is larger than Total Expense!");
      } else if (error.response && error.response.status === 400) {
        setError("Expense Cannot be Zero!!");
      } else {
        setError("Failed to save expense");
      }
      console.error("Error saving expense:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedExpense === "Add") {
      saveExpense(category);
    } else {
      saveExpense(selectedExpense);
    }
    console.log(`Amount for ${selectedExpense}: ${amount}`);
    console.log(`Category: ${category}`);
    handleClose();
  };

  // Handle icon selection in the modal
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await axios.delete(
        `${expenseApi}/${userId}/${expenseId}`
      );
      if (response.status === 200) {
        setExpenseList(expenseList.filter((item) => item.id !== expenseId));
      }
    } catch (error) {
      // Log full error response
      console.error("Error response:", error.response);
      setError("Failed to delete Expense");
    }
  };

  const handleEditExpense = (expense) => {
    setAmount("");
    setCategory(expense.category);
    setSelectedExpense(expense.id); // Store the income ID for editing
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedExpense = {
        amount: parseFloat(amount),
        category: category,
        id: selectedExpense,
      };

      const response = await axios.put(
        `${expenseApi}/update/${userId}`,
        updatedExpense
      );
      if (response.status === 200) {
        setExpenseList((prevList) =>
          prevList.map((item) =>
            item.id === selectedExpense ? response.data : item
          )
        );
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Set the error message from the backend if available
        setError("Expense cannot be Zero!!");
        setEditModalVisible(false);
      } else {
        setError("Failed to update Expense");
        console.error("Error updating Expense:", error);
        setEditModalVisible(false);
      }
    }
  };

  return (
    <div className="expense-container mt-5">
      {/* Error Alert Box */}
      {error && (
        <div className="error-alert">
          <div className="alert-content">
            <h5 style={{ fontWeight: "bold", color: "red" }}>Warning!!</h5>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Close</button>
          </div>
        </div>
      )}

      <p className="expense-head">Choose Category</p>
      <div className="row-expense">
        {["Food", "Entertainment", "Transportation", "Shopping", "Add"].map(
          (expenseType, index) => (
            <div
              key={index}
              className="col-md-2 d-flex justify-content-start"
              style={{ cursor: "pointer", marginBottom: "20px" }}
            >
              <div
                className="expense-card text-center"
                onClick={() => {
                  handleBoxClick(expenseType);
                  handleIconClick(icons[index]);
                }}
              >
                <h5 className="expense-type">{expenseType}</h5>
                <div className="circle-icon-e">
                  <i className={icons[index]} style={{ color: "black" }}></i>
                </div>

              </div>

            )}

            <p className='expense-head'>Choose Category</p>
            <div className="row-expense">
                {['Food', 'Entertainment', 'Transportation', 'Shopping', 'Add'].map((expenseType, index) => (
                    <div key={index} className='col-md-2 d-flex justify-content-start' style={{ cursor: 'pointer', marginBottom: '20px' }} >
                        <div className="expense-card text-center" onClick={() => { handleBoxClick(expenseType); handleIconClick(icons[index]); }}>
                            <h5 className='expense-type'>{expenseType}</h5>
                            <div className="circle-icon-e">
                                <i className={icons[index]} style={{ color: 'black' }}></i>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
          )
        )}
      </div>

      {/* Modal for adding expense */}
      {modalVisible && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className="modal show"
            style={{ display: "block" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog modal-dialog-centered expense-m">
              <div className="modal-content expense-modal-c">
                <div className="modal-header">
                  <h5 className="expense-heading">Add {selectedExpense}</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body expense-body">
                    <div className="expense-form">
                      <div className="form-items-expense">
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
                    <button
                      type="button"
                      className="expense-cbtn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn expense-addbtn">
                      Add
                    </button>
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
          <div
            className="modal show"
            style={{ display: "block" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="expense-heading">Add new Category</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body expense-body">
                    <div className="expense-form category-form-e">
                      <div className="form-items-category">
                        <label htmlFor="category" className="form-head">
                          Enter Category Name:{" "}
                        </label>
                        <input
                          type="text"
                          className="form-control expense-inputtext"
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-items-category icons">
                        <label htmlFor="icon" className="form-head">
                          Choose Icon:{" "}
                        </label>
                        <div className="icon-container">
                          {categoryIcons.map((icon, index) => (
                            <div className="icon-griditems">
                              <i
                                key={index}
                                className={`${icon} fa-2x`}
                                style={{
                                  color:
                                    selectedIcon === icon ? "blue" : "black",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleIconClick(icon)}
                              ></i>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-items-category ">
                        <label htmlFor="amount" className="form-head">
                          Enter Amount:{" "}
                        </label>
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
                    <button
                      type="button"
                      className="expense-cbtn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn expense-addbtn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for editing Expense */}
      {editModalVisible && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className="modal show"
            style={{ display: "block" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog modal-dialog-centered expense-m">
              <div className="modal-content expense-modal-c">
                <div className="modal-header">
                  <h5 className="expense-heading">Edit Expense</h5>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div className="modal-body expense-body">
                    <div className="expense-form">
                      <div className="form-items-expense">
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
                    <button
                      type="button"
                      className="expense-cbtn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn expense-addbtn">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Expense List */}
      <div>
        <div className="buttongroup" style={{ marginBottom: "20px" }}>
          <button
            ref={dailyButtonRef}
            onClick={() => setViewType("daily")}
            className="filter-expense"
            id="expensedaily"
          >
            Daily
          </button>
          <button
            onClick={() => setViewType("weekly")}
            className="filter-expense"
          >
            Weekly
          </button>
          <button
            onClick={() => setViewType("monthly")}
            className="filter-expense"
          >
            Monthly
          </button>
        </div>

                <div className='expense-lists'>
                    {expenseList.map(expense => (
                        <div key={expense.id} className='expense-item'>
                            <div className='category-expense'>
                                <div className="circle-icon-elist mb-3">
                                    <i className={expense.icon} style={{ color: 'black', size: '18' }}></i>
                                </div>
                                <div className='expense-category'>{expense.category}</div>
                            </div>
                            <div className="expense-date">
                                {format(new Date(expense.date), 'dd MMM yyyy')}
                            </div>
                            <div className='expense-amount'>${expense.amount}</div>
                            <div className='buttons'>
                                <button onClick={() => handleEditExpense(expense)} className="expense-edit"><i className="fa-solid fa-pen-to-square"></i></button>
                                <button onClick={() => handleDeleteExpense(expense.id)} className="expense-delete"> <i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>


        <div className="expense-lists">
          {expenseList.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="category-expense">
                <div className="circle-icon-elist mb-3">
                  <i className={expense.icon} style={{ color: "black" }}></i>
                </div>
                <div className="expense-category">{expense.category}</div>
              </div>
              <div className="expense-date">
                {format(new Date(expense.date), "dd MMM yyyy")}
              </div>
              <div className="expense-amount">${expense.amount}</div>
              <div className="buttons">
                <button
                  onClick={() => handleEditExpense(expense)}
                  className="expense-edit"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="expense-delete"
                >
                  {" "}
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expense;
