import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Study.css';

const Study = () => {
  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Button is enabled only when both fields have text
  const isFormValid = university.trim() !== '' && course.trim() !== '';

  const handleNext = () => {
    if (isFormValid) {
      navigate('/Work', { 
        state: { 
          ...location.state, 
          university: university, 
          course: course 
        } 
      });
    }
  };

  return (
    <AppLayout>
      <div className="study-screen-container">
        
        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-20 140 C 50 190, 200 180, 250 150 C 300 120, 380 140, 420 170" 
                  stroke="#E2D8E8" strokeWidth="2.5" strokeDasharray="8 10" />
          </svg>
        </div>

        {/* TOP SECTION: Shared Header Component */}
        <div className="native-header-section">
          <OnboardingHeader 
            title="What do you do study?" 
            description="Tell us about your studies! Where are you studying and in which course or degree?
"
          />
        </div>

        {/* MIDDLE SECTION: Input Cards */}
        <div className="study-body-content">
          <div className="input-cards-wrapper slide-up-delay">
            
            {/* Card 1: University */}
            <div className="input-card">
              <div className="card-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>Where Do You Study?</span>
              </div>
              <div className="inner-input-box">
                <input 
                  type="text" 
                  placeholder="School/ University Name" 
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            </div>

            {/* Card 2: Course */}
            <div className="input-card">
              <div className="card-label">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <span>Your Course</span>
              </div>
              <div className="inner-input-box">
                <input 
                  type="text" 
                  placeholder="Course Or Degree" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Step 9 Progress Button */}
        <div className="study-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={9} 
            totalSteps={15} 
            disabled={!isFormValid} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Study;