import React, { useState } from 'react';
import './Settings.css'; // Your custom CSS (if needed)

const Settings = () => {
  const [accordionState, setAccordionState] = useState({
    itemOneOpen: true,
    itemTwoOpen: false,
    itemThreeOpen: false,
    itemFourOpen: false
  });

  const toggleAccordion = (item) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <div className="container settings-container text-start">
      <h1 className='setting-title fw-bold'>Settings</h1>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        {/* Accordion Item 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className={`accordion-button ${!accordionState.itemOneOpen ? 'collapsed' : ''}`} 
              
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemOneOpen}
              onClick={() => toggleAccordion('itemOneOpen')}
              aria-controls="panelsStayOpen-collapseOne"
            >
                <i className="fa-solid fa-bell me-3 setting-icon"></i>
              Notifications
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className={`accordion-collapse collapse ${accordionState.itemOneOpen ? 'show' : ''}`}
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <strong>This is the notifications settings.</strong> Here, you can toggle whether or not you'd like to receive notifications.
            </div>
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className={`accordion-button ${!accordionState.itemTwoOpen ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemTwoOpen}
              onClick={() => toggleAccordion('itemTwoOpen')}
              aria-controls="panelsStayOpen-collapseTwo"
            >
                <i class="fa-solid fa-database setting-icon me-3"></i>
              Data Backups
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className={`accordion-collapse collapse ${accordionState.itemTwoOpen ? 'show' : ''}`}
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <strong>This is the data backup settings.</strong> Manage how and when your data is backed up.
            </div>
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className={`accordion-button ${!accordionState.itemThreeOpen ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemThreeOpen}
              onClick={() => toggleAccordion('itemThreeOpen')}
              aria-controls="panelsStayOpen-collapseThree"
            >
                <i class="fa-solid fa-circle-question me-3 setting-icon"></i>
              Help
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className={`accordion-collapse collapse ${accordionState.itemThreeOpen ? 'show' : ''}`}
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <strong>Privacy Policy information.</strong> Learn how we protect your data.
            </div>
          </div>
        </div>

        {/* Accordion Item 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className={`accordion-button ${!accordionState.itemThreeOpen ? 'collapsed' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemThreeOpen}
              onClick={() => toggleAccordion('itemThreeOpen')}
              aria-controls="panelsStayOpen-collapseThree"
            >
                <i class="fa-solid fa-shield me-3 setting-icon"></i>
              Privacy Policy
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className={`accordion-collapse collapse ${accordionState.itemThreeOpen ? 'show' : ''}`}
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <strong>Privacy Policy information.</strong> Learn how we protect your data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
