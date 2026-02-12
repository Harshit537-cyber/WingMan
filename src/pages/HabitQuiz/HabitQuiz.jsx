import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './HabitQuiz.css';

const HabitQuiz = () => {
    const navigate = useNavigate();

    // QUESTIONS
    const questions = [
        {
            id: 1,
            title:
                'I feel most balanced when my partner and I have similar daily habits and energy levels.',
        },
        {
            id: 2,
            title:
                "If I had to choose between spending time on my goals or my relationship, I'd usually choose my goals.",
        },
    ];

    const options = [
        { id: 'sa', text: 'Strongly agree', icon: '☻' },
        { id: 'swa', text: 'Somewhat agree', icon: '☺' },
        { id: 'n', text: 'Neutral', icon: '☺' },
        { id: 'oo', text: 'Okay-okay', icon: '☹' },
        { id: 'sd', text: 'Strongly disagree', icon: '☹' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // 🔑 STEP CONFIG
    const BASE_STEP = 3;
    const CURRENT_STEP = BASE_STEP + currentIndex;
    const TOTAL_STEPS = 5;

    const handleNext = () => {
        if (!selectedOption) return;

        // 1. Current Question aur selected Text nikal lo
        const currentQuestionText = questions[currentIndex].title;
        const selectedText = options.find(opt => opt.id === selectedOption).text;

        // 2. Local Storage se data fetch karo
        const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];

        // 3. "Lifestyle & Value" wala object dhundo
        const quizIndex = progress.findIndex(q => q.quizName === "Lifestyle & Value");

        const newAnswer = {
            question: currentQuestionText,
            selectedOption: selectedText
        };

        if (quizIndex !== -1) {
            // Check karo ki ye question pehle se answers array mein toh nahi? 
            // (Ye tab hota hai jab user 'Back' karke wapas 'Next' kare)
            const answerIndex = progress[quizIndex].answers.findIndex(a => a.question === currentQuestionText);

            if (answerIndex !== -1) {
                // Update purana answer
                progress[quizIndex].answers[answerIndex] = newAnswer;
            } else {
                // Add naya answer
                progress[quizIndex].answers.push(newAnswer);
            }
        } else {
            // Safety: Agar pehle ke quiz se entry nahi bani toh yahan bana do
            progress.push({
                quizName: "Lifestyle & Value",
                answers: [newAnswer]
            });
        }

        // 4. Save updated progress
        localStorage.setItem("quiz_progress", JSON.stringify(progress));

        // --- UI Navigation Logic ---
        if (currentIndex < questions.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
                setSelectedOption(null);
                setIsAnimating(false);
            }, 400);
        } else {
            navigate('/relationship-quiz', { replace: true });
        }
    };

    return (
        <AppLayout>
            <div className="quiz-web-wrapper">
                <div className="quiz-card-container">

                    {/* HEADER */}
                    <div className="quiz-header-section">
                        <button
                            className="back-btn-quiz"
                            onClick={() =>
                                currentIndex > 0
                                    ? setCurrentIndex((prev) => prev - 1)
                                    : navigate(-1)
                            }
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#5D326F"
                                strokeWidth="2.5"
                            >
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <h2 className="header-title-quiz">Lifestyle And Value</h2>
                    </div>

                    {/* CONTENT */}
                    <div
                        className={`quiz-content-main ${isAnimating ? 'fade-exit' : 'fade-enter'
                            }`}
                    >
                        <h1 className="question-text-main">
                            {questions[currentIndex].title}
                        </h1>

                        <div className="habit-list-container">
                            {options.map((opt, index) => (
                                <div
                                    key={opt.id}
                                    className={`habit-row-item ${selectedOption === opt.id ? 'active' : ''
                                        }`}
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

                    {/* 🔥 STEP PROGRESS BUTTON (ONLY CHANGE HERE) */}
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

export default HabitQuiz;
