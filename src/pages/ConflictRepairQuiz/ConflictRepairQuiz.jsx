import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConflictRepairQuiz.css';

// Exact SVG faces as per the image
const CustomFace = ({ type, isSelected }) => {
  const color = isSelected ? "#FFFFFF" : "#000000";
  
  const getPath = () => {
    switch(type) {
      case 'sa': // Strongly agree - wide smile
        return <path d="M10 20C12 22 16 22 18 20" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'swa': // Somewhat agree - slight smile
        return <path d="M11 20.5C12.5 21.5 15.5 21.5 17 20.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'n': // Neutral - flat line
        return <line x1="11" y1="21" x2="17" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>;
      case 'oo': // Okay-okay - slight frown
        return <path d="M11 21.5C12.5 20.5 15.5 20.5 17 21.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
      case 'sd': // Strongly disagree - deep frown
        return <path d="M10 22C12 20 16 20 18 22" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>;
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

  const handleNext = () => {
    if (selectedOption && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="quiz-screen">
      <div className="quiz-container">
        {/* Header */}
        <header className="quiz-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <span className="header-title">Conflict & Repair Patterns</span>
          <div style={{ width: 24 }}></div>
        </header>

        {/* Question Area */}
        <main className="quiz-content">
          <h1 className="question-text">{questions[currentIndex].title}</h1>

          <div className="options-list">
            {options.map((opt) => (
              <div 
                key={opt.id} 
                className={`option-row ${selectedOption === opt.id ? 'selected' : ''}`}
                onClick={() => setSelectedOption(opt.id)}
              >
                <div className="double-ring-icon">
                  <div className="outer-border">
                    <div 
                      className="inner-fill" 
                      style={{ backgroundColor: selectedOption === opt.id ? "#331B3D" : opt.bgColor }}
                    >
                      <CustomFace type={opt.type} isSelected={selectedOption === opt.id} />
                    </div>
                  </div>
                </div>
                <span className="option-label">{opt.text}</span>
              </div>
            ))}
          </div>
        </main>

        {/* Progress Footer */}
        <footer className="quiz-footer">
          <div className="progress-fab-container">
             <svg className="ring-svg" width="90" height="90">
                <circle className="ring-track" cx="45" cy="45" r="40" />
                <circle 
                  className="ring-progress" 
                  cx="45" cy="45" r="40" 
                  style={{ strokeDashoffset: selectedOption ? 0 : 251 }}
                />
             </svg>
             <button 
                className={`fab-button ${selectedOption ? 'active' : ''}`}
                onClick={() => navigate('/pick-card')}
                disabled={!selectedOption}
                
              >
               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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

export default ConflictRepairQuiz;