import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for lifestyle choices
  const [choices, setChoices] = useState({
    drink: 'Regularly',
    smoke: 'Occasionally',
    exercise: 'Regularly',
  });

  const options = ['Regularly', 'Occasionally', 'Never'];

  const handleSelect = (category, value) => {
    setChoices((prev) => ({ ...prev, [category]: value }));
  };

  const handleNext = () => {
    navigate('/next-screen', { 
      state: { ...location.state, lifestyle: choices } 
    });
  };

  return (
    <AppLayout>
      <div className="lifestyle-screen">
        
        {/* TOP SECTION: Shared Header */}
        <div className="native-header-section">
          <OnboardingHeader 
            title="Let’s talk about lifestyle" 
            description="You can answer honestly — we all have our quirks"
          />
        </div>

        {/* MIDDLE SECTION: Cards Container */}
        <div className="cards-container slide-up-delay">
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

          {/* Exercise Card */}
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

        {/* BOTTOM SECTION: Step 12 Button */}
        <div className="lifestyle-footer-action">
          <StepProgressButton 
            currentStep={12} 
            totalSteps={15} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default About;