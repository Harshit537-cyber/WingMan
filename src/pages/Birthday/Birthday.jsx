import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Birthday.css';

const Birthday = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 50 }, (_, i) => (2025 - i).toString());

  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2005');

  const handleNext = () => {
    const birthdayData = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    navigate('/hight', { 
      state: { ...location.state, birthday: birthdayData } 
    });
  };

  const handleScroll = (e, type, data) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = 45; 
    const index = Math.round(scrollTop / itemHeight);
    
    if (data[index]) {
      if (type === 'day') setSelectedDay(data[index]);
      if (type === 'month') setSelectedMonth(data[index]);
      if (type === 'year') setSelectedYear(data[index]);
    }
  };

  return (
    <AppLayout> 
      <div className="birthday-screen-container">
        
        <div className="birthday-header-section">
          <OnboardingHeader 
            title="When’s your birthday?" 
            description="I like acknowledging the days that matter."
          />
        </div>

        <div className="birthday-body-content">
          
          {/* CUSTOM CSS CAKE WITH ANIMATION */}
          <div className="cake-illustration-box scale-up">
            <div className="custom-cake-wrapper">
              
              {/* Confetti Elements */}
              <div className="confetti c1"></div>
              <div className="confetti c2"></div>
              <div className="confetti c3"></div>
              <div className="confetti c4"></div>

              <div className="cake-main">
                {/* Three Candles */}
                <div className="candles-row">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="purple-candle">
                      <div className="flame-glow"></div>
                    </div>
                  ))}
                </div>

                {/* Top Tier */}
                <div className="tier tier-1">
                  <div className="scallop-border"></div>
                </div>

                {/* Bottom Tier */}
                <div className="tier tier-2">
                  <div className="scallop-border"></div>
                </div>
                <div className="cake-base-line"></div>
              </div>
            </div>
          </div>

          <div className="date-display-row fade-in">
            <div className="display-unit">
              <span className="unit-label">Day</span>
              <div className="unit-box">{selectedDay}</div>
            </div>
            <div className="display-unit">
              <span className="unit-label">Month</span>
              <div className="unit-box">{selectedMonth.substring(0, 3)}</div>
            </div>
            <div className="display-unit">
              <span className="unit-label">Year</span>
              <div className="unit-box year-large">{selectedYear}</div>
            </div>
          </div>

          <div className="selection-prompt-banner bounce-in">Please select date</div>

          <div className="wheel-picker-wrapper">
            <div className="picker-selection-bar"></div>
            
            <div className="picker-column" onScroll={(e) => handleScroll(e, 'day', days)}>
              <div className="picker-spacer"></div>
              {days.map(d => <div key={d} className={`picker-item-val ${selectedDay === d ? 'is-active' : ''}`}>{d}</div>)}
              <div className="picker-spacer"></div>
            </div>

            <div className="picker-column" onScroll={(e) => handleScroll(e, 'month', months)}>
              <div className="picker-spacer"></div>
              {months.map(m => <div key={m} className={`picker-item-val ${selectedMonth === m ? 'is-active' : ''}`}>{m}</div>)}
              <div className="picker-spacer"></div>
            </div>

            <div className="picker-column" onScroll={(e) => handleScroll(e, 'year', years)}>
              <div className="picker-spacer"></div>
              {years.map(y => <div key={y} className={`picker-item-val ${selectedYear === y ? 'is-active' : ''}`}>{y}</div>)}
              <div className="picker-spacer"></div>
            </div>
          </div>
        </div>

        <div className="birthday-footer-action">
          <div className="footer-wavy-line"></div>
          <StepProgressButton 
            currentStep={3} 
            totalSteps={20} 
            onClick={handleNext} 
          />
        </div>

      </div>
    </AppLayout> 
  );
};

export default Birthday;