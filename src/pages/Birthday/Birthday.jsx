import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Birthday.css';

const Birthday = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = Array.from({ length: 50 }, (_, i) => (2024 - i).toString());

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
    <div className="birthday-page-wrapper">
      <div className="birthday-container">
        <div className="header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} />
          </button>
          
        </div>

        <div className="scrollable-content">
          <div className="text-section">
            <h1 className="title slide-in">When’s your birthday?</h1>
            <p className="subtitle fade-in">I like sending good vibes to people on their special day</p>
          </div>

          {/* Cake Illustration - Size Increased to 150x120 */}
          <div className="cake-box scale-up">
            <img src='src/assets/cake.png'/>
          </div>

          <div className="display-row">
            <div className="input-field">
              <span>Day</span>
              <div className="val-box">{selectedDay}</div>
            </div>
            <div className="input-field">
              <span>Month</span>
              <div className="val-box">{selectedMonth.substring(0, 3)}</div>
            </div>
            <div className="input-field">
              <span>Year</span>
              <div className="val-box year-width">{selectedYear}</div>
            </div>
          </div>

          {/* Increased margin here to push it down */}
          <div className="action-label bounce-in">Please select date</div>

          <div className="wheel-picker-section">
            <div className="picker-highlight"></div>
            <div className="picker-col" onScroll={(e) => handleScroll(e, 'day', days)}>
              <div className="spacer"></div>
              {days.map(d => <div key={d} className={`picker-item ${selectedDay === d ? 'active' : ''}`}>{d}</div>)}
              <div className="spacer"></div>
            </div>
            <div className="picker-col" onScroll={(e) => handleScroll(e, 'month', months)}>
              <div className="spacer"></div>
              {months.map(m => <div key={m} className={`picker-item ${selectedMonth === m ? 'active' : ''}`}>{m}</div>)}
              <div className="spacer"></div>
            </div>
            <div className="picker-col" onScroll={(e) => handleScroll(e, 'year', years)}>
              <div className="spacer"></div>
              {years.map(y => <div key={y} className={`picker-item ${selectedYear === y ? 'active' : ''}`}>{y}</div>)}
              <div className="spacer"></div>
            </div>
          </div>
        </div>

        <StepProgressButton 
          currentStep={3} 
          totalSteps={20} 
          onClick={handleNext} 
        />
      </div>
    </div>
  );
};

export default Birthday;