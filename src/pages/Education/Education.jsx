import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Education.css';

const Education = () => {
  const [selected, setSelected] = useState("Undergraduate");
  const navigate = useNavigate();
  const location = useLocation();

  const eduOptions = [
    "High School",
    "Undergraduate",
    "Postgraduate",
    "Doctorate",
  ];

  const handleNext = () => {
    if (selected) {
      // ✅ Carrying forward all previous data (Step 1 to 10)
      // ✅ Adding "education" key (e.g., "Undergraduate")
      navigate('/Religion', {
        state: {
          ...location.state,
          education: selected
        }
      });
    }
  };

  return (
    <AppLayout>
      <div className="edu-screen-container">

        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-20 140 C 60 200, 220 180, 280 150 C 340 120, 420 150, 450 180"
              stroke="#E2D8E8" strokeWidth="2.5" strokeDasharray="8 10" />
          </svg>
        </div>

        {/* TOP SECTION: Shared Header Component */}
        <div className="native-header-section">
          <OnboardingHeader
            title="And your education?"
            description="What’s the highest degree or field you studied in?"
          />
        </div>

        {/* MIDDLE SECTION: Education Grid */}
        <div className="edu-body-content">
          <div className="edu-grid-container slide-up-delay">
            {/* Visual Connectors (Optional Decorative Lines) */}
            <div className="connector h-top"></div>
            <div className="connector h-bottom"></div>
            <div className="connector v-right"></div>

            <div className="edu-grid">
              {eduOptions.map((option) => (
                <div
                  key={option}
                  className={`edu-pill ${selected === option ? "active" : ""}`}
                  onClick={() => setSelected(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Step 7 Progress Button */}
        <div className="edu-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton
            currentStep={11}
            totalSteps={15}
            disabled={!selected}
            onClick={handleNext}
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Education;