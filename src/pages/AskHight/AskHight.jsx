import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskHight.css';

// Images Import
import maleImg from '../../assets/male-hight.png';
import femaleImg from '../../assets/female-hight.png';

const AskHight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const gender = location.state?.gender || 'male'; 
  
  // Height range: 7.0 down to 4.0
  const heights = Array.from({ length: 31 }, (_, i) => (7.0 - i * 0.1).toFixed(1));
  
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

  // Scale calculation logic preserved
  const calculateScale = (height) => {
    const val = parseFloat(height);
    const baseScale = 0.8; 
    const factor = (val - 4.0) / 3; 
    return baseScale + (factor * 0.4); 
  };

  return (
    <AppLayout> 
      <div className="onboarding-screen-container">
        
        {/* TOP SECTION */}
        <div className="onboarding-header-wrap">
          <OnboardingHeader 
            title="Now tell me, how tall are you?" 
            description="Just getting the full picture of you."
          />
        </div>

        {/* MIDDLE SECTION: Vertical Centered Content */}
        <div className="onboarding-body-content">
          <div className="selector-main-area">
            
            {/* Illustration Section */}
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

            {/* Ruler Section */}
            <div className="ruler-wrapper fade-in-right">
              <div className="ruler-scroll" ref={scrollRef} onScroll={onScroll}>
                <div className="ruler-spacer"></div>
                {heights.map((h) => (
                  <div key={h} className={`ruler-item ${selectedHeight === h ? 'active' : ''}`}>
                    <div className="line"></div>
                    <span className="label">{h}</span>
                  </div>
                ))}
                <div className="ruler-spacer"></div>
              </div>
            </div>

            {/* Display Box */}
            <div className="height-display-box bounce-in">
              <span className="unit-label">Inch</span>
              <div className="value-card">
                {selectedHeight}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Fixed Footer */}
        <div className="onboarding-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton 
            currentStep={4} 
            totalSteps={20} 
            onClick={() => navigate('/Acesslocation', { state: { ...location.state, height: selectedHeight } })} 
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default AskHight;