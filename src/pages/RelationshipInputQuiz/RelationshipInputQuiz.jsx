import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelationshipInputQuiz.css';

const RelationshipInputQuiz = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");

    return (
        <div className="quiz-web-wrapper">
            <div className="quiz-card-container">

                {/* Header Section */}
                <div className="quiz-header-section">
                    <button className="back-btn-quiz" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 className="header-title-quiz">Lifestyle And Value</h2>
                </div>

                <div className="quiz-content-main">
                    {/* Question Text */}
                    <h1 className="question-text-main">
                        What’s one thing that really matters to you in a relationship?
                    </h1>

                    {/* Text Input Field */}
                    <div className="input-field-container">
                        <input 
                            type="text" 
                            className="quiz-text-input"
                            placeholder="Write your answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                </div>

                {/* Footer Progress Button */}
                <div className="quiz-footer-action">
                    <div className="progress-ring-box">
                        <svg className="svg-ring" width="85" height="85">
                            <circle
                                className="ring-bg"
                                cx="42.5" cy="42.5" r="38"
                                stroke="#5d326f15" strokeWidth="3" fill="none"
                            />
                            <circle
                                className="ring-bar"
                                cx="42.5" cy="42.5" r="38"
                                stroke="#5D326F" strokeWidth="3.5" fill="none"
                                style={{ strokeDashoffset: answer.trim().length > 0 ? 120 : 240 }}
                            />
                        </svg>
                        <button
                            className={`nav-next-btn ${answer.trim().length > 0 ? 'ready' : ''}`}
                            onClick={() => answer.trim().length > 0 && navigate('/next-quiz-page')}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
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

export default RelationshipInputQuiz;