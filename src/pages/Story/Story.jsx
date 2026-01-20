import React from "react";
import "./Story.css";

const Story = () => {
  return (
    <div className="story-wrapper">
      {/* Status Bar */}
      <div className="status-bar">
    
        <div className="status-icons">
         
        </div>
      </div>

      {/* Back Button */}
      <div className="story-header">
        <button className="story-back">
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

      {/* Bottom Navigation Button */}
      <div className="story-footer">
        <button className="story-next-wrapper">
          <div className="progress-ring"></div>
          <div className="story-next-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Story;