import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout"; // Added Layout
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton"; // Added Standard Button
import "./ConflictQuiz.css";

// Custom Emoji Component
const QuizEmoji = ({ type, bgColor, strokeColor }) => {
  const renderMouth = () => {
    switch (type) {
      case "sa": return <path d="M10 16C10 16 11.5 18 15 18C18.5 18 20 16 20 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case "swa": return <path d="M11 17C11 17 12.5 18 15 18C17.5 18 19 17 19 17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case "n": return <path d="M11 17H19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case "oo": return <path d="M19 18C19 18 17.5 16 15 16C12.5 16 11 18 11 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case "sd": return <path d="M20 18C20 18 18.5 15 15 15C11.5 15 10 18 10 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      default: return null;
    }
  };

  return (
    <div className="emoji-double-ring">
      <div className="emoji-outer-ring">
        <div className="emoji-inner-circle" style={{ backgroundColor: bgColor }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="11" cy="11" r="1.5" fill={strokeColor} />
            <circle cx="19" cy="11" r="1.5" fill={strokeColor} />
            {renderMouth()}
          </svg>
        </div>
      </div>
    </div>
  );
};

const ConflictQuiz = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const options = [
    { id: "sa", label: "Strongly agree", bg: "#432C51", stroke: "#FFFFFF" },
    { id: "swa", label: "Somewhat agree", bg: "#9E6CAD", stroke: "#FFFFFF" },
    { id: "n", label: "Neutral", bg: "#D4B3E0", stroke: "#1A1A1A" },
    { id: "oo", label: "Okay- okay", bg: "#F2E4F4", stroke: "#1A1A1A" },
    { id: "sd", label: "Strongly disagree", bg: "#FFFFFF", stroke: "#1A1A1A" },
  ];

  // 🔥 SETTINGS
  const CURRENT_STEP = 1;
  const TOTAL_STEPS = 5; // Is card ke total steps (Adjust if needed)

  const handleNext = () => {
    if (!selected) return;

    // 1. Data Prepare
    const selectedText = options.find(opt => opt.id === selected).label;
    const currentQuestion = "After a disagreement, I’m usually the one to take the first step toward making things right.";
    
    // 2. Local Storage Logic
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    const quizName = "Conflict & Repair Patterns"; // Exact name from PickCard
    let quizIndex = progress.findIndex(q => q.quizName === quizName);

    const newAnswer = { 
        question: currentQuestion, 
        selectedOption: selectedText 
    };

    if (quizIndex !== -1) {
        // Update or Append
        const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
        if (answerIndex !== -1) {
            progress[quizIndex].answers[answerIndex] = newAnswer;
        } else {
            progress[quizIndex].answers.push(newAnswer);
        }
    } else {
        // New Entry
        progress.push({
            quizName: quizName,
            answers: [newAnswer]
        });
    }

    // 3. Save & Navigate
    localStorage.setItem("quiz_progress", JSON.stringify(progress));
    navigate("/repair-patternQuiz", { replace: true });
  };

  return (
    <AppLayout>
      <div className="conflict-quiz-wrapper">
        <div className="conflict-quiz-container">
          {/* Header */}
          <header className="conflict-header">
            <button className="conflict-back-btn" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h3 className="conflict-nav-title">Conflict & Repair Patterns</h3>
          </header>

          {/* Main Question */}
          <main className="conflict-main">
            <h1 className="conflict-question">
              After a disagreement, I’m usually the one to take the first step
              toward making things right.
            </h1>

            <div className="conflict-options-list">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className={`conflict-option-row ${selected === opt.id ? "is-active" : ""}`}
                  onClick={() => setSelected(opt.id)}
                >
                  <QuizEmoji type={opt.id} bgColor={opt.bg} strokeColor={opt.stroke} />
                  <span className="conflict-option-text">{opt.label}</span>
                </div>
              ))}
            </div>
          </main>

          {/* Progress Footer - Replacing custom with standard */}
          <footer className="conflict-footer">
            <StepProgressButton 
              currentStep={CURRENT_STEP} 
              totalSteps={TOTAL_STEPS} 
              disabled={!selected} 
              onClick={handleNext} 
              resetKey={selected}
            />
          </footer>
        </div>
      </div>
    </AppLayout>
  );
};

export default ConflictQuiz;