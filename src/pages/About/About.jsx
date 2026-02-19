import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import { saveOnboardingData } from '../../api/onboarding.api'; // ✅ Import API function
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

  // State to handle API loading status
  const [isLoading, setIsLoading] = useState(false);

  const options = ['Regularly', 'Occasionally', 'Never'];

  // Check if all 3 selections are made
  const isAllSelected = choices.drink !== '' && choices.smoke !== '' && choices.exercise !== '';

  const handleSelect = (category, value) => {
    setChoices((prev) => ({ ...prev, [category]: value }));
  };

  const handleNext = async () => {
    // 1. Format lifestyle data
    const formattedLifestyle = {
      drink: choices.drink === 'Never' ? 'no' : 'yes',
      smoke: choices.smoke === 'Never' ? 'no' : 'yes',
      exercise: choices.exercise === 'Never' ? 'no' : 'weekly'
    };

    // 2. Combine with previous state (Data from all previous screens)
    const finalPayload = {
      ...location.state,
      lifestyle: formattedLifestyle
    };

    console.log("Final Data collected:", finalPayload);

    try {
      setIsLoading(true); // Disable button while saving

      // ✅ 3. Call the API function
      const response = await saveOnboardingData(finalPayload);
      
      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        // ✅ 4. Success: Move to the success screen
        // Passing finalPayload or response data if needed
        navigate('/honestysuccess', { state: finalPayload }); 
      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Check your internet connection or try again.");
    } finally {
      setIsLoading(false); // Re-enable button
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
            // Button disabled if selection incomplete OR if API is loading
            disabled={!isAllSelected || isLoading} 
            onClick={handleNext} 
          />
          {/* Optional: Show simple loading text */}
          {isLoading && <p style={{textAlign: 'center', fontSize: '12px', marginTop: '10px'}}>Saving your profile...</p>}
        </div>

      </div>
    </AppLayout>
  );
};

export default About;