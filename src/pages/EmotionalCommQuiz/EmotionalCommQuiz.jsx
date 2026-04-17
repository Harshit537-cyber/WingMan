import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import { handleDynamicSubmit } from "../../utils/quizHelpers"; // 🔥 Helper Import
import "./EmotionalCommQuiz.css";

const EmotionalCommQuiz = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // 🔥 Loading State
  const [showExitModal, setShowExitModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const QUIZ_NAME = "Emotional Communication";

  const questions = [
    { id: 8, title: "I pick up on changes in someone’s mood quickly." },
    {
      id: 9,
      title: "I can express how I feel even when it might cause disagreement.",
    },
    {
      id: 10,
      title:
        "When my partner withdraws during a disagreement, I usually want to reach out and reconnect.",
    },
  ];

  const options = [
    { id: 5, text: "Strongly agree", icon: "☻" },
    { id: 4, text: "Somewhat agree", icon: "☺" },
    { id: 3, text: "Neutral", icon: "☺" },
    { id: 2, text: "Okay- okay", icon: "☹" },
    { id: 1, text: "Strongly disagree", icon: "☹" },
  ];

  // 🔥 STEP SETTINGS
  const BASE_STEP = 3;
  const CURRENT_STEP = BASE_STEP + currentIndex;
  const TOTAL_STEPS = 5;

  // 🔥 EXIT LOGIC
  const handleExit = () => {
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    const filteredProgress = progress.filter((q) => q.quizName !== QUIZ_NAME);
    localStorage.setItem("quiz_progress", JSON.stringify(filteredProgress));
    navigate("/pick-card", { replace: true });
  };

  const handleNext = async () => {
    if (!selectedOption || loading) return;

    const questionId = questions[currentIndex].id;
    const answerId = selectedOption;

    // ✅ Get existing flat data
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];

    // ✅ Check if question already exists
    const existingIndex = progress.findIndex((q) => q.question === questionId);

    const newEntry = {
      question: questionId,
      answer: answerId,
    };

    if (existingIndex !== -1) {
      progress[existingIndex] = newEntry;
    } else {
      progress.push(newEntry);
    }

    // ✅ FIXED (no extra array)
    localStorage.setItem("quiz_progress", JSON.stringify(progress));

    // 👉 Navigation logic
    if (currentIndex < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 400);
    } else {
      setLoading(true);

      // 🔥 send flat data directly
      await handleDynamicSubmit(progress, navigate, setLoading);
    }
  };

  return (
    <AppLayout>
      {/* EXIT MODAL */}
      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal-box">
            <h3>Exit Quiz?</h3>
            <p>Your current progress for this card will not be saved.</p>
            <div className="modal-btns">
              <button
                className="cancel-btn"
                onClick={() => setShowExitModal(false)}
              >
                Keep Going
              </button>
              <button className="confirm-btn" onClick={handleExit}>
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`quiz-web-wrapper ${showExitModal ? "blur-bg" : ""}`}>
        <div className="quiz-card-container">
          {/* Header */}
          <div className="quiz-header-section">
            {/* 🔥 SMART BACK LOGIC */}
            <button
              className="back-btn-quiz"
              onClick={() =>
                currentIndex > 0
                  ? setCurrentIndex((prev) => prev - 1)
                  : setShowExitModal(true)
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
            <h2 className="header-title-quiz">Emotional Communication</h2>
            <div className="header-spacer-quiz"></div>
          </div>

          <div className="quiz-scroll-area">
            <div
              className={`quiz-content-main ${isAnimating ? "fade-exit" : "fade-enter"}`}
            >
              <h1 className="question-text-main">
                {questions[currentIndex].title}
              </h1>

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
          </div>

          {/* Standard Footer Button */}
          <div className="quiz-footer-action">
            <StepProgressButton
              currentStep={CURRENT_STEP}
              totalSteps={TOTAL_STEPS}
              disabled={!selectedOption || loading}
              onClick={handleNext}
              resetKey={currentIndex}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmotionalCommQuiz;
