import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LifestyleAndValue.css';

// Images import (Aapke paths ke hisaab se)
import characterCalm from '../../assets/img7/1.png';
import characterAnxious from '../../assets/img7/2.png';
import characterUnbothered from '../../assets/img7/3.png';
import characterIrritated from '../../assets/img7/4.png';

const LifestyleAndValue = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 'calm', text: 'Calm — they’re probably busy', image: characterCalm },
        { id: 'anxious', text: 'Anxious — did I say something wrong?', image: characterAnxious },
        { id: 'unbothered', text: 'Unbothered — I’ll reply later too', image: characterUnbothered },
        { id: 'irritated', text: 'Irritated — communication should be consistent', image: characterIrritated }
    ];

    return (
        <div className="lifestyle-screen-wrapper">
            <div className="lifestyle-container">
                {/* Header Section */}
                <header className="lifestyle-header">
                    <button className="lifestyle-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 className="lifestyle-category-title">Lifestyle And Value</h2>
                </header>

                {/* Question Section */}
                <main className="lifestyle-main-content">
                    <h1 className="lifestyle-question-text">
                        If someone you’re dating doesn’t text back for hours, what’s your first reaction?
                    </h1>

                    {/* 2x2 Grid Layout */}
                    <div className="lifestyle-options-grid">
                        {options.map((option) => (
                            <div 
                                key={option.id}
                                className={`lifestyle-card ${selectedOption === option.id ? 'is-selected' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <p className="lifestyle-card-label">{option.text}</p>
                                <div className="lifestyle-image-holder">
                                    <img src={option.image} alt="" className="lifestyle-illustration" />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer Section with Progress Ring */}
                <footer className="lifestyle-footer">
                    <div className="lifestyle-fab-container">
                        <svg className="lifestyle-ring-svg" width="90" height="90">
                            <circle className="lifestyle-ring-track" cx="45" cy="45" r="38" />
                            <circle 
                                className="lifestyle-ring-fill" 
                                cx="45" cy="45" r="38" 
                                style={{ 
                                    strokeDashoffset: selectedOption ? 100 : 239 
                                }} 
                            />
                        </svg>
                        <button 
                            className={`lifestyle-next-btn ${selectedOption ? 'is-ready' : ''}`} 
                            onClick={() => selectedOption && navigate('/next')}
                            disabled={!selectedOption}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LifestyleAndValue;