import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./AttachmentQuiz.css";

const AttachmentQuiz = () => {
  const navigate = useNavigate();

  // Multi-question data array
  const questions = [
    {
      id: 1,
      title:
        "I sometimes worry that my partner might lose interest or drift away.",
    },
    {
      id: 2,
      title:
        "I love emotional closeness, but too much of it can make me want space.",
    },
    {
      id: 2,
      title:
        "Even with someone I trust, I sometimes hold back my true feelings.",
    },
  ];

  const options = [
    { id: "sa", text: "Strongly agree", icon: "☻" },
    { id: "swa", text: "Somewhat agree", icon: "☺" },
    { id: "n", text: "Neutral", icon: "☺" },
    { id: "oo", text: "Okay- okay", icon: "☹" },
    { id: "sd", text: "Strongly disagree", icon: "☹" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const BASE_STEP = 1;        // 🔥 Attachment quiz ka start step
  const TOTAL_STEPS = 6;
  const CURRENT_STEP = BASE_STEP + currentIndex;

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentIndex < questions.length - 1) {
      // "Khatnak" transition logic
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 400); // Animation delay
    } else {
      navigate("/life-style-quiz"); // Final screen par jane ke liye
    }
  };

  return (
    <AppLayout>
      <div className="quiz-web-wrapper">
        <div className="quiz-card-container">
          {/* Header */}
          <div className="quiz-header-section">
            <button
              className="back-btn-quiz"
              onClick={() =>
                currentIndex > 0
                  ? setCurrentIndex(currentIndex - 1)
                  : navigate(-1)
              }
            >
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
            <h2 className="header-title-quiz"> Attachment & Comfort Zone</h2>
          </div>

          <div
            className={`quiz-content-main ${isAnimating ? "fade-exit" : "fade-enter"}`}
          >
            {/* Dynamic Question Title */}
            <h1 className="question-text-main">
              {questions[currentIndex].title}
            </h1>

            {/* Vertical Options List */}
            <div className="habit-list-container">
              {options.map((opt, index) => (
                <div
                  key={opt.id}
                  className={`habit-row-item ${selectedOption === opt.id ? "active" : ""}`}
                  onClick={() => setSelectedOption(opt.id)}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="habit-double-circle">
                    <div className="outer-ring">
                      <div className="inner-ring">
                        <span className="emoji-char">{opt.icon}</span>
                      </div>
                    </div>
                  </div>
                  <span className="habit-label-text">{opt.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Button */}
          <div className="quiz-footer-action">
            <StepProgressButton
              currentStep={CURRENT_STEP}
              totalSteps={TOTAL_STEPS}
              disabled={!selectedOption}
              onClick={handleNext}
              resetKey={currentIndex}
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default AttachmentQuiz;
