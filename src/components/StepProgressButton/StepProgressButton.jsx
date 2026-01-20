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
      {/* Curved dashed line background (jo image mein niche hai) */}
      <div className="curved-line">
        <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
          <path 
            d="M0,30 Q100,10 200,30 T400,30" 
            fill="none" 
            stroke="#E2D8E8" 
            strokeWidth="2" 
            strokeDasharray="8,8" 
          />
        </svg>
      </div>

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