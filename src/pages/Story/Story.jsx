import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./Story.css";

const Story = () => {
  const [story, setStory] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    if (story.trim()) {
      navigate('/Working', { 
        state: { ...location.state, story: story.trim() } 
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppLayout>
        <div className="story-wrapper">
      {/* Status Bar space holder */}
      <div className="status-bar">
        <div className="status-icons"></div>
      </div>

      {/* Back Button */}
      <div className="story-header">
        <button className="story-back" onClick={handleBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Text Content */}
      <div className="story-content">
        <h1 className="story-title">What’s your story?</h1>
        <p className="story-subtitle">
          Write about your journey in 100 words.
        </p>

        {/* Story Input Box */}
        <div className="story-input-container">
          <textarea 
            className="story-textarea" 
            placeholder="Write Your Story"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Background Dotted Graphics */}
      <div className="story-background-graphics">
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M-50 480 C 100 450, 300 420, 150 280 C 50 150, 200 100, 380 250 C 450 350, 480 500, 500 600" 
            stroke="#E8E0E8" 
            strokeWidth="2" 
            strokeDasharray="8 8" 
          />
        </svg>
      </div>

      {/* Bottom Navigation using StepProgressButton */}
      <div className="story-footer">
        <StepProgressButton 
          currentStep={7} 
          totalSteps={15} 
          disabled={!story.trim()} 
          onClick={handleNext} 
        />
      </div>
    </div>
    </AppLayout>
  );
};

export default Story;