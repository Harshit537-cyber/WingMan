import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './DatePreferences.css';

const DatePreferences = () => {
  const navigate = useNavigate();
  
  // States
  const [dateType, setDateType] = useState('Restaurant'); 
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [payWay, setPayWay] = useState('Him');
  const [budget, setBudget] = useState({ min: 500, max: 1600 });

  const moodData = {
    Restaurant: ['North- Indian', 'South- Indian', 'Fine dine', 'Thai', 'Italian', 'Sandwich/Wraps', 'Non-Veg', 'Chinese', 'Sea food', 'Rarely'],
    Cafe: ['Coffee', 'Fresh Juices', 'Cold Coffee', 'Pasta', 'Mocha', 'Italian', 'Sandwich/Wraps', 'Cakes', 'Grilled Cheese', 'Soup']
  };

  const toggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleDateTypeChange = (type) => {
    setDateType(type);
    setSelectedMoods([]); 
  };

  // Slider Logic
  const handleMinBudget = (e) => {
    const val = Math.min(parseInt(e.target.value), budget.max - 100);
    setBudget({ ...budget, min: val });
  };

  const handleMaxBudget = (e) => {
    const val = Math.max(parseInt(e.target.value), budget.min + 100);
    setBudget({ ...budget, max: val });
  };

  return (
    <AppLayout>
      <div className="date-pref-main-wrapper">
        
        {/* HEADER */}
        <header className="top-nav-bar">
          <button className="back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="nav-title">Date Preferences</h1>
          <div className="nav-right">
             <div className="bell-box" onClick={() => navigate('/notifications')}>
                <Bell size={26} color="#5a3c6d" />
                <span className="dot"></span>
             </div>
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="pref-content-scroll slide-up">
          
          <div className="pref-section">
            <h3 className="section-q">What's your 1st date preference?</h3>
            <div className="segmented-switch">
              <button 
                className={dateType === 'Restaurant' ? 'active' : ''} 
                onClick={() => handleDateTypeChange('Restaurant')}
              >
                Restaurant
              </button>
              <button 
                className={dateType === 'Cafe' ? 'active' : ''} 
                onClick={() => handleDateTypeChange('Cafe')}
              >
                Cafe
              </button>
            </div>
          </div>

          <div className="pref-section">
            <h3 className="section-q">Your food mood?</h3>
            <div className="mood-chips-container">
              {moodData[dateType].map((mood) => (
                <div 
                  key={mood} 
                  className={`mood-pill ${selectedMoods.includes(mood) ? 'selected' : ''}`}
                  onClick={() => toggleMood(mood)}
                >
                  {mood}
                </div>
              ))}
            </div>
          </div>

          <div className="pref-section">
            <div className="budget-flex">
              <h3 className="section-q">Budget/ person</h3>
              <span className="amount-label">{budget.min}-{budget.max}</span>
            </div>
            
            <div className="multi-range-slider">
              <input 
                type="range" min="100" max="3000" step="50"
                value={budget.min} onChange={handleMinBudget}
                className="thumb thumb-left"
              />
              <input 
                type="range" min="100" max="3000" step="50"
                value={budget.max} onChange={handleMaxBudget}
                className="thumb thumb-right"
              />
              <div className="slider-track-bg"></div>
              <div 
                className="slider-track-fill" 
                style={{ 
                  left: `${(budget.min / 3000) * 100}%`, 
                  right: `${100 - (budget.max / 3000) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          <div className="pref-section">
            <h3 className="section-q">Preferred way to pay?</h3>
            <div className="payment-toggle-group">
              <button className={payWay === 'Him' ? 'active' : ''} onClick={() => setPayWay('Him')}>Him</button>
              <button className={payWay === 'Split' ? 'active' : ''} onClick={() => setPayWay('Split')}>Split</button>
              <button className={payWay === 'Her' ? 'active' : ''} onClick={() => setPayWay('Her')}>Her</button>
            </div>
          </div>

          {/* Spacer to allow scrolling past the fixed button */}
          <div className="scroll-spacer-bottom"></div>
        </div>

        {/* FIXED FOOTER ACTION - Above BottomNav */}
        <div className="pref-footer-sticky">
          <button className="pref-continue-btn" onClick={() => navigate('/date-requested')}>
            Continue
          </button>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default DatePreferences;