import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton'; // component import karein
import './Gender.css';

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
  if (selectedGender) {
    navigate('/askName', { state: { gender: selectedGender } }); // Gender pass kiya
  }
};

  return (
    <div className="gender-container">
      <div className="header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="content-wrapper">
        <h1 className="title">Let's start by choosing your gender!</h1>

        <div className="options-container">
          <div 
            className={`gender-card ${selectedGender === 'male' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('male')}
          >
             <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="gender-icon">
                <circle cx="10" cy="14" r="5" /><path d="M14 10l7-7M16 3h5v5" />
              </svg>
            </div>
            <span>Male</span>
          </div>

          <div 
            className={`gender-card ${selectedGender === 'female' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('female')}
          >
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="gender-icon">
                <circle cx="12" cy="9" r="6" /><path d="M12 15v7M9 19h6" />
              </svg>
            </div>
            <span>Female</span>
          </div>
        </div>
      </div>

      {/* REUSABLE COMPONENT USAGE */}
      <StepProgressButton 
        currentStep={1} 
        totalSteps={20} 
        disabled={!selectedGender} 
        onClick={handleNext} 
      />
    </div>
  );
};

export default Gender;