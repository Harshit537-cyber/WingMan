import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import "./Working.css";

const Working = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const options = ["I’m Working", "I’m Studying", "Figuring It Out"];

  const handleNext = () => {
    if (selectedOption !== null) {
      navigate('/Study', { 
        state: { ...location.state, workingStatus: options[selectedOption] } 
      });
    }
  };

  return (
    <AppLayout>
      <div className="working-screen-container">
        <div className="native-header-section">
          <OnboardingHeader 
            title="What’s your scene these days?" 
            description="job, studies, or a creative hustle?"
          />
        </div>

        {/* MIDDLE SECTION: Options List */}
        <div className="working-body-content">
          <div className="options-container slide-up">
            {options.map((option, index) => (
              <div
                key={index}
                className={`option-card ${selectedOption === index ? "selected" : ""}`}
                onClick={() => setSelectedOption(index)}
              >
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Dotted Wave SVG */}
        <div className="background-wave">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M-20 120 C 60 190, 220 180, 280 140 C 340 100, 400 120, 450 160" 
              stroke="#E8E0E8" 
              strokeWidth="2.5" 
              strokeDasharray="8 10" 
            />
          </svg>
        </div>

        {/* BOTTOM SECTION: Fixed Footer */}
        <div className="working-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={8} 
            totalSteps={15} 
            disabled={selectedOption === null} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Working;