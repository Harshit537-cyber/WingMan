import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import { handleDynamicSubmit } from '../../utils/quizHelpers'; // 🔥 Helper Import
import './LifestyleAndValue.css';

// Images import
import characterCalm from '../../assets/img7/1.png';
import characterAnxious from '../../assets/img7/2.png';
import characterUnbothered from '../../assets/img7/3.png';
import characterIrritated from '../../assets/img7/4.png';

const LifestyleAndValue = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExitModal, setShowExitModal] = useState(false);
    const [loading, setLoading] = useState(false); // 🔥 Loading state add ki

    const QUIZ_NAME = "Lifestyle & Value";

    const options = [
        { id: 'calm', text: 'Calm — they’re probably busy', image: characterCalm },
        { id: 'anxious', text: 'Anxious — did I say something wrong?', image: characterAnxious },
        { id: 'unbothered', text: 'Unbothered — I’ll reply later too', image: characterUnbothered },
        { id: 'irritated', text: 'Irritated — communication should be consistent', image: characterIrritated }
    ];

    const handleExit = () => {
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const filteredProgress = progress.filter(q => q.quizName !== QUIZ_NAME);
        localStorage.setItem("quiz_progress", JSON.stringify(filteredProgress));
        navigate('/pick-card', { replace: true });
    };

    const handleNext = async () => {
        if (!selectedOption || loading) return;
        setLoading(true); // 🔥 API call start

        try {
            const selectedText = options.find(opt => opt.id === selectedOption).text;
            const currentQuestion = "If someone you’re dating doesn’t text back for hours, what’s your first reaction?";

            const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
            let quizIndex = progress.findIndex(q => q.quizName === QUIZ_NAME);

            const newAnswer = {
                question: currentQuestion,
                selectedOption: selectedText
            };

            if (quizIndex !== -1) {
                const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
                if (answerIndex !== -1) {
                    progress[quizIndex].answers[answerIndex] = newAnswer;
                } else {
                    progress[quizIndex].answers.push(newAnswer);
                }
            } else {
                progress.push({
                    quizName: QUIZ_NAME,
                    answers: [newAnswer]
                });
            }

            // 1. Pehle storage save karo
            localStorage.setItem("quiz_progress", JSON.stringify(progress));

            // 2. 🔥 DYNAMIC API CALL: Check if this is the final card
            await handleDynamicSubmit(progress, navigate, setLoading);

        } catch (error) {
            console.error("Submission error:", error);
            setLoading(false);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <AppLayout>
            {/* EXIT POP-UP MODAL */}
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
                    <div className="quiz-header-section">
                        <button className="back-btn-quiz" onClick={() => setShowExitModal(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Lifestyle & Value</h2>
                    </div>

                    <div className="quiz-scroll-area">
                        <div className="quiz-content-main">
                            <h1 className="question-text-main">
                                If someone you’re dating doesn’t text back for hours, what’s your first reaction?
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
                                            <img src={opt.image} alt={opt.text} className="opt-main-img" />
                                        </div>

                                        {selectedOption === opt.id && (
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

                    <div className="quiz-footer-action">
                        <StepProgressButton
                            currentStep={6}
                            totalSteps={6}
                            disabled={!selectedOption || loading} // 🔥 Disable on loading
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default LifestyleAndValue;