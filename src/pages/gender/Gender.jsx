import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Gender.css';

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedGender) {
      // Data aage pass kar rahe hain
      navigate('/askName', { state: { gender: selectedGender } });
    }
  };

  return (
    <AppLayout> 
    <div className="gender-page-layout">
      {/* Ye container hamesha 430px max rahega aur center rahega */}
      <div className="gender-main-column">
        
        <OnboardingHeader title="Let’s start by choosing your gender!" />

        <div className="gender-body">
          <div className="gender-options">
            {/* MALE */}
            <div 
              className={`gender-chip slide-up-1 ${selectedGender === 'male' ? 'selected' : ''}`}
              onClick={() => setSelectedGender('male')}
            >
              <div className="gender-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="9" cy="15" r="5" />
                  <path d="M14 10l7-7M16 3h5v5" />
                </svg>
              </div>
              <span className="label">Male</span>
            </div>

            {/* FEMALE */}
            <div 
              className={`gender-chip slide-up-2 ${selectedGender === 'female' ? 'selected' : ''}`}
              onClick={() => setSelectedGender('female')}
            >
              <div className="gender-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M12 14v7M9 19h6" />
                </svg>
              </div>
              <span className="label">Female</span>
            </div>
          </div>
        </div>

        <div className="gender-footer">
          <StepProgressButton 
            currentStep={1} 
            totalSteps={20} 
            disabled={!selectedGender} 
            onClick={handleNext} 
          />
        </div>
      </div>
    </div>
    </AppLayout>
  );
};

export default Gender;