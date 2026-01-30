import React, { useState } from 'react';
import './StepProgressButton.css';

const StepProgressButton = ({ currentStep = 0, totalSteps = 10, disabled, onClick }) => {
  // Local state to prevent double clicking on one screen
  const [hasClicked, setHasClicked] = useState(false);

  // Calculate percentage based on props
  const progressPercent = (currentStep / totalSteps) * 100;

  const handleClick = () => {
    // Only proceed if not disabled and hasn't been clicked yet
    if (!disabled && !hasClicked) {
      setHasClicked(true); 
      onClick();
    }
  };

  return (
    <div className={`step-btn-container ${disabled ? 'btn-disabled' : ''}`}>
      <div className="outer-card-wrapper">
        {/* SVG Progress Circle */}
        <svg className="progress-svg" viewBox="0 0 65.45 65.45">
          {/* Background Track (FFEDF5) */}
          <circle
            cx="32.725"
            cy="32.725"
            r="30.725"
            fill="none"
            stroke="#FFEDF5"
            strokeWidth="4"
          />
          {/* Active Progress Circle (5B3765) */}
          <circle
            cx="32.725"
            cy="32.725"
            r="30.725"
            fill="none"
            stroke="#5B3765"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            style={{
                strokeDashoffset: 100 - progressPercent,
                transition: 'stroke-dashoffset 0.5s ease-in-out'
            }}
            transform="rotate(-90 32.725 32.725)"
          />
        </svg>

        {/* Inner Button Card */}
        <button 
          className="inner-card-btn" 
          onClick={handleClick}
          disabled={disabled || hasClicked}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepProgressButton;