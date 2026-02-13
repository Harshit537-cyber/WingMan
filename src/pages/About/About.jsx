import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import { saveOnboardingData } from '../../api/onboarding.api';
import { setToken } from '../../utils/token';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // State for lifestyle choices
  const [choices, setChoices] = useState({
  drink: '',
  smoke: '',
  exercise: '',
});

  const options = ['Regularly', 'Occasionally', 'Never'];

  const handleSelect = (category, value) => {
    setChoices((prev) => ({ ...prev, [category]: value }));
  };

  const handleNext = async () => {
    setLoading(true); // Start loading
    try {
      // 1. Format lifestyle data to match your JSON requirement
      const formattedLifestyle = {
        drink: choices.drink === 'Never' ? 'no' : 'yes',
        smoke: choices.smoke === 'Never' ? 'no' : 'yes',
        exercise: choices.exercise === 'Never' ? 'no' : 'weekly'
      };

      // 2. Combine EVERYTHING collected from Screen 1 to 14
      const finalPayload = {
        ...location.state,
        lifestyle: formattedLifestyle
      };

      console.log("Sending Final Data to Network:", finalPayload);

      // 3. ✅ MAKE THE NETWORK CALL
      const response = await saveOnboardingData(finalPayload);

      // 4. ✅ SAVE TOKEN (if your backend returns one in response.data.token)
      if (response.data && response.data.token) {
        setToken(response.data.token);
      }

      // 5. Move to the success screen
      navigate('/honestysuccess');

    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong while saving your profile. Please try again.");
    } finally {
      setLoading(false);
    }
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
            disabled={loading} // ✅ Disable button while API is calling
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default About;