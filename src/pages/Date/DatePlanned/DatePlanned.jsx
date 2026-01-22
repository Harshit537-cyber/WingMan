import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, CircleDot, Store } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './DatePlanned.css';

const DatePlanned = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="date-planned-container">
        
        {/* --- HEADER --- */}
        <header className="page-header">
          <button className="icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Date Planned</h1>
          <div className="header-actions">
             <Bell size={26} color="#5a3c6d" />
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="content-scroll-view">
          
          <h2 className="main-status-text fade-in">
            Your date with Ruhi is all set!
          </h2>

          {/* Info Grid (2x2) */}
          <div className="info-grid slide-up">
            {/* Card 1: Date */}
            <div className="info-card dark-purple">
               <span className="card-label">Date</span>
               <span className="card-value">10/10/25</span>
            </div>

            {/* Card 2: Time */}
            <div className="info-card light-purple">
               <span className="card-label">Time</span>
               <span className="card-value">6:00 PM</span>
            </div>

            {/* Card 3: Location */}
            <div className="info-card light-purple">
               <span className="card-label">Location</span>
               <span className="card-value purple-text">Cafe Mocha</span>
            </div>

            {/* Card 4: Match Score */}
            <div className="info-card dark-purple">
               <span className="card-label">Match Score</span>
               <span className="card-value">93%</span>
            </div>
          </div>

          {/* Feature Highlight Box */}
          <div className="description-box slide-up delay-1">
             <div className="box-icon-container">
                <Store size={48} color="#000" strokeWidth={1.5} />
             </div>
             <p className="box-text">
                Based on your vibe, we’ve found a cozy café nearby with great food and warm lighting — perfect for your first date this week .
             </p>
          </div>

          {/* Action Links */}
          <div className="action-links-list slide-up delay-2">
             <div className="link-item" onClick={() => navigate('/dos-donts')}>
                <CircleDot size={20} color="#333" />
                <span>What to do, what to avoid</span>
             </div>
             <div className="link-item" onClick={() => navigate('/cancel-date')}>
                <CircleDot size={20} color="#333" />
                <span>Cancel the date</span>
             </div>
          </div>

          <div className="bottom-spacing"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default DatePlanned;