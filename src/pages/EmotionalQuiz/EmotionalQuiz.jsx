import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmotionalQuiz.css';

// Assets from your Img3 folder
import readingImg from '../../assets/img3/Rest 4.png';
import shakingHandsImg from '../../assets/img3/Love And Peace 10.png';
import checkingInImg from '../../assets/img3/pana.png';
import sweepingImg from '../../assets/img3/Clean Up 4.png';

const EmotionalQuiz = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, text: "Spending quality time together", img: readingImg },
        { id: 2, text: "Giving thoughtful gifts", img: shakingHandsImg },
        { id: 3, text: "Checking in and making sure they are okay", img: checkingInImg },
        { id: 4, text: "Doing things to help or support them", img: sweepingImg }
    ];

    return (
        <div className="quiz-web-wrapper">
            <div className="quiz-card-container">

                {/* Updated Header with Perfect Centering */}
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
                                            {/* Mask to create broken line effect */}
                                            <div className="tick-mask-bg"></div>
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

                {/* Footer Section */}
                <div className="quiz-footer-action">
                    <div className="progress-ring-box">
                        <svg className="svg-ring" width="80" height="80">
                            <circle cx="40" cy="40" r="36" stroke="#5d326f15" strokeWidth="3" fill="none" />
                            <circle
                                className="ring-bar"
                                cx="40" cy="40" r="36"
                                stroke="#5D326F" strokeWidth="3.5" fill="none"
                                style={{ strokeDashoffset: selectedOption ? 100 : 226 }}
                            />
                        </svg>
                        <button
                            className={`nav-next-btn ${selectedOption ? 'ready' : ''}`}
                            disabled={!selectedOption}
                            onClick={() => navigate('/next-quiz')}
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

export default EmotionalQuiz;