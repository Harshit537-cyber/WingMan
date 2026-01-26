import React, { useState } from "react";
import "./Working.css";

const Working = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["I’m Working", "I’m Studying", "Figuring It Out"];

  return (
    <div className="working-wrapper">
      {/* Mobile Status Bar */}
      <div className="status-bar">
        
        <div className="status-icons">
          
        </div>
      </div>

      {/* Header with Back Button */}
      <div className="working-header">
        <button className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="working-content">
        <h1 className="working-title">What’s your scene these days?</h1>
        <p className="working-subtitle">job, studies, or a creative hustle?</p>

        {/* Options List */}
        <div className="options-container">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option-card ${selectedOption === index ? "selected" : ""}`}
              onClick={() => setSelectedOption(index)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Background Dotted Wave SVG */}
      <div className="background-wave">
        <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M-20 120 C 60 190, 220 180, 280 140 C 340 100, 400 120, 450 160" 
            stroke="#E8E0E8" 
            strokeWidth="2.5" 
            strokeDasharray="8 10" 
          />
        </svg>
      </div>

      {/* Footer with Circular Next Button */}
      <div className="working-footer">
        <div className="next-btn-container">
          <div className="progress-circle"></div>
          <button className="purple-next-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Working;