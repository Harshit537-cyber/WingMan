import React from "react";
import "./Work.css";

const Work = () => {
  return (
    <div className="work-container">
      <div className="work-wrapper">
        {/* Status Bar Simulation */}
        <div className="status-bar">
          <div className="status-icons"></div>
        </div>

        {/* Back Button */}
        <div className="work-header">
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

        {/* Content Section */}
        <div className="work-content">
          <h1 className="work-title">Where do you work?</h1>
          <p className="work-subtitle">
            Tell us about your job! Where are you working and in what position?
          </p>

          {/* Card 1: Where Do You Work? */}
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
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              <span>Where Do You Work?</span>
            </div>
            <div className="inner-input-box">
              <input type="text" placeholder="Company Name" />
            </div>
          </div>

          {/* Card 2: Your Position */}
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
              <input type="text" placeholder="Your Job Title" />
            </div>
          </div>
        </div>

        {/* Background Dotted Wave SVG */}
        <div className="work-background-graphics">
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

        {/* Footer with Circular Next Button */}
        <div className="work-footer">
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

export default Work;
