import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RepairPatternQuiz.css";

// Images paths
import imgAvoid from "../../assets/img12/character-1.png";
import imgAddress from "../../assets/img12/Group.png";
import imgCompromise from "../../assets/img12/Characters.png";
import imgReflect from "../../assets/img12/character-2.png";

const ConflictRepairQuiz = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const quizOptions = [
    { id: "opt1", text: "Avoid it until things calm down", image: imgAvoid },
    { id: "opt2", text: "Address it right away", image: imgAddress },
    { id: "opt3", text: "Compromise quickly to move on", image: imgCompromise },
    { id: "opt4", text: "Reflect before bringing it up", image: imgReflect },
  ];

  return (
    <div className="crp-page-wrapper">
      <div className="crp-container">
        <header className="crp-header">
          <button className="crp-back-btn" onClick={() => navigate(-1)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h2 className="crp-nav-title">Conflict & Repair Patterns</h2>
        </header>

        <main className="crp-content">
          <h1 className="crp-question">When conflict arises, I tend to:</h1>

          <div className="crp-options-grid">
            {quizOptions.map((item) => (
              <div
                key={item.id}
                className={`crp-card ${selectedId === item.id ? "crp-selected" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <p className="crp-card-text">{item.text}</p>
                <div className="crp-img-container">
                  <img
                    src={item.image}
                    alt="illustration"
                    className="crp-card-img"
                  />
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="crp-footer">
          <div className="crp-action-area">
            <svg
              className="crp-progress-arc"
              width="60"
              height="20"
              viewBox="0 0 60 20"
            >
              <path
                d="M 10 15 Q 30 5 50 15"
                fill="none"
                stroke="#5D326F"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <button
              className="crp-next-button"
              onClick={() => selectedId && navigate("/conflict-repair-Quiz")}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
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

export default ConflictRepairQuiz;
