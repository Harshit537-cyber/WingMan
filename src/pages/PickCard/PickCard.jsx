import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PickCard.css";

// Assets
import attachmentImg from "../../assets/lifestyle.svg";
import growthImg from "../../assets/growth.svg";
import AttachmentImg from "../../assets/bro.svg";
import emotionalImg from "../../assets/emotional.svg";
import ConflictImg from "../../assets/Conflict.svg";

const PickCard = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState([]); // Store completed quiz names
  const scrollRef = useRef(null);

  const cardsData = [
    { id: 1, title: "Lifestyle & Value", description: "Consistency, priorities, family–career balance", img: attachmentImg, route: "/lifestyle-quiz" },
    { id: 2, title: "Attachment & Comfort Zone", description: "Emotional availability, reassurance, independence, fear of closeness", img: AttachmentImg, route: "/attachment" },
    { id: 3, title: "Emotional Communication", description: "Responsiveness, vulnerability, expression styles", img: emotionalImg, route: "/upset" },
    { id: 4, title: "Conflict & Repair Patterns", description: "Handling disagreements, emotional regulation, recovery", img: ConflictImg, route: "/conflict-quiz" },
    { id: 5, title: "Growth, Readiness & Emotional Maturity", description: "Reflection, accountability, long-term mindset", img: growthImg, route: "/assessment-quiz" },
  ];

  // 1. Check LocalStorage on Mount
  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem("quiz_progress")) || [];
    // Hum sirf quiz titles nikal rahe hain jo already store hain
    const completedNames = progress.map((item) => item.quizName);
    setCompletedQuizzes(completedNames);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
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
    // Agar quiz completed hai toh aage nahi jane dena
    if (completedQuizzes.includes(selectedCard.title)) {
      return; 
    }
    if (selectedCard?.route) {
      navigate(selectedCard.route);
    }
  };

  // Check if current active card is completed
  const isCurrentCardCompleted = completedQuizzes.includes(cardsData[activeCard]?.title);

  return (
    <div className="main-container-fixed">
      <header className="fixed-header">
        <button className="back-btn-icon" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="title-text">Pick A Card</h1>
      </header>

      <div className="horizontal-scroll-section" ref={scrollRef} onScroll={handleScroll}>
        {cardsData.map((card, index) => {
          const isDone = completedQuizzes.includes(card.title);
          return (
            <div key={card.id} className={`card-wrapper ${activeCard === index ? "active-card" : "inactive-card"}`}>
              <div className={`card-content-box ${isDone ? "disabled-card" : ""}`}>
                
                {/* 2. Checkmark Icon Logic */}
                {isDone && (
                  <div className="completion-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#5D326F">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                )}

                <div className="text-area">
                  <h2 className="card-heading">{card.title}</h2>
                  <p className="card-subtext">{card.description}</p>
                </div>
                <div className="image-area">
                  <img src={card.img} alt={card.title} className="illustration" />
                </div>
              </div>
            </div>
          );
        })}
        <div className="scroll-end-spacer"></div>
      </div>

      <footer className="fixed-footer">
        <button 
          className={`cta-button ${isCurrentCardCompleted ? "btn-disabled" : ""}`} 
          onClick={handleContinue}
          disabled={isCurrentCardCompleted}
        >
          {isCurrentCardCompleted ? "Already Completed" : "Continue"}
        </button>
      </footer>
    </div>
  );
};

export default PickCard;