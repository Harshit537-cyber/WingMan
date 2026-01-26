import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AttachmentEmojiQuiz.css';

// Custom Emoji Component to match the "Line Art" style in image
const EmojiIcon = ({ type, bgColor, strokeColor }) => {
    const renderEmoji = () => {
        switch (type) {
            case 'SA': // Strongly Agree
                return <path d="M10 16C10 16 11.5 18 15 18C18.5 18 20 16 20 16" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>;
            case 'SWA': // Somewhat Agree
                return <path d="M11 17C11 17 12.5 18 15 18C17.5 18 19 17 19 17" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>;
            case 'N': // Neutral
                return <path d="M11 17H19" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>;
            case 'OO': // Okay-okay
                return <path d="M19 18C19 18 17.5 16 15 16C12.5 16 11 18 11 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>;
            case 'SD': // Strongly Disagree
                return <path d="M20 18C20 18 18.5 15 15 15C11.5 15 10 18 10 18" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"/>;
            default: return null;
        }
    };

    return (
        <div className="double-ring-container">
            <div className="outer-black-ring">
                <div className="inner-colored-circle" style={{ backgroundColor: bgColor }}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Eyes */}
                        <circle cx="11" cy="11" r="1.5" fill={strokeColor}/>
                        <circle cx="19" cy="11" r="1.5" fill={strokeColor}/>
                        {/* Mouth */}
                        {renderEmoji()}
                    </svg>
                </div>
            </div>
        </div>
    );
};

const AttachmentEmojiQuiz = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    const options = [
        { id: 'sa', type: 'SA', label: 'Strongly agree', bg: '#432C51', stroke: '#FFFFFF' },
        { id: 'swa', type: 'SWA', label: 'Somewhat agree', bg: '#9E6CAD', stroke: '#FFFFFF' },
        { id: 'n', type: 'N', label: 'Neutral', bg: '#D4B3E0', stroke: '#1A1A1A' },
        { id: 'oo', type: 'OO', label: 'Okay- okay', bg: '#F2E4F4', stroke: '#1A1A1A' },
        { id: 'sd', type: 'SD', label: 'Strongly disagree', bg: '#FFFFFF', stroke: '#1A1A1A' }
    ];

    return (
        <div className="emoji-quiz-wrapper">
            <div className="emoji-quiz-container">
                {/* Header */}
                <header className="emoji-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h3 className="category-title">Attachment & Comfort Zone</h3>
                </header>

                {/* Content */}
                <main className="emoji-main">
                    <h1 className="question-text">I feel safe sharing my feelings when I know I won't be judged.</h1>
                    
                    <div className="options-list">
                        {options.map((opt) => (
                            <div 
                                key={opt.id} 
                                className={`option-row ${selected === opt.id ? 'active' : ''}`}
                                onClick={() => setSelected(opt.id)}
                            >
                                <EmojiIcon type={opt.type} bgColor={opt.bg} strokeColor={opt.stroke} />
                                <span className="option-label">{opt.label}</span>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer Progress */}
                <footer className="emoji-footer">
                    <div className="progress-box">
                        <svg className="ring-svg" width="90" height="90">
                            <circle className="ring-track" cx="45" cy="45" r="38" />
                            <circle 
                                className="ring-fill" 
                                cx="45" cy="45" r="38" 
                                style={{ strokeDashoffset: selected ? 120 : 239 }} 
                            />
                        </svg>
                        <button 
                            className={`next-fab ${selected ? 'ready' : ''}`}
                            disabled={!selected}
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

export default AttachmentEmojiQuiz;