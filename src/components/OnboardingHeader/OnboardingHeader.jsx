import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './OnboardingHeader.css';

const OnboardingHeader = ({ title, description, showSkip = false, onSkip }) => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-header-container">
      {/* Top Navigation Row */}
      <div className="header-nav">
        <button className="back-icon-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>
        
        {showSkip && (
          <button className="skip-text-btn" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>

      {/* Text Content */}
      <div className="header-text-group">
        <h1 className="header-title slide-in-top">{title}</h1>
        {description && (
          <p className="header-description fade-in-delay">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default OnboardingHeader;