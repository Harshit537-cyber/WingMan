import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './ManualLocation.css';

const ManualLocation = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    // Sirf tab navigate karega jab address field me kuch likha ho
    if (address.trim()) {
      navigate('/LocationSuccess', { state: { ...location.state, manualAddress: address } });
    }
  };

  return (
    <AppLayout>
      <div className="location-screen-container">
        
        {/* Background Animation */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450" 
                  stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        {/* TOP SECTION: Left Aligned Header */}
        <div className="location-header-section">
          <OnboardingHeader 
            title="Where do you currently live?" 
            description="So we suggest meaningful connections close to you."
          />
        </div>

        {/* MIDDLE SECTION: Input area */}
        <div className="location-body-content">
          <div className="input-box-wrapper slide-up-delay">
              <input 
                type="text" 
                className="location-input-field" 
                placeholder="Enter Location" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
              />
          </div>
        </div>

        {/* BOTTOM SECTION: Fixed Footer */}
        <div className="location-footer-action">
          <div className="footer-wavy-decoration"></div>
          
          {/* 
              Logic:
              - currentStep={5} (Ye 5th step hai)
              - totalSteps={15} (Pehle screens ke hisab se total 15 steps)
              - disabled={!address.trim()} (Jab tak address fill nahi hoga tab tak disabled)
          */}
          <StepProgressButton 
            currentStep={5} 
            totalSteps={15} 
            disabled={!address.trim()} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default ManualLocation;