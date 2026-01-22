import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/AppLayout/AppLayout';
import scheduledImg from '../../../assets/scheduled-illustration.png';
import './ScheduleConfirmed.css';

const ScheduleConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data from previous screen state
  const date = location.state?.date || 16;
  const month = location.state?.month || "Jan";
  const time = location.state?.time || "11:00AM";

  return (
    <AppLayout>
      <div className="confirmed-page-container">
        
        <h1 className="confirmed-header fade-in">Schedule Video Call</h1>

        <div className="confirmed-illustration slide-up">
          <img src={scheduledImg} alt="Scheduled Call" className="main-illustration" />
        </div>

        {/* --- EXACT SAME CARD UI --- */}
        <div className="status-card-container slide-up-delay">
          <div className="status-card-content">
            
            {/* Left Side: Calendar & Reschedule */}
            <div className="status-left-section">
              <div className="mini-calendar-icon">
                <div className="mini-calendar-top-hooks">
                    <span></span>
                    <span></span>
                </div>
                <div className="mini-calendar-inner-box">
                  <span className="mini-date-text">{date}{month.substring(0,3)}</span>
                </div>
              </div>
              <button className="reschedule-action-text" onClick={() => navigate('/schedule')}>
                Reschedule
              </button>
            </div>

            {/* Right Side: Status & Time */}
            <div className="status-right-section">
              <h2 className="today-label">Today</h2>
              <p className="scheduled-time-text">{time}</p>
            </div>

          </div>
        </div>

        <p className="google-meet-info fade-in-slow">
          Google meet link : <span className="link-placeholder"></span>
        </p>

        <div className="bottom-action-area">
  <button 
    className="status-scheduled-btn" 
    onClick={() => navigate('/verified')} // Is line ko add karein
  >
    Scheduled
  </button>
</div>

        <div className="footer-wave-bg">
          <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path d="M0,80 Q100,40 200,80 T400,80" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

      </div>
    </AppLayout>
  );
};

export default ScheduleConfirmed;