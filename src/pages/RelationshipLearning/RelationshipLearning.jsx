import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelationshipLearning.css';

// Images Import (Aapke paths same rahenge)
import pastRelImg from '../../assets/img15/bro.png';
import familyImg from '../../assets/img15/brosss.png';
import growthImg from '../../assets/img15/Add Profile Picture 5.png';
import mediaImg from '../../assets/img15/Hello.png';

const RelationshipLearning = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { 
            id: 'past', 
            text: 'My past relationships', 
            image: pastRelImg 
        },
        { 
            id: 'family', 
            text: 'Watching family or friends', 
            image: familyImg 
        },
        { 
            id: 'growth', 
            text: 'Personal growth and self-reflection', 
            image: growthImg 
        },
        { 
            id: 'media', 
            text: 'Movies, books, or social media', 
            image: mediaImg 
        }
    ];

    return (
        <div className="learning-screen-wrapper">
            <div className="learning-container">
                {/* Header */}
                <header className="learning-header">
                    <button className="learning-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h2 className="learning-category-title">Growth, Readiness & Emotional Maturity</h2>
                </header>

                {/* Question */}
                <main className="learning-main-content">
                    <h1 className="learning-question-text">
                        I’ve learned the most about relationships from...
                    </h1>

                    {/* Grid Options */}
                    <div className="learning-options-grid">
                        {options.map((option) => (
                            <div 
                                key={option.id}
                                className={`learning-card ${selectedOption === option.id ? 'is-selected' : ''}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <p className="learning-card-label">{option.text}</p>
                                <div className="learning-image-holder">
                                    <img src={option.image} alt={option.text} className="learning-illustration" />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer with Floating Button */}
                <footer className="learning-footer">
                    <div className="learning-fab-container">
                        <svg className="learning-ring-svg" viewBox="0 0 90 90">
                            <circle className="learning-ring-track" cx="45" cy="45" r="38" />
                            <circle 
                                className="learning-ring-fill" 
                                cx="45" cy="45" r="38" 
                                style={{ 
                                    strokeDashoffset: selectedOption ? 100 : 239 
                                }} 
                            />
                        </svg>
                        <button 
                            className={`learning-next-btn ${selectedOption ? 'is-ready' : ''}`} 
                            onClick={() => selectedOption && navigate('/view-matches')}
                            disabled={!selectedOption}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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

export default RelationshipLearning;