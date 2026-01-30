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

  return (
    <AppLayout>
      <div className="story-screen-container">
        
        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path 
              d="M-50 480 C 100 450, 300 420, 150 280 C 50 150, 200 100, 380 250 C 450 350, 480 500, 500 600" 
              stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" 
            />
          </svg>
        </div>

        {/* TOP SECTION: Shared Header */}
        <div className="native-header-section">
          <OnboardingHeader 
            title="What’s your story?" 
            description="Write about your journey in 100 words."
          />
        </div>

        {/* MIDDLE SECTION: Textarea Area */}
        <div className="story-body-content">
          <div className="story-input-wrapper slide-up-delay">
            <textarea 
              className="story-textarea" 
              placeholder="Write Your Story..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* BOTTOM SECTION: Step 7 Button */}
        <div className="story-footer-action">
          <div className="footer-wavy-decoration"></div>
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