import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./RepairPatternQuiz.css";

// Images paths
import imgAvoid from "../../assets/img12/character-1.png";
import imgAddress from "../../assets/img12/Group.png";
import imgCompromise from "../../assets/img12/Characters.png";
import imgReflect from "../../assets/img12/character-2.png";

const ConflictRepairQuiz = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const quizOptions = [
    { id: "opt1", text: "Avoid it until things calm down", image: imgAvoid },
    { id: "opt2", text: "Address it right away", image: imgAddress },
    { id: "opt3", text: "Compromise quickly to move on", image: imgCompromise },
    { id: "opt4", text: "Reflect before bringing it up", image: imgReflect },
  ];

  // 🔥 SETTINGS
  const CURRENT_STEP = 2;
  const TOTAL_STEPS = 5;

  const handleNext = () => {
    if (!selectedId) return;

    const selectedText = quizOptions.find(opt => opt.id === selectedId).text;
    const currentQuestion = "When conflict arises, I tend to:";
    
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    const quizName = "Conflict & Repair Patterns"; 
    let quizIndex = progress.findIndex(q => q.quizName === quizName);

    const newAnswer = { question: currentQuestion, selectedOption: selectedText };

    if (quizIndex !== -1) {
        const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
        if (answerIndex !== -1) {
            progress[quizIndex].answers[answerIndex] = newAnswer;
        } else {
            progress[quizIndex].answers.push(newAnswer);
        }
    } else {
        progress.push({ quizName: quizName, answers: [newAnswer] });
    }

    localStorage.setItem("quiz_progress", JSON.stringify(progress));
    navigate("/conflict-repair-Quiz", { replace: true });
  };

  return (
    <AppLayout>
      <div className="crp-page-wrapper">
        <div className="crp-container">
          <header className="crp-header">
            <button className="crp-back-btn" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h2 className="crp-nav-title">Conflict & Repair Patterns</h2>
          </header>

          <main className="crp-content">
            <h1 className="crp-question">When conflict arises, I tend to:</h1>

            <div className="crp-options-grid">
              {quizOptions.map((item) => (
                <div
                  key={item.id}
                  className={`crp-card ${selectedId === item.id ? "crp-selected" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <p className="crp-card-text">{item.text}</p>
                  <div className="crp-img-container">
                    <img src={item.image} alt="illustration" className="crp-card-img" />
                  </div>

                  {/* Tick Design Consistency */}
                  {selectedId === item.id && (
                    <div className="selection-tick-wrapper">
                      <div className="horizontal-line-divider"></div>
                      <div className="complex-tick-container">
                        <svg className="tick-progress-ring" width="44" height="44">
                          <circle cx="22" cy="22" r="19" stroke="#5D326F" strokeWidth="2" fill="none" strokeDasharray="120" strokeDashoffset="40" strokeLinecap="round" />
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
          </main>

          <footer className="crp-footer">
            <StepProgressButton 
              currentStep={CURRENT_STEP} 
              totalSteps={TOTAL_STEPS} 
              disabled={!selectedId} 
              onClick={handleNext} 
              resetKey={selectedId}
            />
          </footer>
        </div>
      </div>
    </AppLayout>
  );
};

export default ConflictRepairQuiz;