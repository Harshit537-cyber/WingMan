import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizPrompt.css';
import illustrationImg from '../../assets/Frame.png';

const QuizPrompt = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-web-wrapper">
      <div className="quiz-card-container">
        
        <div className="quiz-illustration-section">
          <img 
            src={illustrationImg} 
            alt="Quiz Illustration" 
            className="main-quiz-img" 
          />
        </div>

        <div className="quiz-text-section">
          <h1 className="quiz-title">
            Take our quick quiz to <br /> complete your profile
          </h1>
          <p className="quiz-subtitle">
            Get a great profile in just a few minutes!
          </p>
        </div>

        <div className="quiz-action-section">
          <button className="quiz-continue-btn" onClick={() => navigate('/next')}>
            Continue
          </button>
          <button className="quiz-later-btn" onClick={() => navigate('/dashboard')}>
            Maybe Later
          </button>
        </div>

        <div className="bottom-curve-pattern">
          <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 50C100 150 300 0 400 100" 
              stroke="#D1C4D6" 
              strokeWidth="2" 
              strokeDasharray="6 6"
            />
          </svg>
        </div>

      </div>
    </div>
  );
};

export default QuizPrompt;