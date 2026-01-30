import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmotionalCommunication.css';

// Assets from img4 folder according to your structure
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

    return (
        <div className="quiz-web-wrapper">
            <div className="quiz-card-container">

                {/* Header - Perfect Centering Logic */}
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

                    {/* 2x2 Grid Layout */}
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
                                
                                {/* Selection Tick with Masking */}
                                {selectedOption === opt.id && (
                                    <div className="selection-tick-wrapper">
                                        <div className="horizontal-line-divider"></div>
                                        <div className="complex-tick-container">
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

                {/* Footer Progress Button */}
                <div className="quiz-footer-action">
                    <div className="progress-ring-box">
                        <svg className="svg-ring" width="85" height="85">
                            <circle cx="42.5" cy="42.5" r="38" stroke="#5d326f15" strokeWidth="3" fill="none" />
                            <circle
                                className="ring-bar"
                                cx="42.5" cy="42.5" r="38"
                                stroke="#5D326F" strokeWidth="4" fill="none"
                                style={{ strokeDashoffset: selectedOption ? 120 : 240 }}
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

export default EmotionalCommunication;