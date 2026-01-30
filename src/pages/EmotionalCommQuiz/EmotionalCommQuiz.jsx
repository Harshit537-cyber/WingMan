import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmotionalCommQuiz.css';

const EmotionalCommQuiz = () => {
    const navigate = useNavigate();
    
    // Questions array based on your images
    const questions = [
        {
            id: 1,
            title: "I pick up on changes in someone’s mood quickly.",
        },
        {
            id: 2,
            title: "I can express how I feel even when it might cause disagreement.",
        },
        {
            id: 3,
            title: "When my partner withdraws during a disagreement, I usually want to reach out and reconnect.",
        }
    ];

    const options = [
        { id: 'sa', text: "Strongly agree", icon: "☻" },
        { id: 'swa', text: "Somewhat agree", icon: "☺" },
        { id: 'n', text: "Neutral", icon: "☺" },
        { id: 'oo', text: "Okay- okay", icon: "☹" },
        { id: 'sd', text: "Strongly disagree", icon: "☹" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = () => {
        if (!selectedOption) return;

        if (currentIndex < questions.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
                setIsAnimating(false);
            }, 400); 
        } else {
            navigate('/next-section'); // Agli category par jaane ke liye
        }
    };

    return (
        <div className="quiz-web-wrapper">
            <div className="quiz-card-container">

                {/* Header */}
                <div className="quiz-header-section">
                    <button className="back-btn-quiz" onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 className="header-title-quiz">Emotional Communication</h2>
                    <div className="header-spacer-quiz"></div>
                </div>

                <div className={`quiz-content-main ${isAnimating ? 'fade-exit' : 'fade-enter'}`}>
                    {/* Question Title */}
                    <h1 className="question-text-main">
                        {questions[currentIndex].title}
                    </h1>

                    {/* Vertical Options List */}
                    <div className="habit-list-container">
                        {options.map((opt, index) => (
                            <div
                                key={opt.id}
                                className={`habit-row-item ${selectedOption === opt.id ? 'active' : ''}`}
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

                {/* Progress Button Section */}
                <div className="quiz-footer-action">
                    <div className="progress-btn-box">
                        <svg className="svg-ring-container" width="90" height="90">
                            <circle className="ring-bg" cx="45" cy="45" r="40" stroke="#fce4ec" strokeWidth="3" fill="none" />
                            <circle
                                className="ring-fill"
                                cx="45" cy="45" r="40"
                                stroke="#5D326F" strokeWidth="3.5" fill="none"
                                style={{ 
                                    strokeDashoffset: selectedOption ? 100 : 251,
                                    transition: '0.6s cubic-bezier(0.4, 0, 0.2, 1)' 
                                }}
                            />
                        </svg>
                        <button
                            className={`main-action-btn ${selectedOption ? 'enabled' : ''}`}
                            onClick={handleNext}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmotionalCommQuiz;