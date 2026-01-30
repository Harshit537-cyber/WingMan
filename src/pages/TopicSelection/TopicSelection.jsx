import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopicSelection.css';

// Images Import (Aapke folder path ke hisaab se)
import broImg from '../../assets/img10/bro.png';
import rafikiImg from '../../assets/img10/rafiki.png';

const TopicSelection = () => {
    const navigate = useNavigate();

    const topicCards = [
        {
            id: 1,
            title: "Daily Habits & Routine",
            desc: "Energy levels, lifestyle habits, and daily flow",
            img: rafikiImg
        },
        {
            id: 2,
            title: "Conflict & Repair Patterns",
            desc: "Handling disagreements, emotional regulation, recovery",
            img: broImg // Yeh center wala card hai (Front)
        },
        {
            id: 3,
            title: "Future Goals & Values",
            desc: "Ambitions, core values, and life direction",
            img: rafikiImg
        }
    ];

    return (
        <div className="topic-screen-wrapper">
            <div className="topic-screen-container">
                
                {/* Header */}
                <header className="topic-header">
                    <button className="topic-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <h3 className="topic-nav-title">Pick A Card</h3>
                </header>

                {/* Horizontal Card Slider Area */}
                <main className="topic-slider-area">
                    <div className="topic-horizontal-scroll">
                        {topicCards.map((card) => (
                            <div key={card.id} className="topic-single-card-item">
                                <div className="topic-inner-card-box">
                                    <h2 className="topic-card-title">{card.title}</h2>
                                    <p className="topic-card-subtitle">{card.desc}</p>
                                    <div className="topic-card-image-holder">
                                        <img src={card.img} alt="illustration" className="topic-card-img" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Footer Continue Button */}
                <footer className="topic-footer">
                    <button className="topic-continue-btn" onClick={() => navigate('/next')}>
                        Continue
                    </button>
                </footer>

            </div>
        </div>
    );
};

export default TopicSelection;