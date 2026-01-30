import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PickCard.css";

// Assets
import attachmentImg from "../../assets/img5/rafiki.png";
import lifestyleImg from "../../assets/img5/rafiki.png";

const PickCard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef(null);

  const cardsData = [
    {
      id: 1,
      title: "Lifestyle & Value",
      description: "Consistency, priorities, family–career balance",
      img: attachmentImg,
      route: "/lifestyle-quiz",
    },
    {
      id: 2,
      title: "Health & Fitness",
      description: "Daily habits, wellness, physical activity",
      img: lifestyleImg,
      route: "/mavita-screen-2",
    },
    {
      id: 3,
      title: "Emotional Communication",
      description: "Responsiveness, vulnerability, expression styles",
      img: attachmentImg,
      route: "/upset",
    },
    {
      id: 4,
      title: "Personal Interests",
      description: "Hobbies, passions, leisure preferences",
      img: lifestyleImg,
      route: "/mavita-screen-4",
    },
    {
      id: 5,
      title: "Future Goals",
      description: "Aspirations, planning, long-term vision",
      img: attachmentImg,
      route: "/mavita-screen-5",
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / (width * 0.82));
      setActiveCard(index);
    }
  };

  const handleContinue = () => {
    const selectedCard = cardsData[activeCard];
    if (selectedCard?.route) {
      navigate(selectedCard.route);
    }
  };

  return (
    <div className="main-container-fixed">
      {/* Header */}
      <header className="fixed-header">
        <button className="back-btn-icon" onClick={() => navigate(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5D326F"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="title-text">Pick A Card</h1>
      </header>

      {/* Cards */}
      <div
        className="horizontal-scroll-section"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`card-wrapper ${
              activeCard === index ? "active-card" : "inactive-card"
            }`}
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

      {/* Footer */}
      <footer className="fixed-footer">
        <button className="cta-button" onClick={handleContinue}>
          Continue
        </button>
      </footer>
    </div>
  );
};

export default PickCard;
