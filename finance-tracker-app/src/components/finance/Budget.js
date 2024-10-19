import React, { useState } from 'react';
import './Budget.css';

const Budget = () => {
  const [category, setCategory] = useState('');
  
  const handleSetCategory = (categoryName) => {
    setCategory(categoryName);
  };

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
        <button className="btn shadow add-category-btn">
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

          
          <h3 className='fw-bold mt-5 saving-title'>Saving Goal</h3>

<div className="row row-cols-1 row-cols-md-2 g-4 mt-4">
  <div className="col">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">Summer Trip</h5>
        <p>Target: 800 $</p>
        <p>Saved: 356 $</p>
        <p>Deadline: April 2025</p>
      </div>
      <div className="card-footer">
        <div
          className="d-flex justify-content-between align-items-center"
        >
          <div
            className="progress-circle"
            style={{width: '50px', height: '50px'}}
          >
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ccc"
                stroke-width="4"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#eac60b"
                stroke-width="4"
                stroke-dasharray="44.5, 100"
              />
            </svg>
            <div className="progress-text">44.5%</div>
          </div>
          <button className="btn btn-outline-secondary">...</button>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">To buy iPad</h5>
        <p>Target: 1500 $</p>
        <p>Saved: 237 $</p>
        <p>Deadline: April 2025</p>
      </div>
      <div className="card-footer">
        <div
          className="d-flex justify-content-between align-items-center"
        >
          <div
            className="progress-circle"
            style={{width: '50px', height: '50px'}}
          >
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ccc"
                stroke-width="4"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                fill="none"
                stroke="#eac60b"
                stroke-width="4"
                stroke-dasharray="15.8, 100"
              />
            </svg>
            <div className="progress-text">15.8%</div>
          </div>
          <button className="btn btn-outline-secondary">...</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="mt-5 add-target">
<button className="btn shadow add-category-btn">
    + Add New Target
  </button>
</div>
          
      {/* Saving goal section */}

      {/* Modal or other components can be added here */}
      <div
      className="modal fade"
      id="budgetModal"
      tabindex="-1"
      aria-labelledby="budgetModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="budgetModalLabel">Set Budget</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label for="category" className="form-label">Category:</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  readonly
                />
              </div>
              <div className="mb-3">
                <label for="limit" className="form-label">Limit:</label>
                <input
                  type="number"
                  className="form-control"
                  id="limit"
                  value="0"
                />
              </div>
              <div className="mb-3">
                <p>Month: <strong>September, 2024</strong></p>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-warning">Set</button>
          </div>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default Budget;