import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from './../../components/AppLayout/AppLayout.jsx';
import './QuizPrompt.css';
import illustrationImg from '../../assets/Frame.svg'; // Path check kar lena bhai

const QuizPrompt = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="quiz-screen-container">
        
        {/* Top Illustration Area */}
        <div className="quiz-img-wrapper">
          <img 
            src={illustrationImg} 
            alt="Quiz UI Illustration" 
            className="quiz-hero-vector" 
          />
        </div>

        {/* Text Area */}
        <div className="quiz-info-section">
          <h1 className="quiz-main-headline">
            Take our quick quiz to <br /> complete your profile
          </h1>
          <p className="quiz-sub-headline">
            Get a great profile in just a few minutes!
          </p>
        </div>

        {/* Bottom Button Area */}
        <div className="quiz-buttons-section">
          <button className="btn-primary-quiz" onClick={() => navigate('/pick-card')}>
            Continue
          </button>
          <button className="btn-secondary-quiz" onClick={() => navigate('/home')}>
            Maybe Later
          </button>
        </div>

        {/* Background Dashed Curve (Perfectly matched to Image) */}
        <div className="footer-curve-svg">
          <svg viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path 
              d="M-20,40 Q110,180 210,80 T440,120" 
              stroke="#E2D1E8" 
              strokeWidth="2.5" 
              strokeDasharray="8 8"
            />
          </svg>
        </div>

      </div>
    </AppLayout>
  );
};

export default QuizPrompt;