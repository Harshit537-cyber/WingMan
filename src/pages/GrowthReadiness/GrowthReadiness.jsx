import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GrowthReadiness.css';

// Images Import (Based on your file explorer screenshot)
// Aap please exact file names check kar lena folder me
import buildingImg from '../../assets/img14/Group 163050.png'; // Ready to build
import cautionImg from '../../assets/img14/pana.png';          // Open but cautious
import exploringImg from '../../assets/img14/Character.png';   // Still exploring
import healingImg from '../../assets/img14/Group 163158.png';  // Healing

const GrowthReadiness = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { 
            id: 'ready', 
            text: 'Ready to build something meaningful', 
            image: buildingImg 
        },
        { 
            id: 'cautious', 
            text: 'Open but cautious', 
            image: cautionImg 
        },
        { 
            id: 'exploring', 
            text: 'Still exploring what I really want', 
            image: exploringImg 
        },
        { 
            id: 'healing', 
            text: 'Healing and taking things slow', 
            image: healingImg 
        }
    ];

    return (
        <div className="growth-screen-wrapper">
            <div className="growth-container">
                {/* Header Section */}
                <header className="growth-header">
                    <button className="growth-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    {/* Title is slightly longer, flex handles centering */}
                    <h2 className="growth-category-title">Growth, Readiness & Emotional Maturity</h2>
                </header>

                {/* Question Section */}
                <main className="growth-main-content">
                    <h1 className="growth-question-text">
                        Which best describes how you feel about relationships right now?
                    </h1>

                    {/* 2x2 Grid Layout */}
                    <div className="growth-options-grid">
                        {options.map((option) => (
                            <div 
                                key={option.id}
                                className={`growth-card ${selectedOption === option.id ? 'is-selected' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <p className="growth-card-label">{option.text}</p>
                                <div className="growth-image-holder">
                                    <img src={option.image} alt={option.text} className="growth-illustration" />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer Section with Animated Ring */}
                <footer className="growth-footer">
                    <div className="growth-fab-container">
                        <svg className="growth-ring-svg" width="90" height="90">
                            <circle className="growth-ring-track" cx="45" cy="45" r="38" />
                            <circle 
                                className="growth-ring-fill" 
                                cx="45" cy="45" r="38" 
                                style={{ 
                                    strokeDashoffset: selectedOption ? 100 : 239 
                                }} 
                            />
                        </svg>
                        <button 
                            className={`growth-next-btn ${selectedOption ? 'is-ready' : ''}`} 
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

export default GrowthReadiness;