import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout'; // Standard Layout
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton'; // Standard Button
import './EmotionalCommunication.css';

// Assets from img4 folder
import dancingImg from '../../assets/img4/bro.png'; 
import sofaImg from '../../assets/img4/Love And Peace 8.png'; 
import checkingImg from '../../assets/img4/Love And Peace 9.png'; 
import supportImg from '../../assets/img4/Love And Peace 7.png'; 

const EmotionalCommunication = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, text: "Spending quality time together", img: dancingImg },
        { id: 2, text: "Giving thoughtful gifts", img: sofaImg },
        { id: 3, text: "Checking in and making sure they are okay", img: checkingImg },
        { id: 4, text: "Doing things to help or support them", img: supportImg }
    ];

    // 🔥 SETTINGS
    const CURRENT_STEP = 2; // Question 2
    const TOTAL_STEPS = 5;

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Data Prepare
        const selectedText = options.find(opt => opt.id === selectedOption).text;
        const currentQuestion = "When you care about someone, you usually show it through...";
        
        // 2. Local Storage Logic
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const quizName = "Emotional Communication"; 
        let quizIndex = progress.findIndex(q => q.quizName === quizName);

        const newAnswer = { 
            question: currentQuestion, 
            selectedOption: selectedText 
        };

        if (quizIndex !== -1) {
            // Update question 2 if already exists, else push
            const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
            if (answerIndex !== -1) {
                progress[quizIndex].answers[answerIndex] = newAnswer;
            } else {
                progress[quizIndex].answers.push(newAnswer);
            }
        } else {
            // Safety fallback
            progress.push({
                quizName: quizName,
                answers: [newAnswer]
            });
        }

        // 3. Save & Navigate
        localStorage.setItem("quiz_progress", JSON.stringify(progress));
        navigate('/emotional-commQuiz', { replace: true }); 
    };

    return (
        <AppLayout>
            <div className="quiz-web-wrapper">
                <div className="quiz-card-container">

                    {/* Header */}
                    <div className="quiz-header-section">
                        <button className="back-btn-quiz" onClick={() => navigate(-1)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Emotional Communication</h2>
                        <div className="header-spacer-quiz"></div>
                    </div>

                    <div className="quiz-content-main">
                        <h1 className="question-text-main">
                            When you care about someone, you usually show it through...
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
                                    
                                    {selectedOption === opt.id && (
                                        <div className="selection-tick-wrapper">
                                            <div className="horizontal-line-divider"></div>
                                            <div className="complex-tick-container">
                                                <svg className="tick-progress-ring" width="44" height="44">
                                                    <circle
                                                        cx="22" cy="22" r="19"
                                                        stroke="#5D326F" strokeWidth="2.5"
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

                    {/* Footer Section using StepProgressButton */}
                    <div className="quiz-footer-action">
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

export default EmotionalCommunication;