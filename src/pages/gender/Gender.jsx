import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import { saveOnboardingData } from "../../api/onboarding.api"; // ✅ Using your API file
import "./Gender.css";

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Track network request
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!selectedGender) return;

    setIsSubmitting(true);
    try {
      // ✅ Save to Network using the axios function you created
      // The payload only sends the 'gender' key as requested
      await saveOnboardingData({ gender: selectedGender });

      // ✅ Navigate to the next screen on success
      navigate("/askName", {
        state: {
          gender: selectedGender,
        },
      });
    } catch (error) {
      console.error("Error saving gender:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={!selectedGender || isSubmitting} // ✅ Disable button while saving
            onClick={handleNext}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Gender;