import React from "react";
import "./Study.css";

const Study = () => {
  return (
    <div className="study-container">
      <div className="study-wrapper">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-icons"></div>
        </div>

        {/* Back Button */}
        <div className="study-header">
          <button className="back-btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#523461"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="study-content">
          <h1 className="study-title">What do you do study?</h1>
          <p className="study-subtitle">
            Tell us about your studies! Where are you studying and in which
            course or degree?
          </p>

          {/* Card 1: Where Do You Study */}
          <div className="input-card">
            <div className="card-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#523461"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              <span>Where Do You Study?</span>
            </div>
            <div className="inner-input-box">
              <input type="text" placeholder="School/ University Name" />
            </div>
          </div>

          {/* Card 2: Your Course */}
          <div className="input-card">
            <div className="card-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#523461"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Your Course</span>
            </div>
            <div className="inner-input-box">
              <input type="text" placeholder="Course Or Degree" />
            </div>
          </div>
        </div>

        {/* Background Dotted Wave */}
        <div className="study-background-graphics">
          <svg
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-20 140 C 50 190, 200 180, 250 150 C 300 120, 380 140, 420 170"
              stroke="#E8E0E8"
              strokeWidth="2.5"
              strokeDasharray="8 10"
            />
          </svg>
        </div>

        {/* Footer Next Button */}
        <div className="study-footer">
          <div className="next-btn-container">
            <div className="progress-circle"></div>
            <button className="purple-next-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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

export default Study;
