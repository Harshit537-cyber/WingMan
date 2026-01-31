import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DatingReactionQuiz.css";

// Exact paths based on your previous messages
import beachImg from "../../assets/img8/Digital Nomad Working Near Beach 1.png";
import talkImg from "../../assets/img8/Walk Together 4.png";
import distractImg from "../../assets/img8/has.png"; // Ensure this filename is correct in your folder
import busyImg from "../../assets/img8/Clean Up 2.png";

const DatingReactionQuiz = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 1,
      text: "Take some time alone to recharge and think.",
      img: beachImg,
    },
    {
      id: 2,
      text: "Talk it out with someone I trust.",
      img: talkImg,
    },
    {
      id: 3,
      text: "Distract myself with music, shows, or hobbies.",
      img: distractImg,
    },
    {
      id: 4,
      text: "Try to stay busy and push through.",
      img: busyImg,
    },
  ];

  const handleNext = () => {
    if (selectedOption) {
      console.log("Option selected:", selectedOption);
      navigate("/life-style-card");
    }
  };

  return (
    <div className="dating-quiz-wrapper">
      <div className="dating-quiz-container">
        {/* Header */}
        <div className="dating-header-nav">
          <button className="back-btn-circle" onClick={() => navigate(-1)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#432C51"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h3 className="dating-top-title">Attachment & Comfort Zone</h3>
        </div>

        {/* Question Section */}
        <div className="dating-content-area">
          <h1 className="dating-main-heading">
            When I feel overwhelmed, I usually:
          </h1>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="dating-grid-layout">
          {options.map((option) => (
            <div
              key={option.id}
              className={`dating-grid-card ${selectedOption === option.id ? "active" : ""}`}
              onClick={() => setSelectedOption(option.id)}
            >
              <p className="dating-card-text">{option.text}</p>
              <div className="dating-img-holder">
                <img
                  src={option.img}
                  alt="illustration"
                  className="dating-illustration"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="dating-footer-section">
          <div className="dating-progress-wrap">
            <svg className="dating-circle-svg" width="90" height="90">
              <circle className="dating-bg-ring" cx="45" cy="45" r="38" />
              <circle
                className="dating-fill-ring"
                cx="45"
                cy="45"
                r="38"
                style={{ strokeDashoffset: selectedOption ? 120 : 239 }}
              />
            </svg>
            <button
              className={`dating-next-btn ${selectedOption ? "is-enabled" : ""}`}
              disabled={!selectedOption}
              onClick={handleNext}
            >
              <svg
                width="28"
                height="28"
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

export default DatingReactionQuiz;
