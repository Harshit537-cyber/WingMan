import React from 'react';
import { ArrowRight } from 'lucide-react';
import './StepProgressButton.css';

const StepProgressButton = ({ currentStep, totalSteps = 20, onClick, disabled }) => {
  // SVG Ring calculation logic
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = (currentStep / totalSteps) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="step-footer-container">
      {/* The Button with Progress Ring */}
      <div className={`step-btn-wrapper ${disabled ? 'disabled' : 'active'}`}>
        <button 
          className="main-action-btn" 
          onClick={!disabled ? onClick : null}
          disabled={disabled}
        >
          {/* Progress Ring SVG */}
          <svg className="progress-ring" width="80" height="80">
            <circle
              className="progress-ring-bg"
              stroke="#F3EEF6"
              strokeWidth="4"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
            <circle
              className="progress-ring-fill"
              stroke="#5a3c6d"
              strokeWidth="4"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
            />
          </svg>

          {/* Solid Circle with Arrow */}
          <div className="inner-purple-circle">
            <ArrowRight size={28} color="white" strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepProgressButton;