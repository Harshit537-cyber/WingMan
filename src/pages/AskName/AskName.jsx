import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskName.css';

const AskName = () => {
  const location = useLocation();
  const gender = location.state?.gender; // Pichle page se gender liya
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (name.trim()) {
      navigate('/hy', { state: { gender, name } }); // Gender aur Name dono pass kiye
    }
  };

  return (
    <AppLayout> 
    <div className="name-container">

      {/* <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
      </div> */}

      <div className="content-wrapper">
        <OnboardingHeader 
          title="Cool, what's your name?" 
          description="I'll save it as your display name."
        />

        <div className="input-group slide-up-delay">
          <input 
            type="text" 
            className="name-input" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      {/* Step 2 of 20 */}
      <StepProgressButton 
        currentStep={2} 
        totalSteps={20} 
        disabled={!name.trim()} 
        onClick={handleNext} 
      />
    </div>
    </AppLayout> 
  );
};

export default AskName;