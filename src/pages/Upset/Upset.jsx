import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout'; // Added AppLayout
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton'; // Added Progress Button
import './Upset.css';

// Assets from your folder
import readingImg from '../../assets/img16/Rest 4.svg';
import shakingHandsImg from '../../assets/img16/Love .svg';
import checkingInImg from '../../assets/img16/Clean Up 4.svg';
import sweepingImg from '../../assets/img16/pana.svg';

const Upset = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, text: "Stay quiet and think", img: readingImg },
        { id: 2, text: "Talk things through right away", img: shakingHandsImg },
        { id: 3, text: "Distract myself until I feel calmer", img: checkingInImg },
        { id: 4, text: "Wait for the other person to reach out first", img: sweepingImg }
    ];

    // 🔥 SETTINGS
    const CURRENT_STEP = 1; 
    const TOTAL_STEPS = 5; // Emotional Communication ke total steps ke hisaab se adjust karein

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Data Prepare
        const selectedText = options.find(opt => opt.id === selectedOption).text;
        const currentQuestion = "When I’m upset, I tend to:";
        
        // 2. Local Storage Logic
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
        const quizName = "Emotional Communication"; // Exact name from PickCard
        let quizIndex = progress.findIndex(q => q.quizName === quizName);

        const newAnswer = { 
            question: currentQuestion, 
            selectedOption: selectedText 
        };

        if (quizIndex !== -1) {
            // Update or Append
            const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestion);
            if (answerIndex !== -1) {
                progress[quizIndex].answers[answerIndex] = newAnswer;
            } else {
                progress[quizIndex].answers.push(newAnswer);
            }
        } else {
            // Naya entry create karna
            progress.push({
                quizName: quizName,
                answers: [newAnswer]
            });
        }

        // 3. Save & Navigate
        localStorage.setItem("quiz_progress", JSON.stringify(progress));
        navigate('/emotional-communication', { replace: true }); // Next step path
    };

    return (
        <AppLayout>
            <div className="quiz-web-wrapper">
                <div className="quiz-card-container">

                    {/* Header Section */}
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
                            When I’m upset, I tend to:
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

export default Upset;