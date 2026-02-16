import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './FinanceQuiz.css';

// Assets
import togetherImg from '../../assets/Img1/bro.png';
import separateImg from '../../assets/Img1/Collaboration.png';
import fairImg from '../../assets/Img1/Pie.jpg';
import openImg from '../../assets/Img1/Business.png';

const FinanceQuiz = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const CURRENT_STEP = 2;
    const TOTAL_STEPS = 5;

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Current answer ka data
        const selectedText = options.find(opt => opt.id === selectedOption).text;
        const currentAnswer = {
            question: "When it comes to managing money as a couple, I prefer:",
            selectedOption: selectedText
        };

        // 2. Local Storage se data nikalna
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];

        // 3. "Lifestyle & Value" wala quiz find karna
        const quizIndex = progress.findIndex(q => q.quizName === "Lifestyle & Value");

        if (quizIndex !== -1) {
            // Agar mil gaya (jo ki LifestyleQuiz se ban chuka hoga), toh answers mein add kar do
            progress[quizIndex].answers.push(currentAnswer);
        } else {
            // Agar by chance nahi mila, toh naya create kar do (Safety ke liye)
            progress.push({
                quizName: "Lifestyle & Value",
                answers: [currentAnswer]
            });
        }

        // 4. Update karke save karo aur navigate karo
        localStorage.setItem("quiz_progress", JSON.stringify(progress));
        navigate('/habit-quiz', { replace: true });
    };

    const options = [
        { id: 1, text: "Putting it all together.", img: togetherImg },
        { id: 2, text: "Keeping our own accounts but being open about stuff.", img: openImg },
        { id: 3, text: "Splitting things in a way that feels fair for both.", img: fairImg },
        { id: 4, text: "Keeping finances totally separate.", img: separateImg }
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
                        <h1 className="question-text-main">When it comes to managing money as a couple, I prefer:</h1>
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

export default FinanceQuiz;