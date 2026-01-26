import React, { useState } from "react";
import "./Religion.css";

const Religion = () => {
  const [selectedReligion, setSelectedReligion] = useState("Hinduism");

  const religions = [
    "Christianity",
    "Hinduism",
    "Islam",
    "Sikhism",
    "Jainism",
    "Buddhism",
    "Not Belive",
  ];

  return (
    <div className="religion-container">
      <div className="religion-wrapper">
        {/* Status Bar */}
        <div className="status-bar">
    
          <div className="status-icons">
        
          </div>
        </div>

        {/* Header with Back and Skip */}
        <div className="religion-header">
          <button className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="skip-btn">Skip</button>
        </div>

        {/* Content Section */}
        <div className="religion-content">
          <h1 className="religion-title">Do you follow any particular religion?</h1>
          <p className="religion-subtitle">You can totally skip it if you'd like.</p>

          {/* Display Box */}
          <div className="religion-display-box">
            <span>{selectedReligion || "What's It"}</span>
          </div>

          {/* Religion Selection Card */}
          <div className="religion-card">
            <div className="card-header">
              Please select your religion
            </div>
            <div className="religion-list">
              {religions.map((religion) => (
                <div
                  key={religion}
                  className={`religion-item ${selectedReligion === religion ? "selected" : ""}`}
                  onClick={() => setSelectedReligion(religion)}
                >
                  {religion}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Next Button */}
        <div className="religion-footer">
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
    </div>
  );
};

export default Religion;