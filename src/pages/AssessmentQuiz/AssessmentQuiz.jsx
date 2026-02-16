import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout'; // Added Layout
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton'; // Standard Button
import './AssessmentQuiz.css';

const AssessmentQuiz = () => {
    const navigate = useNavigate();
    
    const questions = [
        { id: 1, title: "I believe relationships help both people grow." },
        { id: 2, title: "When I realise I’ve hurt someone, I try to take responsibility and reconnect." },
        { id: 3, title: "I rarely talk about your feelings and emotions." },
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

    // 🔥 SETTINGS
    const CURRENT_STEP = currentIndex + 1;
    const TOTAL_STEPS = 6; // Assume total 6 steps for this card

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Data Prepare
        const currentQuestionText = questions[currentIndex].title;
        const selectedText = options.find(opt => opt.id === selectedOption).text;
        
        // 2. Local Storage Logic
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const quizName = "Growth, Readiness & Emotional Maturity"; // PickCard matching name
        let quizIndex = progress.findIndex(q => q.quizName === quizName);

        const newAnswer = { 
            question: currentQuestionText, 
            selectedOption: selectedText 
        };

        if (quizIndex !== -1) {
            const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestionText);
            if (answerIndex !== -1) {
                progress[quizIndex].answers[answerIndex] = newAnswer;
            } else {
                progress[quizIndex].answers.push(newAnswer);
            }
        } else {
            progress.push({ quizName: quizName, answers: [newAnswer] });
        }

        // 3. Save progress
        localStorage.setItem("quiz_progress", JSON.stringify(progress));

        // 4. UI Logic
        if (currentIndex < questions.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setSelectedOption(null);
                setIsAnimating(false);
            }, 400);
        } else {
            navigate('/growth-readiness', { replace: true }); // Next file in the flow
        }
    };

    return (
        <AppLayout>
            <div className="quiz-web-wrapper">
                <div className="quiz-card-container">
                    {/* Header */}
                    <div className="quiz-header-section">
                        <button className="back-btn-quiz" onClick={() => currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : navigate(-1)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Growth & Maturity</h2>
                    </div>

                    <div className={`quiz-content-main ${isAnimating ? 'fade-exit' : 'fade-enter'}`}>
                        <h1 className="question-text-main">{questions[currentIndex].title}</h1>

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

                    {/* Footer using Standard StepProgressButton */}
                    <div className="quiz-footer-action">
                        <StepProgressButton 
                            currentStep={CURRENT_STEP} 
                            totalSteps={TOTAL_STEPS} 
                            disabled={!selectedOption} 
                            onClick={handleNext}
                            resetKey={currentIndex} 
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AssessmentQuiz;