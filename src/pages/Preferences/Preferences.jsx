import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
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
    navigate('/sharingSuccess');
  };

  // Logic for Slider UI positioning
  const agePercent = ((age - 18) / (60 - 18)) * 100;
  const heightPercent = ((height - 4) / (8 - 4)) * 100;

  return (
    <AppLayout>
      <div className="pref-screen-container">
        
        {/* FIXED HEADER SECTION */}
        <div className="pref-header-section">
          <OnboardingHeader 
            title="What's your preferences?" 
            description="Help us find the best match for you."
          />
        </div>

        {/* SCROLLABLE BODY CONTENT */}
        <div className="pref-body-content">
          <div className="fields-stack">
            
            {/* Age Slider Section */}
            <div className="slider-group">
              <div className="pref-label-row">
                <label className="pref-field-label">Age</label>
                <span className="pref-value-display">{age} yrs</span>
              </div>
              <div className="custom-slider-container">
                <div className="slider-track">
                  <div className="slider-progress" style={{ width: `${agePercent}%` }}></div>
                </div>
                <input 
                  type="range" min="18" max="60" value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  className="real-slider"
                />
                <div className="slider-thumb" style={{ left: `${agePercent}%` }}>{age}</div>
              </div>
            </div>

            {/* Height Slider Section */}
            <div className="slider-group">
              <div className="pref-label-row">
                <label className="pref-field-label">Height</label>
                <span className="pref-value-display">{height} ft</span>
              </div>
              <div className="custom-slider-container">
                <div className="slider-track">
                  <div className="slider-progress" style={{ width: `${heightPercent}%` }}></div>
                </div>
                <input 
                  type="range" min="4" max="8" step="0.1" value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className="real-slider"
                />
                <div className="slider-thumb" style={{ left: `${heightPercent}%` }}>{Math.round(height)}</div>
              </div>
            </div>

            {/* Dropdowns */}
            <div className="pref-dropdown-item">
              <label className="pref-field-label">Religion</label>
              <div className="pref-select-box">
                <select value={religion} onChange={(e) => setReligion(e.target.value)}>
                  <option>Hindu</option>
                  <option>Muslim</option>
                  <option>Sikh</option>
                  <option>Christian</option>
                </select>
                <span className="pref-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="pref-dropdown-item">
              <label className="pref-field-label">Ethnicity</label>
              <div className="pref-select-box">
                <select value={ethnicity} onChange={(e) => setEthnicity(e.target.value)}>
                  <option>Tamil Nadu</option>
                  <option>Punjab</option>
                  <option>Maharashtra</option>
                  <option>Gujarat</option>
                </select>
                <span className="pref-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="pref-dropdown-item">
              <label className="pref-field-label">Language Spoken</label>
              <div className="pref-select-box">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Punjabi</option>
                </select>
                <span className="pref-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5D326F" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FIXED FOOTER SECTION */}
        <div className="pref-footer-action">
          <button onClick={handleContinue} className="pref-continue-btn">
            Continue
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default Preferences;