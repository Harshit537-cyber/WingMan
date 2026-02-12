import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import { handleDynamicSubmit } from "../../utils/quizHelpers"; // 🔥 Helper Import
import "./RelationshipInputQuiz.css";

const RelationshipInputQuiz = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const [showExitModal, setShowExitModal] = useState(false); 
  const [loading, setLoading] = useState(false); // 🔥 Loading state for API

  const QUIZ_NAME = "Lifestyle & Value";

  const handleFinalSubmit = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);

    try {
        const currentAnswer = {
          question: "What’s one thing that really matters to you in a relationship?",
          selectedOption: answer.trim()
        };

        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const quizIndex = progress.findIndex(q => q.quizName === QUIZ_NAME);

        if (quizIndex !== -1) {
          const answerIndex = progress[quizIndex].answers.findIndex(
            a => a.question === currentAnswer.question
          );
          if (answerIndex !== -1) {
            progress[quizIndex].answers[answerIndex] = currentAnswer;
          } else {
            progress[quizIndex].answers.push(currentAnswer);
          }
        } else {
          progress.push({
            quizName: QUIZ_NAME,
            answers: [currentAnswer]
          });
        }

        // 1. Storage update karo
        localStorage.setItem("quiz_progress", JSON.stringify(progress));

        // 2. 🔥 DYNAMIC API CALL: Check if this is the last card
        await handleDynamicSubmit(progress, navigate, setLoading);

    } catch (error) {
        console.error("Submission failed:", error);
        setLoading(false);
        alert("Something went wrong. Please try again.");
    }
  };

  const handleExit = () => {
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    const filteredProgress = progress.filter((q) => q.quizName !== QUIZ_NAME);
    localStorage.setItem("quiz_progress", JSON.stringify(filteredProgress));
    navigate('/pick-card', { replace: true });
  };

  return (
    <AppLayout>
      {/* EXIT POP-UP MODAL */}
      {showExitModal && (
        <div className="exit-modal-overlay">
          <div className="exit-modal-box">
            <h3>Exit Quiz?</h3>
            <p>Your current progress for this card will not be saved.</p>
            <div className="modal-btns">
              <button className="cancel-btn" onClick={() => setShowExitModal(false)}>Keep Going</button>
              <button className="confirm-btn" onClick={handleExit}>Exit</button>
            </div>
          </div>
        </div>
      )}

      <div className={`quiz-web-wrapper ${showExitModal ? 'blur-bg' : ''}`}>
        <div className="quiz-card-container">
          <header className="quiz-header-section">
            <button className="back-btn-quiz" onClick={() => setShowExitModal(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 className="header-title-quiz">Lifestyle & Value</h2>
          </header>

          <div className="quiz-content-main">
            <h1 className="question-text-main">
              What’s one thing that really matters to you in a relationship?
            </h1>

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

          <div className="quiz-footer-action">
            <StepProgressButton
              currentStep={5}
              totalSteps={5}
              disabled={!answer.trim() || loading} // loading ke waqt disable
              onClick={handleFinalSubmit}
              resetKey={answer}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RelationshipInputQuiz;