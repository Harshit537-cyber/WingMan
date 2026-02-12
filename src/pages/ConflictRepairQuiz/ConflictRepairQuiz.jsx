import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import { handleDynamicSubmit } from '../../utils/quizHelpers'; // 🔥 Helper Import
import './ConflictRepairQuiz.css';

// Exact SVG faces as per the design
const CustomFace = ({ type, isSelected }) => {
  const color = isSelected ? "#FFFFFF" : "#000000";
  const getPath = () => {
    switch(type) {
      case 'sa': return <path d="M10 20C12 22 16 22 18 20" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'swa': return <path d="M11 20.5C12.5 21.5 15.5 21.5 17 20.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'n': return <line x1="11" y1="21" x2="17" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>;
      case 'oo': return <path d="M11 21.5C12.5 20.5 15.5 20.5 17 21.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'sd': return <path d="M10 22C12 20 16 20 18 22" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      default: return null;
    }
  };
  return (
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="10" cy="13" r="1.2" fill={color} />
      <circle cx="18" cy="13" r="1.2" fill={color} />
      {getPath()}
    </svg>
  );
};

const ConflictRepairQuiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [loading, setLoading] = useState(false); // 🔥 Loading State

  const QUIZ_NAME = "Conflict & Repair Patterns";

  const questions = [
    { id: 1, title: "I often focus more on being right than on being understood." },
    { id: 2, title: "I find it difficult to stay calm when I feel misunderstood." }
  ];

  const options = [
    { id: 'sa', type: 'sa', text: "Strongly agree", bgColor: "#4D2C5A" },
    { id: 'swa', type: 'swa', text: "Somewhat agree", bgColor: "#9C6DA8" },
    { id: 'n', type: 'n', text: "Neutral", bgColor: "#CAA7D2" },
    { id: 'oo', type: 'oo', text: "Okay- okay", bgColor: "#E6D4EB" },
    { id: 'sd', type: 'sd', text: "Strongly disagree", bgColor: "#F5EBF7" }
  ];

  const CURRENT_STEP = 3 + currentIndex; // Step 1 & 2 were in prev files
  const TOTAL_STEPS = 4; 

  const handleExit = () => {
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    const filteredProgress = progress.filter(q => q.quizName !== QUIZ_NAME);
    localStorage.setItem("quiz_progress", JSON.stringify(filteredProgress));
    navigate('/pick-card', { replace: true });
  };

  const handleNext = async () => {
    if (!selectedOption || loading) return;

    const currentQuestionText = questions[currentIndex].title;
    const selectedText = options.find(opt => opt.id === selectedOption).text;
    
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    let quizIndex = progress.findIndex(q => q.quizName === QUIZ_NAME);

    const newAnswer = { question: currentQuestionText, selectedOption: selectedText };

    if (quizIndex !== -1) {
        const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestionText);
        if (answerIndex !== -1) progress[quizIndex].answers[answerIndex] = newAnswer;
        else progress[quizIndex].answers.push(newAnswer);
    } else {
        progress.push({ quizName: QUIZ_NAME, answers: [newAnswer] });
    }

    localStorage.setItem("quiz_progress", JSON.stringify(progress));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      // 🔥 FINAL QUESTION: Dynamic API Call
      setLoading(true);
      await handleDynamicSubmit(progress, navigate, setLoading);
    }
  };

  return (
    <AppLayout>
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

      <div className={`conflict-quiz-wrapper ${showExitModal ? 'blur-bg' : ''}`}>
        <div className="conflict-quiz-container">
          <header className="conflict-header">
            {/* 🔥 Smart Back Button */}
            <button className="conflict-back-btn" onClick={() => currentIndex > 0 ? setCurrentIndex(prev => prev - 1) : setShowExitModal(true)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <h3 className="conflict-nav-title">Conflict & Repair Patterns</h3>
          </header>

          <main className="conflict-main">
            <h1 className="conflict-question">{questions[currentIndex].title}</h1>
            <div className="conflict-options-list">
              {options.map((opt) => (
                <div key={opt.id} className={`conflict-option-row ${selectedOption === opt.id ? 'is-active' : ''}`} onClick={() => setSelectedOption(opt.id)}>
                  <div className="emoji-double-ring">
                    <div className="emoji-outer-ring">
                      <div className="emoji-inner-circle" style={{ backgroundColor: selectedOption === opt.id ? "#331B3D" : opt.bgColor }}>
                        <CustomFace type={opt.type} isSelected={selectedOption === opt.id} />
                      </div>
                    </div>
                  </div>
                  <span className="conflict-option-text">{opt.text}</span>
                </div>
              ))}
            </div>
          </main>

          <footer className="conflict-footer">
             <StepProgressButton 
                currentStep={CURRENT_STEP} 
                totalSteps={TOTAL_STEPS} 
                disabled={!selectedOption || loading} 
                onClick={handleNext}
                resetKey={currentIndex} 
             />
          </footer>
        </div>
      </div>
    </AppLayout>
  );
};

export default ConflictRepairQuiz;