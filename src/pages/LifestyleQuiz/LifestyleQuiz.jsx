import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './LifestyleQuiz.css';

// Assets according to your folder structure
import relaxingImg from '../../assets/Quizassets/Playing Games 2.png';
import goingOutImg from '../../assets/Quizassets/Team Work 1.png';
import productiveImg from '../../assets/Quizassets/three.png';
import moodImg from '../../assets/Quizassets/four.png';

const LifestyleQuiz = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const CURRENT_STEP = 1;
    const TOTAL_STEPS = 5;

    const handleNext = () => {
        if (!selectedOption) return;
        navigate('/finance-quiz');
    };

    const options = [
        { id: 1, text: "Relaxing at home", img: relaxingImg },
        { id: 2, text: "Going out, exploring places.", img: goingOutImg },
        { id: 3, text: "Doing something productive.", img: productiveImg },
        { id: 4, text: "Mixing it up depends on mood.", img: moodImg }
    ];

    return (
        <AppLayout>
            <div className="quiz-web-wrapper">
                <div className="quiz-card-container">

                    <div className="quiz-header-section">
                        <button className="back-btn-quiz" onClick={() => navigate(-1)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Lifestyle And Value</h2>
                    </div>

                    <div className="quiz-content-main">
                        <h1 className="question-text-main">
                            How do you usually like to spend your weekends?
                        </h1>

                        <div className="options-grid-layout">
                            {options.map((opt, index) => (
                                <div
                                    key={opt.id}
                                    className={`quiz-opt-card ${selectedOption === opt.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedOption(opt.id)}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <p className="opt-card-label">{opt.text}</p>
                                    <div className="opt-img-wrapper">
                                        <img src={opt.img} alt={opt.text} className="opt-main-img" />
                                    </div>

                                    {/* 2nd Image Style Tick Implementation */}
                                    {selectedOption === opt.id && (
                                        <div className="selection-tick-wrapper">
                                            <div className="horizontal-line-divider"></div>
                                            <div className="complex-tick-container">
                                                <svg className="tick-progress-ring" width="44" height="44">
                                                    <circle
                                                        cx="22" cy="22" r="19"
                                                        stroke="#5D326F" strokeWidth="2"
                                                        fill="none"
                                                        strokeDasharray="120" strokeDashoffset="40"
                                                        strokeLinecap="round"
                                                    />
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
                    </div>

                    <div className="quiz-footer-action">
                        <div className="step-btn-wrapper">
                            <StepProgressButton
                                currentStep={CURRENT_STEP}
                                totalSteps={TOTAL_STEPS}
                                disabled={!selectedOption}
                                onClick={handleNext}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
};

export default LifestyleQuiz;