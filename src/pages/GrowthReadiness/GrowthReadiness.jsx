import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './GrowthReadiness.css';

// Images Import
import buildingImg from '../../assets/img14/Group 163050.png';
import cautionImg from '../../assets/img14/pana.png';
import exploringImg from '../../assets/img14/Character.png';
import healingImg from '../../assets/img14/Group 163158.png';

const GrowthReadiness = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 'ready', text: 'Ready to build something meaningful', image: buildingImg },
        { id: 'cautious', text: 'Open but cautious', image: cautionImg },
        { id: 'exploring', text: 'Still exploring what I really want', image: exploringImg },
        { id: 'healing', text: 'Healing and taking things slow', image: healingImg }
    ];

    // 🔥 SETTINGS
    const CURRENT_STEP = 4; 
    const TOTAL_STEPS = 6;

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Data Prepare
        const selectedText = options.find(opt => opt.id === selectedOption).text;
        const currentQuestion = "Which best describes how you feel about relationships right now?";
        
        // 2. Local Storage Logic
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const quizName = "Growth, Readiness & Emotional Maturity"; 
        let quizIndex = progress.findIndex(q => q.quizName === quizName);

        const newAnswer = { 
            question: currentQuestion, 
            selectedOption: selectedText 
        };

        if (quizIndex !== -1) {
            // Update or Append Step 4
            const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
            if (answerIndex !== -1) {
                progress[quizIndex].answers[answerIndex] = newAnswer;
            } else {
                progress[quizIndex].answers.push(newAnswer);
            }
        } else {
            progress.push({ quizName: quizName, answers: [newAnswer] });
        }

        // 3. Save & Navigate
        localStorage.setItem("quiz_progress", JSON.stringify(progress));
        navigate('/relationship-learning', { replace: true });
    };

    return (
        <AppLayout>
            <div className="growth-quiz-wrapper">
                <div className="growth-quiz-container">
                    {/* Header Section */}
                    <header className="growth-header-nav">
                        <button className="back-btn-circle" onClick={() => navigate(-1)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h3 className="growth-top-title">Growth & Maturity</h3>
                    </header>

                    {/* Question Section */}
                    <div className="growth-content-area">
                        <h1 className="growth-main-heading">
                            Which best describes how you feel about relationships right now?
                        </h1>

                        {/* 2x2 Grid Layout */}
                        <div className="growth-grid-layout">
                            {options.map((option) => (
                                <div 
                                    key={option.id}
                                    className={`growth-grid-card ${selectedOption === option.id ? 'active' : ''}`}
                                    onClick={() => setSelectedOption(option.id)}
                                >
                                    <p className="growth-card-text">{option.text}</p>
                                    <div className="growth-img-holder">
                                        <img src={option.image} alt={option.text} className="growth-illustration" />
                                    </div>

                                    {/* Tick Design Consistency */}
                                    {selectedOption === option.id && (
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
                    </div>

                    {/* Footer Section */}
                    <div className="growth-footer-section">
                        <StepProgressButton 
                            currentStep={CURRENT_STEP} 
                            totalSteps={TOTAL_STEPS} 
                            disabled={!selectedOption} 
                            onClick={handleNext}
                            resetKey={selectedOption}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default GrowthReadiness;