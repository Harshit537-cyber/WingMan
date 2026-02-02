import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PickCard.css";

// Assets
import attachmentImg from "../../assets/img5/rafiki.png";
import lifestyleImg from "../../assets/img5/rafiki.png";
import AttachmentImg from "../../assets/img5/bro.png";

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
      title: "Attachment & Comfort Zone",
      description:
        "Emotional availability, reassurance, independence, fear of closeness",
      img: AttachmentImg,
      route: "/attachment",
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
      title: "Conflict & Repair Patterns",
      description: "Handling disagreements, emotional regulation, recovery",
      img: lifestyleImg,
      route: "/conflict-quiz",
    },
    {
      id: 5,
      title: "Growth, Readiness & Emotional Maturity",
      description: "Reflection, accountability, long-term mindset",
      img: attachmentImg,
      route: "/assessment-quiz",
    },
  ];

  // 🔥 FIXED SCROLL LOGIC
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;

      // Card ki width aur gap (+15px gap) nikalna
      const cardElement = container.querySelector(".card-wrapper");
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth + 15;
        const index = Math.round(scrollLeft / cardWidth);

        if (index >= 0 && index < cardsData.length) {
          setActiveCard(index);
        }
      }
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

      <div
        className="horizontal-scroll-section"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`card-wrapper ${activeCard === index ? "active-card" : "inactive-card"}`}
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
        {/* Spacer for last card scrolling */}
        <div className="scroll-end-spacer"></div>
      </div>

      <footer className="fixed-footer">
        <button className="cta-button" onClick={handleContinue}>
          Continue
        </button>
      </footer>
    </div>
  );
};

export default PickCard;
