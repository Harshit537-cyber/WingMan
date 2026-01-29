import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader"; // New Header Import
import "./Native.css";

const Native = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  const handleSelect = (state) => {
    setSelectedState(state);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (selectedState) {
      navigate('/next-onboarding-step'); // Change this to your actual next route
    }
  };

  return (
    <AppLayout>
      <div className="native-screen-wrapper">
        
        {/* Updated Onboarding Header */}
        <OnboardingHeader 
          title="What’s your native state?" 
          description="It’s good to know where someone's story began."
          showSkip={false} 
        />

        {/* Dropdown Section */}
        <div className="native-dropdown-section">
          <div className="native-dropdown-container">
            <div 
              className={`native-select-box ${isOpen ? 'active-border' : ''}`} 
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={selectedState ? "selected-value" : "placeholder-value"}>
                {selectedState || "Select State"}
              </span>
              <svg 
                className={`arrow-icon ${isOpen ? 'open' : ''}`} 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>

            {isOpen && (
              <ul className="native-options-list">
                {states.map((state, index) => (
                  <li key={index} onClick={() => handleSelect(state)}>
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Background Dotted Path */}
        <div className="background-graphics">
          <svg viewBox="0 0 400 500" fill="none">
            <path 
              d="M-50 450 C 50 420, 250 380, 200 250 C 150 120, 20 150, 50 300 C 80 450, 400 350, 450 200" 
              stroke="#E8E0E8" 
              strokeWidth="2" 
              strokeDasharray="8 8" 
            />
          </svg>
        </div>

        {/* Footer with StepProgressButton */}
        <div className="native-footer">
          <StepProgressButton 
            currentStep={3} 
            totalSteps={20}
            onClick={handleNext}
            disabled={!selectedState} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Native;