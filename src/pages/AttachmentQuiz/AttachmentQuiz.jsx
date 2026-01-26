import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AttachmentQuiz.css';

// SVG Icon Components to match the image exactly
const CustomEmoji = ({ type, color, strokeColor = "white" }) => {
    const circleStroke = 1.5;
    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="21" fill={color} />
            {/* Outer ring for the icon itself if needed (like the last one) */}
            {type === 'strongly-disagree' && <circle cx="21" cy="21" r="20.25" stroke="#1A1A1A" strokeWidth="1.5" />}
            
            {/* Eyes */}
            <circle cx="15" cy="18" r="1.5" fill={strokeColor} />
            <circle cx="27" cy="18" r="1.5" fill={strokeColor} />

            {/* Mouths based on type */}
            {type === 'strongly-agree' && <path d="M14 26C14 26 16.5 29 21 29C25.5 29 28 26 28 26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />}
            {type === 'somewhat-agree' && <path d="M15 26C15 26 17 28 21 28C25 28 27 26 27 26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />}
            {type === 'neutral' && <path d="M16 27H26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />}
            {type === 'okay-okay' && <path d="M16 27H26" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />}
            {type === 'strongly-disagree' && <path d="M28 29C28 29 25.5 26 21 26C16.5 26 14 29 14 29" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />}
        </svg>
    );
};

const AttachmentQuiz = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const questions = [
        { id: 1, text: "I pick up on changes in someone's mood quickly." },
        { id: 2, text: "I can express how I feel even when it might cause disagreement." },
        { id: 3, text: "When my partner withdraws during a disagreement, I usually want to reach out and reconnect." }
    ];

    const options = [
        { id: 'strongly-agree', label: 'Strongly agree', color: '#432C51', stroke: 'white' },
        { id: 'somewhat-agree', label: 'Somewhat agree', color: '#9B6BAE', stroke: 'white' },
        { id: 'neutral', label: 'Neutral', color: '#D4B3E0', stroke: 'white' },
        { id: 'okay-okay', label: 'Okay- okay', color: '#E9D6ED', stroke: '#1A1A1A' },
        { id: 'strongly-disagree', label: 'Strongly disagree', color: '#FFFFFF', stroke: '#1A1A1A' }
    ];

    const handleNext = () => {
        if (selectedOption !== null) {
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
                setSelectedOption(null);
            } else {
                navigate('/results');
            }
        }
    };

    return (
        <div className="quiz-screen-wrapper">
            <div className="attachment-quiz-container">
                {/* Header */}
                <div className="quiz-top-header">
                    <button className="back-arrow-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h3 className="quiz-category-title">Emotional Communication</h3>
                </div>

                <div className="quiz-main-body">
                    <h1 className="question-heading">{questions[currentStep].text}</h1>

                    <div className="options-vertical-list">
                        {options.map((option) => (
                            <div 
                                key={option.id}
                                className={`option-row-item ${selectedOption === option.id ? 'active' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <div className="icon-container-with-ring">
                                    <CustomEmoji type={option.id} color={option.color} strokeColor={option.stroke} />
                                </div>
                                <span className="option-label-text">{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="quiz-bottom-nav">
                    <div className="progress-button-wrapper">
                        <svg className="progress-svg-ring" width="90" height="90">
                            <circle className="ring-track" cx="45" cy="45" r="38" />
                            <circle 
                                className="ring-fill" 
                                cx="45" 
                                cy="45" 
                                r="38" 
                                style={{ 
                                    strokeDashoffset: 239 - (239 * (currentStep + 1) / questions.length) 
                                }}
                            />
                        </svg>
                        <button 
                            className={`next-circle-btn ${selectedOption ? 'enabled' : ''}`} 
                            onClick={handleNext}
                            disabled={!selectedOption}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

export default AttachmentQuiz;