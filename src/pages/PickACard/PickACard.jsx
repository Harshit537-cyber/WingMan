import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickACard.css';

// Assets (Folder structure ke hisaab se)
import broImg from '../../assets/img5/bro.png'; // 2nd Image
import rafikiImg from '../../assets/img5/rafiki.png'; // 3rd Image

const PickACard = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);

    const cardsData = [
        {
            id: 1,
            title: "Emotional Communication",
            description: "Responsiveness, vulnerability, expression styles",
            img: broImg, // Front card par bro.png
        },
        {
            id: 2,
            title: "Physical Activity",
            description: "Staying fit, workout routines, and energy levels",
            img: rafikiImg, // Baki cards par rafiki.png
        },
        {
            id: 3,
            title: "Lifestyle Choices",
            description: "Daily habits, nutrition, and wellness",
            img: rafikiImg, // Baki cards par rafiki.png
        }
    ];

    const handleScroll = (e) => {
        const scrollPosition = e.target.scrollLeft;
        const cardWidth = e.target.offsetWidth * 0.8;
        const index = Math.round(scrollPosition / cardWidth);
        setActiveCard(index);
    };

    return (
        <div className="pick-card-wrapper">
            {/* Header Section */}
            <div className="pick-card-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h2 className="header-title">Pick A Card</h2>
            </div>

            {/* Horizontal Cards Slider */}
            <div className="cards-slider-container" onScroll={handleScroll}>
                {cardsData.map((card, index) => (
                    <div 
                        key={card.id} 
                        className={`card-item ${activeCard === index ? 'active' : ''}`}
                    >
                        <div className="card-inner-content">
                            <div className="card-text-section">
                                <h3 className="card-title">{card.title}</h3>
                                <p className="card-desc">{card.description}</p>
                            </div>
                            <div className="card-image-wrapper">
                                <img src={card.img} alt={card.title} className="card-main-img" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Action */}
            <div className="pick-card-footer">
                <button className="continue-btn" onClick={() => navigate('/next')}>
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PickACard;