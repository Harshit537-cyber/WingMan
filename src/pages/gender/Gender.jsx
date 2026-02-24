import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./Gender.css";

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ To catch data if user comes back/forward

  const handleNext = () => {
    if (!selectedGender) return;

    // 1. Get existing data from previous screens (if any)
    const existingData = location.state || {};

    // 2. Merge current screen data with existing data
    const updatedData = {
      ...existingData,
      gender: selectedGender,
    };

    // 3. ✅ Pass the accumulated data to the next screen (NO API CALL)
    navigate("/askName", {
      state: {
     ...location.state, 
    ...updatedData            
  },
    });
  };

  return (
    <AppLayout>
      <div className="gender-screen-container">

        {/* Header */}
        <div className="gender-header-section">
          <OnboardingHeader title="Let’s start by choosing your gender!" />
        </div>

        {/* Gender Selection */}
        <div className="gender-selection-body">
          <div className="gender-chips-stack">

            {/* Male */}
            <div
              className={`gender-select-card slide-up-1 ${
                selectedGender === "male" ? "is-selected" : ""
              }`}
              onClick={() => setSelectedGender("male")}
            >
              <div className="gender-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="15" r="5" />
                  <path d="M14 10l7-7M16 3h5v5" />
                </svg>
              </div>
              <span className="gender-label-text">Male</span>
            </div>

            {/* Female */}
            <div
              className={`gender-select-card slide-up-2 ${
                selectedGender === "female" ? "is-selected" : ""
              }`}
              onClick={() => setSelectedGender("female")}
            >
              <div className="gender-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M12 14v7M9 19h6" />
                </svg>
              </div>
              <span className="gender-label-text">Female</span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="gender-footer-action">
          <div className="wavy-bg-decoration"></div>

          <StepProgressButton
            currentStep={1}
            totalSteps={15}
            disabled={!selectedGender}
            onClick={handleNext}
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Gender;