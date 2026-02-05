import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";

import "./DatingReactionQuiz.css";

// Exact paths
import beachImg from "../../assets/img8/Digital Nomad Working Near Beach 1.png";
import talkImg from "../../assets/img8/Walk Together 4.png";
import distractImg from "../../assets/img8/has.png";
import busyImg from "../../assets/img8/Clean Up 2.png";

const DatingReactionQuiz = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, text: "Take some time alone to recharge and think.", img: beachImg },
    { id: 2, text: "Talk it out with someone I trust.", img: talkImg },
    { id: 3, text: "Distract myself with music, shows, or hobbies.", img: distractImg },
    { id: 4, text: "Try to stay busy and push through.", img: busyImg },
  ];

  const BASE_STEP = 4;
  const TOTAL_STEPS = 6;

  const handleNext = () => {
    if (selectedOption) {
      navigate("/life-style-card");
    }
  };

  return (
    <div className="dating-quiz-wrapper">
      <AppLayout>
        <div className="dating-quiz-container">
          {/* Header */}
          <div className="dating-header-nav">
            <button className="back-btn-circle" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                    <img src={option.img} alt="illustration" className="dating-illustration" />
                  </div>

                  {/* Implementation of the Tick Design from File 1 */}
                  {selectedOption === option.id && (
                    <div className="selection-tick-wrapper">
                      <div className="horizontal-line-divider"></div>
                      <div className="complex-tick-container">
                        <svg className="tick-progress-ring" width="44" height="44">
                          <circle
                            cx="22" cy="22" r="19"
                            stroke="#432C51" strokeWidth="2"
                            fill="none"
                            strokeDasharray="120" strokeDashoffset="40"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="inner-tick-circle">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="dating-footer-section">
            <StepProgressButton
              currentStep={BASE_STEP}
              totalSteps={TOTAL_STEPS}
              disabled={!selectedOption}
              onClick={handleNext}
              resetKey={selectedOption}
            />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default DatingReactionQuiz;