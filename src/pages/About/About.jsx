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
    drink: '',
    smoke: '',
    exercise: '',
  });

  const options = ['Regularly', 'Occasionally', 'Never'];

  // Check if all 3 selections are made
  const isAllSelected = choices.drink !== '' && choices.smoke !== '' && choices.exercise !== '';

  const handleSelect = (category, value) => {
    setChoices((prev) => ({ ...prev, [category]: value }));
  };

  const handleNext = () => {
    // 1. Format lifestyle data
    const formattedLifestyle = {
      drink: choices.drink === 'Never' ? 'no' : 'yes',
      smoke: choices.smoke === 'Never' ? 'no' : 'yes',
      exercise: choices.exercise === 'Never' ? 'no' : 'weekly'
    };

    // 2. Combine with previous state
    const finalPayload = {
      ...location.state,
      lifestyle: formattedLifestyle
    };

    console.log("Final Data collected:", finalPayload);

    // 3. Move to the success screen
    // We pass the state forward in case the success screen needs it
    navigate('/honestysuccess', { state: finalPayload });
  };

  return (
    <AppLayout>
      <div className="lifestyle-screen">
        
        <div className="native-header-section">
          <OnboardingHeader 
            title="Let’s talk about lifestyle" 
            description="You can answer honestly — we all have our quirks"
          />
        </div>

        <div className="cards-container slide-up-delay">
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

        <div className="lifestyle-footer-action">
          <StepProgressButton 
            currentStep={14} 
            totalSteps={15} 
            disabled={!isAllSelected} // Button stays disabled until all 3 are selected
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default About;