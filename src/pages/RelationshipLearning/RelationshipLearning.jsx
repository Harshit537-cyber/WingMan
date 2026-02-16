import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './RelationshipLearning.css';
import { handleDynamicSubmit } from '../../utils/quizHelpers';

// Images Import
import pastRelImg from '../../assets/img15/bro.png';
import familyImg from '../../assets/img15/brosss.png';
import growthImg from '../../assets/img15/Add Profile Picture 5.png';
import mediaImg from '../../assets/img15/Hello.png';

const RelationshipLearning = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    // 🔥 ZARURI: Naam exactly wahi jo database accept karta hai
    const QUIZ_NAME = "Growth, Readiness & Emotional Maturity";

    const options = [
        { id: 'past', text: 'My past relationships', image: pastRelImg },
        { id: 'family', text: 'Watching family or friends', image: familyImg },
        { id: 'growth', text: 'Personal growth and self-reflection', image: growthImg },
        { id: 'media', text: 'Movies, books, or social media', image: mediaImg }
    ];

    const handleSubmit = async () => {
        if (!selectedOption) return;
        setLoading(true);

        const selectedText = options.find(opt => opt.id === selectedOption).text;
        const currentQuestion = "I’ve learned the most about relationships from...";
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];

        let quizIndex = progress.findIndex(q => q.quizName === QUIZ_NAME);
        const finalAnswer = { question: currentQuestion, selectedOption: selectedText };

        if (quizIndex !== -1) {
            // Check to avoid duplicates if user goes back and forth
            const ansIdx = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
            if (ansIdx !== -1) progress[quizIndex].answers[ansIdx] = finalAnswer;
            else progress[quizIndex].answers.push(finalAnswer);
        } else {
            progress.push({ quizName: QUIZ_NAME, answers: [finalAnswer] });
        }

        // Save locally first
        localStorage.setItem("quiz_progress", JSON.stringify(progress));

        // 🔥 DYNAMIC CALL: Ye decide karega API call karni hai ya PickCard jana hai
        await handleDynamicSubmit(progress, navigate, setLoading);
    };

    const handleExit = () => {
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        // 🔥 Card tick na ho isliye is card ka data delete kar rahe hain
        const filteredProgress = progress.filter(q => q.quizName !== QUIZ_NAME);
        localStorage.setItem("quiz_progress", JSON.stringify(filteredProgress));
        navigate('/pick-card', { replace: true });
    };

    return (
        <AppLayout>
            {/* EXIT MODAL */}
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

            <div className={`quiz-web-wrapper ${showExitModal ? 'blur-bg' : ''}`}>
                <div className="quiz-card-container">
                    
                    {/* FIXED HEADER */}
                    <div className="quiz-header-section">
                        <button className="back-btn-quiz" onClick={() => setShowExitModal(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Growth & Maturity</h2>
                    </div>

                    {/* 🔥 SCROLLABLE AREA: Taki cards hide na ho */}
                    <div className="quiz-scroll-area">
                        <div className="quiz-content-main">
                            <h1 className="question-text-main">
                                I’ve learned the most about relationships from...
                            </h1>

                            <div className="options-grid-layout">
                                {options.map((option) => (
                                    <div 
                                        key={option.id} 
                                        className={`quiz-opt-card ${selectedOption === option.id ? 'selected' : ''}`} 
                                        onClick={() => setSelectedOption(option.id)}
                                    >
                                        <p className="opt-card-label">{option.text}</p>
                                        <div className="opt-img-wrapper">
                                            <img src={option.image} alt={option.text} className="opt-main-img" />
                                        </div>
                                        {selectedOption === option.id && (
                                            <div className="selection-tick-wrapper">
                                                <div className="horizontal-line-divider"></div>
                                                <div className="complex-tick-container">
                                                    <svg className="tick-progress-ring" width="44" height="44"><circle cx="22" cy="22" r="19" stroke="#5D326F" strokeWidth="2" fill="none" strokeDasharray="120" strokeDashoffset="40" strokeLinecap="round" /></svg>
                                                    <div className="inner-tick-circle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FIXED FOOTER */}
                    <div className="quiz-footer-action">
                        <StepProgressButton 
                            currentStep={5} 
                            totalSteps={5} 
                            disabled={!selectedOption || loading} 
                            onClick={handleSubmit} 
                            resetKey={selectedOption} 
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default RelationshipLearning;