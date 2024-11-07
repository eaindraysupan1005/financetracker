import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Budget.css";

const Budget = () => {
  const { userId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");
  const [budgetList, setBudgetList] = useState([]);
  const [limit, setLimit] = useState("");
  const [date, setDate] = useState("");
  const categories = [
    { name: "Food", icon: "fas fa-utensils" },
    { name: "Shopping", icon: "fa-solid fa-cart-shopping" },
    { name: "Transportation", icon: "fa-solid fa-car" },
    { name: "Entertainment", icon: "fa-solid fa-film" },
  ];
  const [icons, setIcons] = useState([
    { class: "fas fa-graduation-cap fa-2x", active: false },
    { class: "fas fa-tshirt fa-2x", active: false },
    { class: "fas fa-home fa-2x", active: false },
    { class: "fa-solid fa-dollar fa-2x", active: false },
    { class: "fa-solid fa-heart-pulse fa-2x", active: false },
    { class: "fa-solid fa-circle-dollar-to-slot fa-2x", active: false },
    { class: "fas fa-receipt fa-2x", active: false },
    { class: "fa-solid fa-hand-holding-dollar fa-2x", active: false },
    { class: "fas fa-users fa-2x", active: false },
    { class: "fas fa-table-tennis fa-2x", active: false },
  ]);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goalList, setGoalList] = useState([]);

  const budgetApi = `http://localhost:8080/budgets`;
  const savingGoalApi = `http://localhost:8080/saving`;
  const [error, setError] = useState(null);

  //Fetch all budgets

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = useCallback(
    async (type) => {
      try {
        const response = await axios.get(`${budgetApi}/${userId}`);
        setBudgetList(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching budget data:", error);
      }
      console.log(`Fetching budget data for userId: ${userId}`);
    },
    [userId, budgetApi]
  );

  const saveBudget = async () => {
    try {
      let icon = icons.find((ic) => ic.active);
      if (icon) {
        icon = icon.class;
      } else {
        let category = categories.find((cat) => cat.name === selectedCategory);
        icon = category.icon;
      }
      if (selectedCategory && limit) {
        const budgetData = {
          category: selectedCategory,
          budget_limit: limit,
          spent: 0,
          icon: icon,
          date: date || new Date().toISOString().split("T")[0],
        };
        const response = await axios.post(
          `${budgetApi}/add/${userId}`,
          budgetData
        );

        console.log(response);
        if (response.status === 201) {
          setBudgetList((prevList) => [...prevList, response.data]);
          setSelectedCategory("");
          setLimit("");
          let newIcons = icons.map((ic) => {
            ic.active = false;
            return ic;
          });
          console.log(newIcons);
          setIcons(newIcons);
          handleCloseForBudget();
        }
      }
    } catch (error) {
      console.error("Error saving budget:", error);
      setError("Failed to save budget");
    }
  };

  const handleCloseForBudget = () => {
    setCategory("");
    setLimit("");
  };

  const handleSubmitForBudget = (event) => {
    event.preventDefault();
    saveBudget(selectedCategory);

    console.log(`Category: ${selectedCategory}`);
    console.log(`Limit for ${selectedCategory}: ${limit}`);
    handleCloseForBudget();
  };

  const handleSetSelectedCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const availableCategories = categories.filter(
    (cat) => !budgetList.some((budget) => budget.category === cat.name)
  );

  const toggleActiveIcon = (index) => {
    let prevIcons = icons.map((icon, i) => {
      console.log(index, i);
      if (index == i) {
        icon.active = !icon.active;
      }

      return icon;
    });
    console.log(prevIcons);
    setIcons(prevIcons);
  };

  // Delete a budget

  const handleDeleteForBudget = async (id) => {
    try {
      const response = await axios.delete(`${budgetApi}/${userId}/${id}`);
      setBudgetList((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== id)
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  // Fetch Saving Goals

  useEffect(() => {
    fetchSavingGoalData();
  }, []);

  const fetchSavingGoalData = useCallback(
    async (type) => {
      try {
        const response = await axios.get(`${savingGoalApi}/${userId}`);
        console.log(response.data);
        setGoalList(response.data);
      } catch (error) {
        console.log("Error fetching saving-goal data:", error);
      }
      console.log(`Fetching saving-goal data for userId: ${userId}`);
    },
    [userId, savingGoalApi]
  );

  const saveGoal = async () => {
    try {
      const savingGoalData = {
        saving_name: goalName,
        target_amount: targetAmount,
        saved_amount: savedAmount,
        deadline: deadline,
      };
      const response = await axios.post(
        `${savingGoalApi}/add/${userId}`,
        savingGoalData
      );

      console.log(response);
      if (response.status === 201) {
        setGoalList((prevList) => [...prevList, response.data]);
        handleCloseForSaving();
      }
    } catch (error) {
      console.error("Error saving goal:", error);
      setError("Failed to save saving-goal");
    }
  };

  const handleSubmitForSaving = (event) => {
    event.preventDefault();
    saveGoal();

    console.log(`Description: ${goalName}`);
    console.log(`Target Amount: ${targetAmount}`);
    console.log(`Saved Amount: ${savedAmount}`);
    console.log(`Deadline: ${deadline}`);
  };

  const handleCloseForSaving = () => {
    setGoalName("");
    setTargetAmount("");
    setSavedAmount("");
    setDeadline("");
  };

  const handleDeleteForSaving = async (id) => {
    try {
      const response = await axios.delete(`${savingGoalApi}/${userId}/${id}`);
      setGoalList((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      console.log(response);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div>
      <main className="budget-main">
        <h3 className="fw-bold setBudget">Set Budget for this month</h3>
        <div className="budget-categories">
          {availableCategories.map((cat) => (
            <div key={cat.name} className="mb-4 category-item">
              <div>
                <i className={`${cat.icon} me-3`}></i> {cat.name}
              </div>
              <button
                className="btn btn-outline-dark set-budget-btn"
                data-bs-toggle="modal"
                data-bs-target="#budgetModal"
                onClick={() => handleSetSelectedCategory(cat.name)}
              >
                Set Budget
              </button>
            </div>
          ))}
          <div className="mt-5 add-category">
            <button
              className="btn shadow add-category-btn"
              data-bs-toggle="modal"
              data-bs-target="#newCategoryModal"
            >
              + Add New Category
            </button>
          </div>
        </div>

        {/* set budget modal */}
        <div
          className="modal fade"
          id="budgetModal"
          tabindex="-1"
          aria-labelledby="budgetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content budget-popup">
              <h5
                className="modal-title fw-bold m-auto mt-3 budget-form-title"
                id="budgetModalLabel"
              >
                Set Budget
              </h5>
              <div className="modal-body">
                <form onSubmit={handleSubmitForBudget}>
                  <div className="mb-3 d-flex me-2 budget-form">
                    <label htmlFor="category" className="form-label me-3 ">
                      Category:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex me-2 budget-form">
                    <label htmlFor="limit" className="form-label me-5 ">
                      Limit:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="limit"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex me-2 budget-form">
                    <label htmlFor="date" className="form-label me-5 ">
                      Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-5 budget-form-btn">
                    <button
                      type="button"
                      className="btn me-3 cancel-btn"
                      data-bs-dismiss="modal"
                      onClick={handleCloseForBudget}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn set-btn"
                      data-bs-dismiss="modal"
                    >
                      Set
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Budget Modal */}
        <div
          className="modal fade"
          id="newCategoryModal"
          tabindex="-1"
          aria-labelledby="budgetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content budget-popup">
              <h5
                className="modal-title fw-bold m-auto mt-3 mb-4 budget-form-title"
                id="budgetModalLabel"
              >
                Add New Category
              </h5>

              <div className="modal-body">
                {/* Category Name Input  */}
                <div className="mb-3 ms-3 me-3 text-start">
                  <label htmlFor="newCategory" className="form-label fw-bold">
                    Enter Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="newCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    placeholder="Name"
                  />
                </div>

                {/* Icon Selection */}
                <div className="mb-3 me-3 ms-3 text-start">
                  <label className="form-label fw-bold">Choose Icon</label>
                  <div className="row text-center">
                    <div className="icon-grid d-flex flex-wrap justify-content-between">
                      {icons.map((icon, index) => (
                        <div
                          key={index}
                          className={`icon-item ${icon.active ? "active" : ""}`} // Add 'active' class if the icon is active
                          onClick={() => toggleActiveIcon(index)} // Toggle active state on click
                        >
                          <i className={icon.class}></i>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amount Input  */}
                <div className="mb-4 ms-3 me-3 text-start">
                  <label htmlFor="limit" className="form-label fw-bold">
                    Enter Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="limit"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    placeholder="Amount"
                  />
                </div>

                <div className="mb-4 ms-3 me-3 text-start">
                  <label htmlFor="date" className="form-label fw-bold">
                    Enter Amount
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="mb-5 budget-form-btn">
                  <button
                    type="button"
                    className="btn me-3 cancel-btn"
                    data-bs-dismiss="modal"
                    onClick={handleCloseForBudget}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn set-btn"
                    data-bs-dismiss="modal"
                    onClick={saveBudget}
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="set-budgeted">
          <h3 className="fw-bold mt-5">Budgeted categories:</h3>
          {budgetList.length === 0 ? (
            <p className="text-muted mt-5 no-budget">
              Currently, no budget is applied. Set budget-limit for this month.
            </p>
          ) : (
            <ul>
              <li className="budgeted-lists">
                <div className="row">
                  {budgetList.map((budget, index) => {
                    const progress = (budget.spent / budget.budget_limit) * 100;
                    return (
                      <div className="col-12 col-md-4 mt-3 mb-4" key={index}>
                        <div className="card shadow h-100">
                          <div className="card-body text-start">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title budgeted-title">
                                <i
                                  className={`${budget.icon} me-3 selected-icon`}
                                ></i>
                                {budget.category}
                              </h5>
                              <div>
                                <button className="btn btn-edit me-2">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                  className="btn btn-trash"
                                  onClick={() =>
                                    handleDeleteForBudget(budget.id)
                                  }
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                            </div>
                            <p>Limit: {budget.budget_limit} $</p>
                            <p>Spent: {budget.spent} $</p>
                            <p>Date: {budget.date.join("-")}</p>
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </li>
            </ul>
          )}
        </div>

        {/* Saving goal section */}
        <div className=" mt-5">
          <h3 className="fw-bold saving-title">Saving Goal</h3>
          {goalList.length === 0 ? (
            <p className="text-muted mt-5 text-start no-budget">
              No saving-goal is applied. Set saving-goals to be full your dream.
            </p>
          ) : (
            <ul>
              <li className="goal-list">
                <div className="row row-cols-1 row-cols-md-3 g-5 mt-4">
                  {goalList.map((goal, index) => {
                    const progress =
                      Math.round((goal.saved_amount / goal.target_amount) * 100);
                    return (
                      <div className="col" key={index}>
                        <div className="card h-100 shadow d-flex flex-row card-saving">
                          <div className="card-body text-start ms-3">
                            <h5 className="card-title">{goal.saving_name}</h5>
                            <p>Target: {goal.target_amount} $</p>
                            <p>Saved: {goal.saved_amount} $</p>
                            <p>
                              Deadline:{" "}
                              <strong>{goal.deadline.join("-")}</strong>
                            </p>
                          </div>
                          <div>
                            <div className="me-3">
                              <div>
                                <button className="btn btn-edit">
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                  className="btn btn-trash"
                                  onClick={() => handleDeleteForSaving(goal.id)}
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                              <div
                                className="progress-circle mt-3"
                                style={{ width: "100px", height: "100px" }}
                              >
                                <svg viewBox="0 0 36 36">
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#ccc"
                                    strokeWidth="4"
                                  />
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                                    fill="none"
                                    stroke="#eac60b"
                                    strokeWidth="4"
                                    strokeDasharray={progress + ", 100"}
                                  />
                                </svg>
                                <div className="progress-text">{progress}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </li>
            </ul>
          )}

          {/* Add New Target Button */}
          <div className="mt-5 mb-5 text-center">
            <button
              className="btn shadow add-category-btn"
              data-bs-toggle="modal"
              data-bs-target="#targetModal"
            >
              + Add New Target
            </button>
          </div>
        </div>

        {/* Add New Target pop up */}
        <div
          className="modal fade"
          id="targetModal"
          tabindex="-1"
          aria-labelledby="budgetModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content budget-popup">
              <h5
                className="modal-title fw-bold m-auto mt-3 budget-form-title"
                id="budgetModalLabel"
              >
                Add New Saving-Goal
              </h5>
              <div className="modal-body">
                <form>
                  <div className="mb-3 ms-3 me-3 text-start">
                    <label htmlFor="description" className="form-label fw-bold">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={goalName}
                      onChange={(e) => setGoalName(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="mb-3 ms-3 me-3 text-start">
                    <label
                      htmlFor="targetAmount"
                      className="form-label fw-bold"
                    >
                      Target Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="targetAmount"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      placeholder="Amount"
                    />
                  </div>
                  <div className="mb-3 ms-3 me-3 text-start">
                    <label htmlFor="savedAmount" className="form-label fw-bold">
                      Saved Amount
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="savedAmount"
                      value={savedAmount}
                      onChange={(e) => setSavedAmount(e.target.value)}
                      placeholder="Amount"
                    />
                  </div>
                  <div className="mb-3 ms-3 me-3 text-start">
                    <label htmlFor="deadline" className="form-label fw-bold">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="deadline"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="mb-5 budget-form-btn">
                <button
                  type="button"
                  className="btn me-3 cancel-btn"
                  data-bs-dismiss="modal"
                  onClick={handleCloseForSaving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn set-btn"
                  data-bs-dismiss="modal"
                  onClick={handleSubmitForSaving}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budget;
