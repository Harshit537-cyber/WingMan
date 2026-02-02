import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './HabitQuiz.css';

const HabitQuiz = () => {
  const navigate = useNavigate();

  // QUESTIONS
  const questions = [
    {
      id: 1,
      title:
        'I feel most balanced when my partner and I have similar daily habits and energy levels.',
    },
    {
      id: 2,
      title:
        "If I had to choose between spending time on my goals or my relationship, I'd usually choose my goals.",
    },
  ];

  const options = [
    { id: 'sa', text: 'Strongly agree', icon: '☻' },
    { id: 'swa', text: 'Somewhat agree', icon: '☺' },
    { id: 'n', text: 'Neutral', icon: '☺' },
    { id: 'oo', text: 'Okay-okay', icon: '☹' },
    { id: 'sd', text: 'Strongly disagree', icon: '☹' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🔑 STEP CONFIG
  const CURRENT_STEP = 8; // apne flow ke hisaab se
  const TOTAL_STEPS = 15;

  const handleNext = () => {
    if (!selectedOption) return;

    if (currentIndex < questions.length - 1) {
      // next question
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 400);
    } else {
      // ✅ FINAL NAVIGATION (THIS WILL WORK)
      navigate('/relationship-quiz');
    }
  };

  return (
    <AppLayout>
      <div className="quiz-web-wrapper">
        <div className="quiz-card-container">

          {/* HEADER */}
          <div className="quiz-header-section">
            <button
              className="back-btn-quiz"
              onClick={() =>
                currentIndex > 0
                  ? setCurrentIndex((prev) => prev - 1)
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
            <h2 className="header-title-quiz">Lifestyle And Value</h2>
          </div>

          {/* CONTENT */}
          <div
            className={`quiz-content-main ${
              isAnimating ? 'fade-exit' : 'fade-enter'
            }`}
          >
            <h1 className="question-text-main">
              {questions[currentIndex].title}
            </h1>

            <div className="habit-list-container">
              {options.map((opt, index) => (
                <div
                  key={opt.id}
                  className={`habit-row-item ${
                    selectedOption === opt.id ? 'active' : ''
                  }`}
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

          {/* 🔥 STEP PROGRESS BUTTON (ONLY CHANGE HERE) */}
          <div className="quiz-footer-action">
            <StepProgressButton
              currentStep={CURRENT_STEP}
              totalSteps={TOTAL_STEPS}
              disabled={!selectedOption}
              onClick={handleNext}
              
            />
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default HabitQuiz;
