import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinanceQuiz.css';

// Assets
import togetherImg from '../../assets/Img1/bro.png';
import separateImg from '../../assets/Img1/Collaboration.png';
import fairImg from '../../assets/Img1/Pie.jpg';
import openImg from '../../assets/Img1/Business.png';

const FinanceQuiz = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, text: "Putting it all together.", img: togetherImg },
        { id: 2, text: "Keeping our own accounts but being open about stuff.", img: openImg },
        { id: 3, text: "Splitting things in a way that feels fair for both.", img: fairImg },
        { id: 4, text: "Keeping finances totally separate.", img: separateImg }
    ];

    return (
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
                    <div className="progress-ring-box">
                        <svg className="svg-ring" width="80" height="80">
                            <circle className="ring-bg" cx="40" cy="40" r="36" stroke="#5d326f15" strokeWidth="3" fill="none" />
                            <circle className="ring-bar" cx="40" cy="40" r="36" stroke="#5D326F" strokeWidth="3" fill="none" style={{ strokeDashoffset: selectedOption ? 100 : 226 }} />
                        </svg>
                        <button className={`nav-next-btn ${selectedOption ? 'ready' : ''}`} onClick={() => selectedOption && navigate('/habit-quiz')}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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

export default FinanceQuiz;