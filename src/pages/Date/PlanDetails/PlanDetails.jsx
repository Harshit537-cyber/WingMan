import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight, Calendar, Utensils, Banknote, CheckCircle2 } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './PlanDetails.css';

const PlanDetails = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('12 JAN (Mon)');
  const [selectedTime, setSelectedTime] = useState('1:00 PM');

  return (
    <AppLayout>
      <div className="plan-page-container">

        {/* --- HEADER --- */}
        <header className="plan-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Plan</h1>
          <button className="menu-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        {/* --- CONTENT --- */}
        <div className="plan-scroll-content">

          <div className="main-msg-section">
            <h2 className="request-title">Rahul Has Requested A Date With You!</h2>
            <p className="request-subtitle">Select One Option That Works Best For You.</p>
          </div>

          {/* Date & Time Card */}
          <section className="plan-card">
            <div className="card-header-main">
              <div className="icon-bg-purple">
                <Calendar size={18} color="#fff" />
              </div>
              <div className="header-text-group">
                <h3 className="card-title-text">Choose Preferred Date & Time</h3>
                <p className="card-subtitle-text">Select One Options That Work Best For You</p>
              </div>
            </div>

            <div className="selection-area">
              <div className="dates-row">
                {['12 JAN (Mon)', '13 JAN (Tue)', '14 JAN (Wed)'].map((date) => (
                  <button
                    key={date}
                    className={`date-chip-box ${selectedDate === date ? 'active' : ''}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <Calendar size={14} />
                    <span>{date}</span>
                  </button>
                ))}
              </div>

              <h4 className="slot-heading">Available Time Slot</h4>
              <div className="times-row">
                {['11:00 AM', '1:00 PM', '07:00 PM'].map((time) => (
                  <button
                    key={time}
                    className={`time-chip-pill ${selectedTime === time ? 'active' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <CheckCircle2 size={14} />
                    <span>{time}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="food-mood-card-exact">
            <div className="fm-header">
              <Utensils size={24} color="#7a4ca3" strokeWidth={2.2} />
              <h1 className="fm-title">Food Mood</h1>
            </div>

            <p className="fm-preference">
              Preference - <span className="fm-purple-val">Restaurant</span>
            </p>

            <div className="fm-chips-wrapper">
              <div className="fm-chip-box">North - Indian</div>
              <div className="fm-chip-box">🥣 Italian</div>
              <div className="fm-chip-box">North - Indian</div>
              <div className="fm-chip-box">Sea- Food</div>
            </div>
          </section>

          {/* Budget Card */}
          <section className="plan-card">
            <div className="card-header-simple">
              <div className="budget-icon-container">
                <Banknote size={20} color="#5a3c6d" fill="#5a3c6d" />
              </div>
              <h3 className="card-title-text">Budget & Expenses</h3>
            </div>
            <div className="budget-info-rows">
              <div className="b-row">
                <span className="b-label">Estimated Budget</span>
                <span className="b-value">₹500 - 1600 / Person</span>
              </div>
              <div className="b-row">
                <span className="b-label">Preferred To Pay :</span>
                <span className="pay-status-chip">He Will Pay</span>
              </div>
            </div>
          </section>

          <div className="bottom-padding"></div>

          <div className="confirm-scroll-container">
            <button className="confirm-plan-btn" onClick={() => navigate('/dates')}>
              Confirm Plan
            </button>
          </div>

          <div className="bottom-padding"></div>      
        </div>
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default PlanDetails;