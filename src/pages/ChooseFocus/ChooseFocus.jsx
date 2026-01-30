import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChooseFocus.css';

// Apne project ke structure ke anusaar image paths ko sahi karein
import centerCardImg from '../../assets/img13/rafiki.svg'; // Center card ki image
import sideCardImg from '../../assets/img13/Group_163158.svg';    // Side cards ki image


const ChooseFocus = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Growth, Readiness & Emotional Maturity",
      subtitle: "Reflection, accountability, long-term mindset",
      image: centerCardImg
    },
    {
      id: 2,
      title: "Lifestyle & Values",
      subtitle: "Priorities, balance, and what truly matters",
      image: sideCardImg
    },
    {
      id: 3,
      title: "Conflict & Repair",
      subtitle: "Navigating disagreements and finding solutions",
      image: sideCardImg
    }
  ];

  // Mouse drag logic
  const handleMouseDown = (e) => {
    setIsDown(true);
    scrollRef.current.classList.add('active');
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    setIsDown(false);
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2.5; // Drag speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="focus-web-container">
      <div className="focus-screen">
        
        <div className="focus-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          {/* Title ko image ke anusaar update kiya gaya */}
          <h2 className="header-title">Pick A Card</h2>
          <div style={{ width: 24 }}></div> {/* Title ko center mein rakhne ke liye */}
        </div>

        <div className="card-carousel-wrapper">
          <div 
            className="card-carousel"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {cards.map((card) => (
              <div className="card-item" key={card.id}>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-subtitle">{card.subtitle}</p>
                  <div className="card-illustration">
                    <img src={card.image} alt={card.title} draggable="false" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="focus-footer">
          <button className="continue-btn" onClick={() => navigate('/next-page')}>
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChooseFocus;