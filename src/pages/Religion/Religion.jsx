import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Religion.css';

const Religion = () => {
  const [selectedReligion, setSelectedReligion] = useState("Hinduism");
  const navigate = useNavigate();
  const location = useLocation();

  const religions = [
    "Christianity",
    "Hinduism",
    "Islam",
    "Sikhism",
    "Jainism",
    "Buddhism",
    "Not Belive",
  ];

  const handleNext = () => {
    navigate('/Habit', { 
      state: { ...location.state, religion: selectedReligion } 
    });
  };

  return (
    <AppLayout>
      <div className="religion-screen-container">
        
        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450" 
                  stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* TOP SECTION: Shared Header */}
        <div className="native-header-section">
          <OnboardingHeader 
            title="Do you follow any particular religion?" 
            description="You can totally skip it if you'd like."
          />
        </div>

        {/* MIDDLE SECTION: Selection Area */}
        <div className="religion-body-content">
          <div className="selection-wrapper slide-up-delay">
            
            {/* Display Box */}
            <div className="religion-display-box">
              <span>{selectedReligion || "Select Religion"}</span>
            </div>

            {/* Selection Card */}
            <div className="religion-card">
              <div className="religion-card-header">
                Please select your religion
              </div>
              <div className="religion-list">
                {religions.map((religion) => (
                  <div
                    key={religion}
                    className={`religion-item ${selectedReligion === religion ? "selected" : ""}`}
                    onClick={() => setSelectedReligion(religion)}
                  >
                    {religion}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="religion-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={12} 
            totalSteps={15} 
            disabled={!selectedReligion} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Religion;