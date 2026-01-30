import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Work.css';

const Work = () => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Logic: Enable button only when both fields are filled
  const isFormValid = company.trim() !== '' && position.trim() !== '';

  const handleNext = () => {
    if (isFormValid) {
      navigate('/Education', { 
        state: { 
          ...location.state, 
          company: company, 
          position: position 
        } 
      });
    }
  };

  return (
    <AppLayout>
      <div className="work-screen-container">
        
        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-20 140 C 50 190, 200 180, 250 150 C 300 120, 380 140, 420 170" 
                  stroke="#E2D8E8" strokeWidth="2.5" strokeDasharray="8 10" />
          </svg>
        </div>

        {/* TOP SECTION: Header component */}
        <div className="native-header-section">
          <OnboardingHeader 
            title="Where do you work?" 
            description="Tell us about your job! Where are you working and in what position?"
          />
        </div>
        

        {/* MIDDLE SECTION: Input Cards */}
        <div className="work-body-content">
          <div className="input-cards-wrapper slide-up-delay">
            
            {/* Card 1: Company */}
            <div className="input-card">
              <div className="card-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <span>Where Do You Work?</span>
              </div>
              <div className="inner-input-box">
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>

            {/* Card 2: Position */}
            <div className="input-card">
              <div className="card-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                  <line x1="12" y1="2" x2="12" y2="5"></line>
                  <line x1="12" y1="19" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="5" y2="12"></line>
                  <line x1="19" y1="12" x2="22" y2="12"></line>
                </svg>
                <span>Your Position</span>
              </div>
              <div className="inner-input-box">
                <input 
                  type="text" 
                  placeholder="Your Job Title" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Step Progress Button (Step 8) */}
        <div className="work-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={10} 
            totalSteps={15} 
            disabled={!isFormValid} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Work;