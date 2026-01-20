import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './OnboardingHeader.css';

const OnboardingHeader = ({ title, subtitle, showSkip = false, onSkip }) => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-header-container">
      {/* Top Row: Back and Optional Skip */}
      <div className="header-actions">
        <button className="back-icon-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
        
        {showSkip && (
          <button className="skip-text-btn" onClick={onSkip}>
            Skip
          </button>
        )}
      </div>

      {/* Text Section */}
      <div className="header-text-wrapper">
        <h1 className="header-main-title slide-in-left">{title}</h1>
        {subtitle && (
          <p className="header-sub-text fade-in-delayed">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default OnboardingHeader;