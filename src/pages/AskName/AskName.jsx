import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskName.css';

const AskName = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const gender = location.state?.gender; 
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      navigate('/hy', { state: { gender, name } }); 
    }
  };

  return (
    <AppLayout> 
      <div className="name-screen-container">
        
        {/* TOP SECTION: Header (Title & Description right below back button) */}
        <div className="name-header-section">
          <OnboardingHeader 
            title="Cool, what's your name?" 
            description="I'll save it as your display name."
          />
        </div>

        {/* MIDDLE SECTION: Input field */}
        <div className="name-body-content">
          <div className="name-input-box slide-up">
            <input 
              type="text" 
              className="custom-name-field" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* BOTTOM SECTION: Footer Fixed */}
        <div className="name-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={2} 
            totalSteps={20} 
            disabled={!name.trim()} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout> 
  );
};

export default AskName;