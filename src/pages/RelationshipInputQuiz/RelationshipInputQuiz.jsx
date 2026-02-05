import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./RelationshipInputQuiz.css";

const RelationshipInputQuiz = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");

  return (
    <AppLayout>
      <div className="quiz-web-wrapper">
        <div className="quiz-card-container">
          {/* Header Section */}
          <div className="quiz-header-section">
            <button className="back-btn-quiz" onClick={() => navigate(-1)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5D326F"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 className="header-title-quiz">Lifestyle And Value</h2>
          </div>

          <div className="quiz-content-main">
            {/* Question Text */}
            <h1 className="question-text-main">
              What’s one thing that really matters to you in a relationship?
            </h1>

            {/* Text Input Field */}
            <div className="input-field-container">
              <input
                type="text"
                className="quiz-text-input"
                placeholder="Write your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>

          {/* Footer Progress Button */}
          <div className="quiz-footer-action">
            <StepProgressButton
              currentStep={5}          // apne flow ke hisaab se
              totalSteps={5}
              disabled={!answer.trim()}
              onClick={() => navigate("/pick-card")}
              resetKey={answer}
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default RelationshipInputQuiz;
