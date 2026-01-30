import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Preferences.css';

const Preferences = () => {
  const navigate = useNavigate();

  // States for Sliders
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(6);

  // States for Dropdowns
  const [religion, setReligion] = useState('Hindu');
  const [ethnicity, setEthnicity] = useState('Tamil Nadu');
  const [language, setLanguage] = useState('Hindi');

  const handleContinue = () => {
    navigate('/home');
  };

  // Logic for Slider Percentages (UI positioning)
  const agePercent = ((age - 18) / (60 - 18)) * 100;
  const heightPercent = ((height - 4) / (8 - 4)) * 100;

  return (
    <div className="web-container">
      <div className="upload-screen">
        
        {/* Top Header */}
        <div className="top-nav-bar">
          <p className="header-text">Preferences</p>
        </div>

        <div className="content-area">
          <h1 className="upload-title">What's your preferences?</h1>

          <div className="fields-container">
            
            {/* Age Slider Section */}
            <div className="slider-group">
              <div className="label-row">
                <label className="field-label">Age</label>
                <span className="value-display">{age} yrs</span>
              </div>
              <div className="custom-slider-container">
                <div className="slider-track">
                  <div 
                    className="slider-progress" 
                    style={{ width: `${agePercent}%` }}
                  ></div>
                </div>
                <input 
                  type="range" 
                  min="18" 
                  max="60" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  className="real-slider"
                />
                <div className="slider-thumb" style={{ left: `${agePercent}%` }}>
                  {age}
                </div>
              </div>
            </div>

            {/* Height Slider Section */}
            <div className="slider-group">
              <div className="label-row">
                <label className="field-label">Height</label>
                <span className="value-display">{height} ft</span>
              </div>
              <div className="custom-slider-container">
                <div className="slider-track">
                  <div 
                    className="slider-progress" 
                    style={{ width: `${heightPercent}%` }}
                  ></div>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="8" 
                  step="0.1"
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className="real-slider"
                />
                <div className="slider-thumb" style={{ left: `${heightPercent}%` }}>
                  {Math.round(height)}
                </div>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="dropdown-group">
              <label className="field-label">Religion</label>
              <div className="select-wrapper">
                <select value={religion} onChange={(e) => setReligion(e.target.value)}>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Sikh</option>
                  <option>Christian</option>
                </select>
                <span className="arrow-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="dropdown-group">
              <label className="field-label">Ethnicity</label>
              <div className="select-wrapper">
                <select value={ethnicity} onChange={(e) => setEthnicity(e.target.value)}>
                  <option>Tamil Nadu</option>
                  <option>Punjab</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                </select>
                <span className="arrow-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="dropdown-group">
              <label className="field-label">Language Spoken</label>
              <div className="select-wrapper">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Punjabi</option>
                </select>
                <span className="arrow-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Continue Button */}
        <div className="footer-button">
          <button onClick={handleContinue} className="continue-btn-purple">
            Continue
          </button>
        </div>

      </div>
    </div>
  );
};

export default Preferences;