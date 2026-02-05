import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskHight.css';

// Images Import
import maleImg from '../../assets/male-hight.svg';
import femaleImg from '../../assets/female-hight.svg';

const AskHight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const gender = location.state?.gender || 'male'; 
  const heights = [];

for (let ft = 7; ft >= 4; ft--) {
  for (let inch = 11; inch >= 0; inch--) {
    heights.push(`${ft}.${inch}`);
  }
}

  
  const [selectedHeight, setSelectedHeight] = useState('5.3');
  const scrollRef = useRef(null);

  const onScroll = () => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const itemHeight = 40; 
      const index = Math.round(scrollTop / itemHeight);
      if (heights[index]) {
        setSelectedHeight(heights[index]);
      }
    }
  };

  useEffect(() => {
    const initialIndex = heights.indexOf('5.3');
    if (scrollRef.current && initialIndex !== -1) {
      scrollRef.current.scrollTop = initialIndex * 40;
    }
  }, []);

  const calculateScale = (height) => {
    const val = parseFloat(height);
    const baseScale = 0.7; // Thoda kam kiya mobile ke liye
    const factor = (val - 4.0) / 3; 
    return baseScale + (factor * 0.4); 
  };

  const handleNext = () => {
    navigate('/Acesslocation', { 
      state: { ...location.state, height: selectedHeight } 
    });
  };

  return (
    <AppLayout> 
      <div className="hight-screen-container">
        
        <div className="hight-header-section">
          <OnboardingHeader 
            title="Now tell me, how tall are you?" 
            description="I'll use this to calculate your BMI."
          />
        </div>

        <div className="hight-body-content">
          <div className="selector-main-area">
            
            {/* Character Illustration */}
            <div className="illustration-wrapper slide-in-left">
              <div className="character-bg-box">
                <img 
                  src={gender === 'male' ? maleImg : femaleImg} 
                  alt="Character" 
                  className="character-img" 
                  style={{ 
                    transform: `translateX(-50%) scale(${calculateScale(selectedHeight)})`,
                    transformOrigin: 'bottom center' 
                  }}
                />
              </div>
            </div>

            {/* Ruler Picker */}
            <div className="ruler-wrapper fade-in-right">
              <div className="ruler-scroll" ref={scrollRef} onScroll={onScroll}>
                <div className="ruler-spacer"></div>
                {heights.map((h) => (
                  <div key={h} className={`ruler-item ${selectedHeight === h ? 'activee' : ''}`}>
                    <div className="line"></div>
                    <span className="label">{h}</span>
                  </div>
                ))}
                <div className="ruler-spacer"></div>
              </div>
            </div>

            {/* Height Display Card */}
            <div className="height-display-box bounce-in">
              <span className="unit-label">Inch</span>
              <div className="value-card">
                {selectedHeight}
              </div>
            </div>

          </div>
        </div>

        <div className="hight-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={4} 
            totalSteps={15} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default AskHight;