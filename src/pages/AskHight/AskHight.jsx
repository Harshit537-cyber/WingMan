import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './AskHight.css';

// Images Import
import maleImg from '../../assets/male-height.png';
import femaleImg from '../../assets/female-height.png';

const AskHight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const gender = location.state?.gender || 'male'; 
  
  // FIXED: Array generated from 7.0 down to 4.0 (Descending Order)
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
    // Scroll automatically to 5.3 position on load
    const initialIndex = heights.indexOf('5.3');
    if (scrollRef.current && initialIndex !== -1) {
      scrollRef.current.scrollTop = initialIndex * 40;
    }
  }, []);

  return (
    <div className="height-container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="content-wrapper">
        <h1 className="title slide-in-top">Now tell me, how tall are you?</h1>
        <p className="subtitle fade-in">Just getting the full picture of you.</p>

        <div className="selector-main-area">
          <div className="illustration-box slide-in-left">
            <div className="purple-bg"></div>
            <img 
              src={gender === 'male' ? maleImg : femaleImg} 
              alt="Character" 
              className="character-img" 
            />
          </div>

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

          <div className="height-display-box bounce-in">
            <span className="unit-label">Inch</span>
            <div className="value-card">
              {selectedHeight}
            </div>
          </div>
        </div>
      </div>

      <StepProgressButton 
        currentStep={4} 
        totalSteps={20} 
        onClick={() => navigate('/next-step', { state: { ...location.state, height: selectedHeight } })} 
      />
    </div>
  );
};

export default AskHight;