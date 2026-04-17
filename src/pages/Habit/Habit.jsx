import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Habit.css';

const Habit = () => {
  const [selectedHabit, setSelectedHabit] = useState("Non vegetarian");
  const navigate = useNavigate();
  const location = useLocation();

  const habits = ["vegetarian", "Non vegetarian", "vegan"];

  const handleNext = () => {
    // ✅ Changing key to 'habits' to match your network requirement
    navigate('/intrest', {
      state: {
        ...location.state,
        habits: selectedHabit
      }
    });
  };

  return (
    <AppLayout>
      <div className="habit-screen-container">

        {/* Background Animation Graphics */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none" className="dashed-svg">
            <path d="M-20 140 C 80 180, 200 180, 300 140 C 350 120, 420 140, 450 170"
              stroke="#E2D8E8" strokeWidth="2.5" strokeDasharray="8 10" />
          </svg>
        </div>

        {/* TOP SECTION: Shared Header */}
        <div className="native-header-section">
          <OnboardingHeader
            title="Whats your food habits?"
            description="You can totally skip it if you'd like."
          />
        </div>

        {/* MIDDLE SECTION: Picker Content */}
        <div className="habit-body-content">
          <div className="picker-wrapper slide-up-delay">

            {/* Display Box */}
            <div className="habit-display-box">
              <span>{selectedHabit}</span>
            </div>

            {/* Picker Card Section */}
            <div className="habit-picker-card">
              <div className="habit-picker-header">
                Please select your food habits
              </div>
              <div className="habit-list">
                {habits.map((habit) => (
                  <div
                    key={habit}
                    className={`habit-item ${selectedHabit === habit ? "selected" : ""}`}
                    onClick={() => setSelectedHabit(habit)}
                  >
                    {habit}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Step 11 Button */}
        <div className="habit-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton
            currentStep={12.5}
            totalSteps={15}
            disabled={!selectedHabit}
            onClick={handleNext}
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Habit;