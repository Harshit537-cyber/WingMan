import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskMobileNumber.css';

const AskMobileNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobile, setMobile] = useState('');

  const handleChange = (e) => {
    // 1. Remove non-numeric characters
    const value = e.target.value.replace(/\D/g, '');
    
    // 2. Limit to 10 digits
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleNext = () => {
    if (mobile.length === 10) {
      // ✅ Payload Logic:
      // Keep 'gender', 'name' from previous screens
      // Add 'mobileNumber'
      navigate('/gmail', { 
        state: { 
          ...location.state, 
          mobile: mobile 
        } 
      }); 
    }
  };

  return (
    <AppLayout> 
      <div className="mobile-screen-container">
        {/* Header Section */}
        <div className="mobile-header-section">
          <OnboardingHeader 
            title="What's your number?" 
            description="We'll send a code to verify it."
          />
        </div>

        {/* Body Content */}
        <div className="mobile-body-content">
          <div className="mobile-input-box slide-up">
            <input 
              type="tel" 
              inputMode="numeric"
              className="custom-mobile-field" 
              placeholder="99999 99999" 
              value={mobile}
              onChange={handleChange}
              autoFocus
              maxLength={10}
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="mobile-footer-action">
          <div className="footer-wavy-decoration"></div>
          
          {/* 
             currentStep={3} (Assuming Gender=1, Name=2, Mobile=3)
             disabled until 10 digits entered
          */}
          <StepProgressButton 
            currentStep={3} 
            totalSteps={20} 
            disabled={mobile.length !== 10} 
            onClick={handleNext} 
          />
        </div>
      </div>
    </AppLayout> 
  );
};

export default AskMobileNumber;