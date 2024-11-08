// src/components/Income.js
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Income.css";

const Income = () => {
  const { userId } = useParams(); // Retrieve the userId from the URL
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [incomeList, setIncomeList] = useState([]);
  const [viewType, setViewType] = useState("daily"); // Default to daily
  const [error, setError] = useState(null);
  const icons = [
    "fa-solid fa-wallet",
    "fa-solid fa-chart-line",
    "fa-solid fa-coins",
    "fa-solid fa-plus-circle",
  ];
  const incomeApi = `http://localhost:8080/income`;
  const dailyButtonRef = useRef(null);
  const categoryIcons = [
    "fa-solid fa-ticket-simple",
    "fa-solid fa-user-graduate",
    "fa-solid fa-tags",
    "fa-solid fa-gift",
    "fa-solid fa-comments-dollar",
  ];
  const [selectedIcon, setSelectedIcon] = useState(categoryIcons[0]); // Default icon

  // Function to fetch income data based on the view type
  const fetchIncomeData = useCallback(
    async (type) => {
      try {
        const response = await axios.get(`${incomeApi}/${type}/${userId}`);
        setIncomeList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
      console.log(`Fetching income data for userId: ${userId}, type: ${type}`);
    },
    [userId, incomeApi]
  );

  useEffect(() => {
    fetchIncomeData(viewType); // Fetch data when viewType changes
  }, [viewType, fetchIncomeData]);

  useEffect(() => {
    // Set focus on the Daily button when the component mounts
    if (dailyButtonRef.current) {
      dailyButtonRef.current.focus();
    }
  }, []);

  const handleBoxClick = (incomeType) => {
    if (incomeType === "Add") {
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
    setAmount("");
    setCategory("");
  };

  const saveIncome = async (categoryName) => {
    try {
      const incomeData = {
        category: categoryName,
        amount: parseFloat(amount),
        date: new Date().toISOString().split("T")[0], // Set to today's date in YYYY-MM-DD format
        icon: selectedIcon,
      };
      const response = await axios.post(
        `${incomeApi}/add/${userId}`,
        incomeData
      );

      if (response.status === 201) {
        setIncomeList((prevList) => [...prevList, response.data]); // Update the list with the new income
        handleClose(); // Close the modal after saving
      }
    } catch (error) {
      console.error("Error saving Income:", error);
      setError("Failed to save Income");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedIncome === "Add") {
      saveIncome(category);
    } else {
      saveIncome(selectedIncome);
    }

    console.log(`Amount for ${selectedIncome}: ${amount}`);
    console.log(`Category: ${category}`);
    handleClose();
  };

  // Handle icon selection in the modal
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  // const handleDelete = async (id) => {
  //     try {
  //         const response = await axios.delete(`${incomeApi}/${userId}/${id}`);
  //         if (!response.ok) {
  //             throw new Error('Failed to delete item');
  //         }
  //         setIncomeList(incomeList.filter((item) => item.id !== id));
  //     } catch (error) {
  //         setError(error.message);
  //         console.log(error);
  //     }
  // };

  return (
    <div className="income-container mt-5">
      <p className="income-head">Choose Category</p>
      <div className="row-income">
        {["Salary", "Freelance", "Pocket Money", "Add"].map(
          (incomeType, index) => (
            <div
              key={index}
              className="col-md-3 d-flex justify-content-start"
              style={{ cursor: "pointer", marginBottom: "20px" }}
            >
              <div
                className="income-card text-center p-4"
                onClick={() => {
                  handleBoxClick(incomeType);
                  handleIconClick(icons[index]);
                }}
              >
                <h5 className="income-type">{incomeType}</h5>
                <div className="circle-icon mb-3">
                  <i className={icons[index]} style={{ color: "black" }}></i>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Modal for adding income */}
      {modalVisible && (
        <div className="modal-overlay" onClick={handleClose}>
          <div
            className="modal show"
            style={{ display: "block" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-dialog modal-dialog-centered income-m">
              <div className="modal-content income-modal-c">
                <div className="modal-header">
                  <h5 className="income-heading">Add {selectedIncome}</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body income-body">
                    <div className="income-form">
                      <div className="form-items-income">
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
                    <button
                      type="button"
                      className="income-cbtn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn income-addbtn">
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
                  <h5 className="income-heading">Add new Category</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body income-body">
                    <div className="income-form">
                      <div className="form-items-category">
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
                                    selectedIcon === icon ? "#1f665e" : "black",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleIconClick(icon)}
                              ></i>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-items-category">
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
                    <button
                      type="button"
                      className="income-cbtn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn income-addbtn">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Income List */}
      <div>
        <div className="buttongroup" style={{ marginBottom: "20px" }}>
          <button
            ref={dailyButtonRef}
            onClick={() => setViewType("daily")}
            className="filter-income"
            id="incomedaily"
          >
            Daily
          </button>
          <button
            onClick={() => setViewType("weekly")}
            className="filter-income"
          >
            Weekly
          </button>
          <button
            onClick={() => setViewType("monthly")}
            className="filter-income"
          >
            Monthly
          </button>
        </div>

        <div className="income-lists">
          {incomeList.map((income) => (
            <div key={income.id} className="income-item">
              <div className="circle-icon-ilist mb-3">
                <i className={income.icon} style={{ color: "black" }}></i>
              </div>
              <div className="income-category">{income.category}</div>
              <div className="income-amount">${income.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Income;
