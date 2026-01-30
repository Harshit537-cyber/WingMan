import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickCard.css';

// Assets
import attachmentImg from "../../assets/img5/rafiki.png"; 
import lifestyleImg from '../../assets/img5/rafiki.png'; 

const PickCard = () => {
    const navigate = useNavigate();
    const [activeCard, setActiveCard] = useState(0);
    const scrollRef = useRef(null);

    const cardsData = [
        {
            id: 1,
            title: "Lifestyle & Value ",
            description: "Consistency, priorities, family–career balance",
            img: attachmentImg,
        },
        {
            id: 2,
            title: "Lifestyle & Value",
            description: "Consistency, priorities, family–career balance",
            img: lifestyleImg,
        },
        {
            id: 3,
            title: "Emotional Communication",
            description: "Responsiveness, vulnerability, expression styles",
            img: attachmentImg,
        }
    ];

    const handleScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            // Card width (80%) + gap calculations
            const index = Math.round(scrollLeft / (width * 0.82)); 
            setActiveCard(index);
        }
    };

    return (
        <div className="main-container-fixed">
            {/* Header - Fixed */}
            <header className="fixed-header">
                <button className="back-btn-icon" onClick={() => navigate(-1)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <h1 className="title-text">Pick A Card</h1>
            </header>

            {/* Scrollable Cards Area */}
            <div 
                className="horizontal-scroll-section" 
                ref={scrollRef} 
                onScroll={handleScroll}
            >
                {cardsData.map((card, index) => (
                    <div 
                        key={card.id} 
                        className={`card-wrapper ${activeCard === index ? 'active-card' : 'inactive-card'}`}
                    >
                        <div className="card-content-box">
                            <div className="text-area">
                                <h2 className="card-heading">{card.title}</h2>
                                <p className="card-subtext">{card.description}</p>
                            </div>
                            <div className="image-area">
                                <img src={card.img} alt={card.title} className="illustration" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer - Fixed */}
            <footer className="fixed-footer">
                <button className="cta-button" onClick={() => navigate('/next')}>
                    Continue
                </button>
            </footer>
        </div>
    );
};

export default PickCard;