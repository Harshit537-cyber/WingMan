import React, { useState } from "react";
import "./Education.css";

const Education = () => {
  // State to handle click/selection
  const [selected, setSelected] = useState("Undergraduate");

  const eduOptions = [
    "High School",
    "Undergraduate",
    "Postgraduate",
    "Doctorate",
  ];

  return (
    <div className="education-container">
      <div className="education-wrapper">
        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-icons"></div>
        </div>

        {/* Back Button */}
        <div className="edu-header">
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

        <div className="edu-content">
          <h1 className="edu-title">And your education?</h1>
          <p className="edu-subtitle">
            what’s the highest degree or field you studied in?
          </p>

          <div className="edu-grid-container">
            {/* Connectors - Photo ke according fixed path lines */}
            <div className="connector h-top"></div>
            <div className="connector h-bottom"></div>
            <div className="connector v-right"></div>

            <div className="edu-grid">
              {eduOptions.map((option) => (
                <div
                  key={option}
                  // Dynamic class based on selection
                  className={`edu-pill ${selected === option ? "active" : ""}`}
                  onClick={() => setSelected(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Wave */}
        <div className="edu-background-graphics">
          <svg
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-20 140 C 60 200, 220 180, 280 150 C 340 120, 420 150, 450 180"
              stroke="#E8E0E8"
              strokeWidth="2.5"
              strokeDasharray="8 10"
            />
          </svg>
        </div>

        <div className="edu-footer">
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

export default Education;
