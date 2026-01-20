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
    if (address.trim()) {
      navigate('/LocationSuccess', { state: { ...location.state, manualAddress: address } });
    }
  };

  return (
    <AppLayout>
      <div className="manual-loc-wrapper">
        
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450" 
                  stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        <OnboardingHeader 
          title="Where do you currently live?" 
          description="I’ll try to show matches in the same city."
        />

        <div className="input-container slide-up-delay">
            <input 
              type="text" 
              className="location-input" 
              placeholder="Enter Location" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
        </div>

        <div className="footer-fixed">
          <StepProgressButton 
            currentStep={7} 
            totalSteps={20} 
            disabled={!address.trim()} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default ManualLocation;