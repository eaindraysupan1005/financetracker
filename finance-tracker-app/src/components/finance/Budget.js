import React, { useState } from 'react';
import './Budget.css';

const Budget = () => {
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [targetCategory, setTargetCategory] = useState('');
  const handleSetCategory = (categoryName) => {
    setCategory(categoryName);
  };

  const handleSetNewCategory = (newCategoryName) => {
    setNewCategory(newCategoryName);
  }

  const handleTargetCategory = (targetName) =>{
    setTargetCategory(targetName);
  }

  return (
    <div>
      <main className="budget-main">
      <h3 className='fw-bold setBudget'>Set Budget for this month</h3>
      <div className="budget-categories">
        <div className="mb-4 category-item">
          <div><i className="fas fa-utensils me-3"></i> Food</div>
          <button className="btn btn-outline-dark set-budget-btn"
                data-bs-toggle="modal"
                data-bs-target="#budgetModal" onClick={() => handleSetCategory('Food')}>
            Set Budget
          </button>
        </div>
        <div className="mb-4 category-item">
          <div><i className="fa-solid fa-cart-shopping me-3"></i> Shopping</div>
          <button className="btn btn-outline-dark set-budget-btn"
                data-bs-toggle="modal"
                data-bs-target="#budgetModal" onClick={() => handleSetCategory('Shopping')}>
            Set Budget
          </button>
        </div>
        <div className="mb-4 category-item">
          <div><i className="fa-solid fa-car me-3"></i> Transportation</div>
          <button className="btn btn-outline-dark set-budget-btn"
                data-bs-toggle="modal"
                data-bs-target="#budgetModal" onClick={() => handleSetCategory('Transportation')}>
            Set Budget
          </button>
        </div>
        <div className="mb-4 category-item">
          <div><i class="fa-solid fa-film me-3"></i> Entertainment</div>
          <button className="btn btn-outline-dark set-budget-btn"
                data-bs-toggle="modal"
                data-bs-target="#budgetModal" onClick={() => handleSetCategory('Entertainment')}>
            Set Budget
          </button>
        </div>
        <div className="mt-5 add-category">
        <button className="btn shadow add-category-btn" data-bs-toggle="modal"
                data-bs-target="#newCategoryModal" onClick={() => handleSetNewCategory('Shopping')}>
              + Add New Category
            </button>
        </div>
      </div>

      <div className='set-budgeted'>
      <h3 className="fw-bold mt-5">Budgeted categories:</h3>
          <p className="text-muted mt-5 no-budget">
            Currently, no budget is applied. Set budget-limit for this month.
          </p>
      </div>

      {/* Saving goal section */}
      <div className=" mt-5">
      <h3 className="fw-bold saving-title">Saving Goal</h3>

      <div className="row row-cols-1 row-cols-md-3 g-5 mt-4">
        {/* First Card - Summer Trip */}
        <div className="col">
          <div className="card h-100 shadow d-flex flex-row card-saving">
            <div className="card-body text-start ms-3">
              <h5 className="card-title">Summer Trip</h5>
              <p>Target: 800 $</p>
              <p>Saved: 356 $</p>
              <p>Deadline: <strong>April 2025</strong></p>
            </div>
            <div>
              <div className='me-3'>
                <div>
                <button className="btn btn-edit"><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn btn-trash"><i className="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="progress-circle mt-3" style={{ width: "100px", height: "100px" }}>
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
                      strokeDasharray="44.5, 100"
                    />
                  </svg>
                  <div className="progress-text">44.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Card - To Buy iPad */}
        <div className="col">
          <div className="card h-100 shadow d-flex flex-row card-saving">
            <div className="card-body text-start ms-3">
              <h5 className="card-title">To buy iPad</h5>
              <p>Target: 1500 $</p>
              <p>Saved: 237 $</p>
              <p>Deadline: <strong>April 2025</strong></p>
            </div>
            <div>
              <div className='me-3'>
                <div>
                <button className="btn btn-edit"><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn btn-trash"><i className="fa-solid fa-trash-can"></i></button>
                </div>
                <div className="progress-circle mt-3" style={{ width: "100px", height: "100px" }}>
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
                      strokeDasharray="15.8, 100"
                    />
                  </svg>
                  <div className="progress-text">15.8%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Target Button */}
      <div className="mt-5 mb-5 text-center">
        <button className="btn shadow add-category-btn" data-bs-toggle="modal"
                data-bs-target="#targetModal" onClick={() => handleTargetCategory('Shopping')}>+ Add New Target</button>
      </div>
    </div>
          
      {/* End Saving goal section */}

      {/* Modal or other components can be added here */}
      <div
      className="modal fade"
      id="budgetModal"
      tabindex="-1"
      aria-labelledby="budgetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content budget-popup">
        <h5 className="modal-title fw-bold m-auto mt-3 budget-form-title" id="budgetModalLabel">Set Budget</h5>
          <div className="modal-body">
            <form>
              <div className="mb-3 d-flex me-2 budget-form">
                <label for="category" className="form-label me-3 ">Category:</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  readonly
                />
              </div>
              <div className="mb-3 d-flex me-2 budget-form">
                <label for="limit" className="form-label me-5 ">Limit:</label>
                <input
                  type="text"
                  className="form-control"
                  id="limit"
                  placeholder='0'
                />
              </div>
              <div className="mb-3">
                <p>Month: <strong>September, 2024</strong></p>
              </div>
            </form>
          </div>
          <div className="mb-5 budget-form-btn">
            <button
              type="button"
              className="btn me-3 cancel-btn"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn set-btn">Set</button>
          </div>
        </div>
      </div>
    </div>

    {/* Add New Category Pop up */}
    <div
      className="modal fade"
      id="newCategoryModal"
      tabindex="-1"
      aria-labelledby="budgetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content budget-popup">
        <h5 className="modal-title fw-bold m-auto mt-3 mb-4 budget-form-title" id="budgetModalLabel">Add New Category</h5>

        {/* Category Name Input  */} 
        <div className="mb-3 ms-3 me-3 text-start">
          <label for="newCategoryName" className="form-label fw-bold">Enter Category Name</label>
          <input type="text" className="form-control" id="newCategoryName" placeholder="Name"/>
        </div>
        
        {/* Icon Selection */}
        <div className="mb-3 me-3 ms-3 text-start">
          <label className="form-label fw-bold">Choose Icon</label>
          <div className="row text-center">

          <div className="icon-grid d-flex flex-wrap justify-content-between">
            {/* First row of 5 icons */}
            <div className="icon-item">
              <i className="fas fa-graduation-cap fa-2x"></i>
            </div>
            <div className="icon-item">
              <i className="fas fa-tshirt fa-2x"></i>
            </div>
            <div className="icon-item">
              <i className="fas fa-home fa-2x"></i>
            </div>
            <div className="icon-item">
            <i className="fa-solid fa-heart fa-2x"></i>
            </div>
            <div className="icon-item">
            <i class="fa-solid fa-sack-dollar"></i>
            </div>

            {/* Second row of 5 icons */}
            <div className="icon-item">
            <i class="fa-solid fa-sack-dollar"></i>
            </div>
            <div className="icon-item">
              <i className="fas fa-receipt fa-2x"></i>
            </div>
            <div className="icon-item">
            <i class="fa-solid fa-hand-holding-dollar fa-2x"></i>
            </div>
            <div className="icon-item">
              <i className="fas fa-users fa-2x"></i>
            </div>
            <div className="icon-item">
              <i className="fas fa-table-tennis fa-2x"></i>
            </div>
            
          </div>
          </div>
        </div>
        
         {/* Amount Input  */}
        <div className="mb-4 ms-3 me-3 text-start">
          <label for="budgetAmount" className="form-label fw-bold">Enter Amount</label>
          <input type="text" className="form-control" id="budgetAmount" placeholder="Amount"/>
        </div>

        <div className="mb-5 budget-form-btn">
            <button
              type="button"
              className="btn me-3 cancel-btn"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn set-btn">Set</button>
          </div>
        </div>
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
        <h5 className="modal-title fw-bold m-auto mt-3 budget-form-title" id="budgetModalLabel">Add New Target</h5>
          <div className="modal-body">
            <form>
            <div className="mb-3 ms-3 me-3 text-start">
          <label for="description" className="form-label fw-bold">Description</label>
          <input type="text" className="form-control" id="description" placeholder="Description"/>
        </div>
        <div className="mb-3 ms-3 me-3 text-start">
          <label for="targetAmount" className="form-label fw-bold">Target Amount</label>
          <input type="text" className="form-control" id="targetAmount" placeholder="amount"/>
        </div>
        <div className="mb-3 ms-3 me-3 text-start">
          <label for="savedAmount" className="form-label fw-bold">Saved Amount</label>
          <input type="text" className="form-control" id="savedAmount" placeholder="amount"/>
        </div>
        <div className="mb-3 ms-3 me-3 text-start">
          <label for="deadline" className="form-label fw-bold">Deadline</label>
          <input type="date" className="form-control" id="deadline" placeholder="mm/dd/yyyy"/>
        </div>
            </form>
          </div>
          <div className="mb-5 budget-form-btn">
            <button
              type="button"
              className="btn me-3 cancel-btn"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn set-btn">Add</button>
          </div>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default Budget;