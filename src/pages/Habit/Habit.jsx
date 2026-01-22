import React, { useState } from "react";
import "./Habit.css";

const Habit = () => {
  // Image ke according "Non vegetarian" default select rakha hai
  const [selectedHabit, setSelectedHabit] = useState("Non vegetarian");

  const habits = ["vegetarian", "Non vegetarian", "vegan"];

  return (
    <div className="food-container">
      <div className="food-wrapper">
        {/* Status Bar */}
        <div className="status-bar">
          
          <div className="status-icons">
        
          </div>
        </div>

        {/* Header with Back Button */}
        <div className="food-header">
          <button className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#523461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="food-content">
          <h1 className="food-title">Whats your food habits?</h1>
          <p className="food-subtitle">You can totally skip it if you'd like.</p>

          {/* Selected Habit Display Box */}
          <div className="habit-display-box">
            <span>{selectedHabit}</span>
          </div>

          {/* Picker Card Section */}
          <div className="habit-picker-card">
            <div className="picker-header">
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

        {/* Background Dotted Wave SVG */}
        <div className="food-background-wave">
          <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M-20 140 C 80 180, 200 180, 300 140 C 350 120, 420 140, 450 170" 
              stroke="#E8E0E8" 
              strokeWidth="2.5" 
              strokeDasharray="8 10" 
            />
          </svg>
        </div>

        {/* Footer Next Button with Progress Ring */}
        <div className="food-footer">
          <div className="next-btn-container">
            <div className="progress-circle"></div>
            <button className="purple-next-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habit;