import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight, Calendar, UtensilsCrossed, Banknote } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './PlanDetails.css';

const PlanDetails = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  const timeSlots = ['11:00 AM', '04:00 PM', '08:00 PM'];

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
          
          <p className="request-msg fade-in">Rahul has requested a date with you!</p>

          {/* Date & Time Card */}
          <section className="plan-card slide-up">
            <div className="card-heading">
              <Calendar size={20} color="#333" />
              <span>Date & Time</span>
            </div>
            <div className="date-banner">
              Sunday, 18 Jan
            </div>
            <div className="time-slots-row">
              {timeSlots.map((time) => (
                <button 
                  key={time}
                  className={`time-chip ${selectedTime === time ? 'active' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <p className="helper-text">*Pick one time that works for you</p>
          </section>

          {/* Food Mood Card */}
          <section className="plan-card slide-up delay-1">
            <div className="card-heading food-heading">
              <UtensilsCrossed size={20} color="#5a3c6d" />
              <span>Food Mood</span>
            </div>
            <div className="info-row">
              <span className="label">Preference:</span>
              <span className="value bold">Restaurant</span>
            </div>
            <div className="chips-container">
              <span className="item-chip">North-Indian</span>
              <span className="item-chip">Italian</span>
              <span className="item-chip">Non-Veg</span>
              <span className="item-chip">Sea food</span>
            </div>
          </section>

          {/* Budget Card */}
          <section className="plan-card slide-up delay-2">
            <div className="card-heading">
              <Banknote size={20} color="#5a3c6d" />
              <span>Budget & Expenses</span>
            </div>
            <div className="info-row flex-between">
              <span className="label">Estimated Budget:</span>
              <span className="value bold">₹500 - 1600 / person</span>
            </div>
            <div className="info-row flex-between mt-15">
              <span className="label">Preferred to pay:</span>
              <span className="pay-chip">Him Will Pay</span>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="action-buttons-row slide-up delay-3">
            <button className="btn-decline" onClick={() => navigate(-1)}>Decline</button>
            <button className="btn-accept" onClick={() => navigate('/*')}>Accept Date</button>
          </div>

          <div className="bottom-padding"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default PlanDetails;