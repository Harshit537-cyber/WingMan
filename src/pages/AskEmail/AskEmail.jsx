import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskEmail.css';

const AskEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');

  // Simple email validation function
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleNext = () => {
    if (isValidEmail(email)) {
      // ✅ Payload Logic:
      // Preserves 'gender', 'name', 'mobileNumber'
      // Adds 'email'
      navigate('/gender', { 
        state: { 
          ...location.state, 
          email: email 
        } 
      }); 
    }
  };

  return (
    <AppLayout> 
      <div className="email-screen-container">
        {/* Header Section */}
        <div className="email-header-section">
          <OnboardingHeader 
            title="What's your email?" 
            description="We'll use this to recover your account."
          />
        </div>

        {/* Body Content */}
        <div className="email-body-content">
          <div className="email-input-box slide-up">
            <input 
              type="email" 
              className="custom-email-field" 
              placeholder="example@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="email-footer-action">
          <div className="footer-wavy-decoration"></div>
          
          {/* 
             Step 4 (Gender > Name > Mobile > Email)
             Disabled until email format is valid
          */}
          <StepProgressButton 
            currentStep={4} 
            totalSteps={20} 
            disabled={!isValidEmail(email)} 
            onClick={handleNext} 
          />
        </div>
      </div>
    </AppLayout> 
  );
};

export default AskEmail;