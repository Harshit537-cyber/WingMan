import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, Hand, AlarmClock, Star, AlertTriangle } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './CancelDate.css';

const CancelDate = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="cancel-page-container">
        
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

        <div className="cancel-content-scroll">
          
          {/* Top Stop Icon */}
          <div className="stop-icon-wrapper pop-in">
             <div className="stop-circle">
                <Hand size={45} fill="#5a3c6d" color="#5a3c6d" />
             </div>
          </div>

          <div className="warning-text-section fade-in">
            <h2 className="wait-title">Wait, are you sure?</h2>
            <p className="wait-subtitle">
                We hope everything is okay! Please check <br /> the rules before you cancel.
            </p>
          </div>

          {/* Important Rules Card */}
          <div className="rules-card slide-up">
            <h3 className="rules-heading">Important Rules</h3>
            
            <div className="rule-item">
              <div className="rule-icon-box bg-light-red">
                <AlarmClock size={22} color="#cc3333" />
              </div>
              <p className="rule-text">
                Cancel <span className="bold-purple">before 2 hours</span> of your scheduled time.
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-icon-box bg-light-purple">
                <Star size={22} color="#5a3c6d" fill="#5a3c6d" />
              </div>
              <p className="rule-text">
                To reschedule, you must <span className="bold-purple">favorite The Profile</span>
              </p>
            </div>

            <div className="rule-item">
              <div className="rule-icon-box bg-light-yellow">
                <AlertTriangle size={22} color="#cc9900" />
              </div>
              <p className="rule-text">
                Multiple cancellations might lead to <span className="bold-red">account suspension.</span>
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="cancel-actions-wrapper slide-up-delay">
            <button className="main-cancel-btn" onClick={() => navigate('/home')}>
              Cancel Date
            </button>
            <button className="go-on-date-btn" onClick={() => navigate(-1)}>
              No, I'll go on the date
            </button>
          </div>

          <div className="bottom-spacing"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default CancelDate;