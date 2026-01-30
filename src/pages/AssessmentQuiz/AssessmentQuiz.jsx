import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssessmentQuiz.css';

// Custom Emoji Component (Face Colors + Expressions)
const QuizEmoji = ({ type, bgColor, strokeColor }) => {
  const renderMouth = () => {
    switch (type) {
      case 'happy': // Strongly Agree
        return <path d="M10 16C10 16 11.5 18 15 18C18.5 18 20 16 20 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case 'smile': // Somewhat Agree
        return <path d="M11 17C11 17 12.5 18 15 18C17.5 18 19 17 19 17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case 'neutral': // Neutral
        return <path d="M11 17H19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case 'confused': // Okay-okay
        return <path d="M19 18C19 18 17.5 16 15 16C12.5 16 11 18 11 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      case 'sad': // Strongly Disagree
        return <path d="M20 18C20 18 18.5 15 15 15C11.5 15 10 18 10 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />;
      default:
        return null;
    }
  };

  return (
    <div className="emoji-double-ring">
      <div className="emoji-outer-ring">
        <div className="emoji-inner-circle" style={{ backgroundColor: bgColor }}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            {/* Eyes */}
            <circle cx="11" cy="11" r="1.5" fill={strokeColor} />
            <circle cx="19" cy="11" r="1.5" fill={strokeColor} />
            {/* Mouth */}
            {renderMouth()}
          </svg>
        </div>
      </div>
    </div>
  );
};

const AssessmentQuiz = () => {
  const navigate = useNavigate();
  
  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Questions Data
  const questions = [
    {
      id: 1,
      text: "I believe relationships help both people grow."
    },
    {
      id: 2,
      text: "When I realise I've hurt someone, I try to take responsibility and reconnect."
    },
    {
      id: 3,
      text: "I rarely talk about your feelings and emotions."
    }
  ];

  // Options Configuration (Colors matched to your screenshots)
  const options = [
    { id: 0, label: "Strongly agree", iconType: "happy", bg: '#432C51', stroke: '#FFFFFF' },
    { id: 1, label: "Somewhat agree", iconType: "smile", bg: '#9E6CAD', stroke: '#FFFFFF' },
    { id: 2, label: "Neutral", iconType: "neutral", bg: '#D4B3E0', stroke: '#1A1A1A' },
    { id: 3, label: "Okay- okay", iconType: "confused", bg: '#F2E4F4', stroke: '#1A1A1A' },
    { id: 4, label: "Strongly disagree", iconType: "sad", bg: '#FFFFFF', stroke: '#1A1A1A' }
  ];

  const handleNext = () => {
    if (selectedOption === null) return;
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null); // Reset selection
    } else {
      navigate('/result');
    }
  };

  // Calculate Progress for Ring
  const totalQuestions = questions.length;
  const progressPercentage = ((currentQuestionIndex + (selectedOption !== null ? 1 : 0)) / totalQuestions) * 100;
  // Circle circumference is approx 239 (2 * pi * 38)
  const strokeDashoffset = 239 - (239 * progressPercentage) / 100;

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        
        {/* Header */}
        <header className="quiz-header">
          <button className="quiz-back-btn" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div className="quiz-header-text">
             <span className="quiz-subtitle">Growth, Readiness &</span>
             <h3 className="quiz-title">Emotional Maturity</h3>
          </div>
          <div style={{ width: 24 }}></div>
        </header>

        {/* Main Content */}
        <main className="quiz-main">
          <h1 className="quiz-question">
            {questions[currentQuestionIndex].text}
          </h1>

          <div className="quiz-options-list">
            {options.map((opt) => (
              <div 
                key={opt.id} 
                className={`quiz-option-row ${selectedOption === opt.id ? 'is-active' : ''}`}
                onClick={() => setSelectedOption(opt.id)}
              >
                <QuizEmoji type={opt.iconType} bgColor={opt.bg} strokeColor={opt.stroke} />
                <span className="quiz-option-text">{opt.label}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Footer with Ring Button */}
        <footer className="quiz-footer">
          <div className="quiz-progress-box">
            <svg className="quiz-ring-svg" width="90" height="90">
                {/* Background Track */}
                <circle className="quiz-ring-track" cx="45" cy="45" r="38" />
                {/* Progress Fill */}
                <circle 
                    className="quiz-ring-fill" 
                    cx="45" cy="45" r="38" 
                    style={{ strokeDashoffset: selectedOption !== null ? strokeDashoffset : 239 }} 
                />
            </svg>
            
            <button 
                className={`quiz-next-fab ${selectedOption !== null ? 'is-ready' : ''}`}
                onClick={handleNext}
                disabled={selectedOption === null}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AssessmentQuiz;