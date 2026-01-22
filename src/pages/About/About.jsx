import React, { useState } from 'react';
import './About.css';

const About = () => {
  // Har question ke liye state banayi hai
  const [choices, setChoices] = useState({
    drink: 'Regularly',
    smoke: 'Occasionally',
    exercise: 'Regularly',
  });

  const options = ['Regularly', 'Occasionally', 'Never'];

  const handleSelect = (category, value) => {
    setChoices((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="lifestyle-screen">
      {/* Top Status Bar */}
      <div className="status-bar">
        
      </div>

      {/* Back Button */}
      <div className="nav-header">
        <button className="back-btn">⟨</button>
      </div>

      {/* Main Heading Section */}
      <div className="header-text">
        <h1 className="main-title">Let’s talk about lifestyle</h1>
        <p className="sub-title">
          You can answer honestly — we all have our quirks
        </p>
      </div>

      {/* Question Cards Container */}
      <div className="cards-container">
        {/* Drink Card */}
        <div className="lifestyle-card">
          <h2 className="card-question">Do You Drink?</h2>
          <div className="options-row">
            {options.map((opt) => (
              <button
                key={opt}
                className={`option-pill ${choices.drink === opt ? 'active' : ''}`}
                onClick={() => handleSelect('drink', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Smoke Card */}
        <div className="lifestyle-card">
          <h2 className="card-question">Do You Smoke?</h2>
          <div className="options-row">
            {options.map((opt) => (
              <button
                key={opt}
                className={`option-pill ${choices.smoke === opt ? 'active' : ''}`}
                onClick={() => handleSelect('smoke', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Card (Spelling as per image: Excercise) */}
        <div className="lifestyle-card">
          <h2 className="card-question">Do You Excercise?</h2>
          <div className="options-row">
            {options.map((opt) => (
              <button
                key={opt}
                className={`option-pill ${choices.exercise === opt ? 'active' : ''}`}
                onClick={() => handleSelect('exercise', opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation Button */}
      <div className="footer-nav">
        <div className="progress-circle-wrapper">
          <svg className="svg-progress" viewBox="0 0 100 100">
            <circle className="circle-bg" cx="50" cy="50" r="45" />
            <circle className="circle-active" cx="50" cy="50" r="45" />
          </svg>
          <button className="next-circle-button">→</button>
        </div>
      </div>
    </div>
  );
};

export default About;