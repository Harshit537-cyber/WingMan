import React from "react";
import "./Native.css";

const Native = () => {
  return (
    <div className="native-wrapper">
      {/* Status Bar (Optional - for exact look) */}
      <div className="status-bar">
        
        <div className="status-icons">
        
        
          
        </div>
      </div>

      {/* Back Button */}
      <div className="native-header">
        <button className="native-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="native-content">
        <h1 className="native-title">What’s your native state?</h1>
        <p className="native-subtitle">
          It’s good to know where’s someone story began.
        </p>

        <div className="native-select-container">
          <div className="native-select-box">
            <span>Select State</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Background Dotted Path (SVG) */}
      <div className="background-graphics">
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M-50 450 C 50 420, 250 380, 200 250 C 150 120, 20 150, 50 300 C 80 450, 400 350, 450 200" 
            stroke="#E8E0E8" 
            strokeWidth="2" 
            strokeDasharray="8 8" 
          />
        </svg>
      </div>

      {/* Next Button with Progress Ring */}
      <div className="native-footer">
        <button className="native-next-wrapper">
          <div className="progress-ring"></div>
          <div className="native-next-btn">
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

export default Native;