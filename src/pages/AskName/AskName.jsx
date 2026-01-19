import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
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
    <div className="name-container">
      {/* Background Animated Line */}
      {/* <div className="bg-animation-wrapper">
        <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="animated-path">
          <path 
            d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450" 
            stroke="#E2D8E8" 
            strokeWidth="2" 
            strokeDasharray="8 8" 
          />
        </svg>
      </div> */}

      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="content-wrapper">
        <h1 className="title slide-in-left">Cool, what's your name?</h1>
        <p className="subtitle fade-in-delay">I'll save it as your display name.</p>

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
  );
};

export default AskName;