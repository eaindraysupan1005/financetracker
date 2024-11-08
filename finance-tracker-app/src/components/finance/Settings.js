import React, { useState } from "react";
import "./Settings.css"; // Your custom CSS (if needed)

const Settings = () => {
  const [accordionState, setAccordionState] = useState({
    itemOneOpen: false,
    itemTwoOpen: false,
    itemThreeOpen: false,
    itemFourOpen: false,
  });

  const toggleAccordion = (item) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  return (
    <div className="container settings-container text-start">
      <h1 className="setting-title fw-bold">Settings</h1>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        {/* Accordion Item 1 */}
        <div className="accordion-item setting-accordion">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className={`accordion-button ${
                !accordionState.itemOneOpen ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemOneOpen}
              onClick={() => toggleAccordion("itemOneOpen")}
              aria-controls="panelsStayOpen-collapseOne"
            >
              <i className="fa-solid fa-bell me-3 setting-icon"></i>
              Notifications
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className={`accordion-collapse collapse ${
              accordionState.itemOneOpen ? "show" : ""
            }`}
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <p>
                Stay up to date with important alets and updates. Customize your
                notifications preferences to receive remiders about budget
                limits, saving goal and acount activity.
              </p>
              <p className="mt-3">Receive notifications?</p>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineRadio1">
                  Yes{" "}
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineRadio2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className="accordion-item setting-accordion">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className={`accordion-button ${
                !accordionState.itemTwoOpen ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemTwoOpen}
              onClick={() => toggleAccordion("itemTwoOpen")}
              aria-controls="panelsStayOpen-collapseTwo"
            >
              <i class="fa-solid fa-database setting-icon me-3"></i>
              Data Backups
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className={`accordion-collapse collapse ${
              accordionState.itemTwoOpen ? "show" : ""
            }`}
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <p>
                Secure your finance data with regular backups. Enable automatic
                backups to ensure your information is safely stored and can be
                stored at any time.
              </p>
              <button type="button" className="btn mt-3 backup-btn">
                Back up
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div className="accordion-item setting-accordion">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className={`accordion-button ${
                !accordionState.itemThreeOpen ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemThreeOpen}
              onClick={() => toggleAccordion("itemThreeOpen")}
              aria-controls="panelsStayOpen-collapseThree"
            >
              <i class="fa-solid fa-circle-question me-3 setting-icon"></i>
              Help
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className={`accordion-collapse collapse ${
              accordionState.itemThreeOpen ? "show" : ""
            }`}
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <p>
                Need assistance? Access our help center for tutorials, FAQs and
                customer support to guide you through using the finance tracker.
              </p>
              <a href="#" className="contact-link">
                Contact us
              </a>{" "}
              for more details.
            </div>
          </div>
        </div>

        {/* Accordion Item 4 */}
        <div className="accordion-item setting-accordion">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className={`accordion-button ${
                !accordionState.itemFourOpen ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              aria-expanded={accordionState.itemFourOpen}
              onClick={() => toggleAccordion("itemFourOpen")}
              aria-controls="panelsStayOpen-collapseThree"
            >
              <i class="fa-solid fa-shield me-3 setting-icon"></i>
              Privacy Policy
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className={`accordion-collapse collapse ${
              accordionState.itemFourOpen ? "show" : ""
            }`}
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <p>
                Your privacy matters to us. Learn more about how we protect your
                personal and financial information in our comprehensive privacy
                policy.
              </p>
              <a href="#" className="contact-link">
                Contact us
              </a>{" "}
              for more details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
