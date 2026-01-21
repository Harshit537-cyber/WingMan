import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../../components/AppLayout/AppLayout';
import './ScheduleVideoCall.css';

const ScheduleVideoCall = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pichle screen se data fetch karna
  // Fallback values di hain agar koi direct is page par aaye
  const selectedDate = location.state?.date || 16;
  const selectedMonth = location.state?.month || "January";
  const selectedYear = location.state?.year || "2025";
  const selectedTime = location.state?.time || "11:00 AM";

  // End time calculation (30 min duration as per text)
  // Simple logic: AM/PM handle karte hue 30 mins add karna
  const calculateEndTime = (startTime) => {
    if (!startTime) return "11:30 AM";
    const [time, period] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    minutes += 30;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    
    const formattedMinutes = minutes === 0 ? "00" : minutes;
    return `${hours}:${formattedMinutes} ${period}`;
  };

  const endTime = calculateEndTime(selectedTime);

  return (
    <AppLayout>
      <div className="schedule-video-container">
        
        {/* Screen Title */}
        <h1 className="main-header fade-in">Schedule Video Call</h1>

        <div className="content-area">
          {/* Main Info Card */}
          <div className="confirmation-card slide-up">
            
            {/* Top Section: Icon and DateTime */}
            <div className="card-top">
              <div className="calendar-icon-wrapper">
                <div className="calendar-top-bar"></div>
                <div className="calendar-body">
                  <span className="current-date-num">{selectedDate}</span>
                </div>
              </div>

              <div className="date-time-details">
                <h2 className="full-date">{selectedMonth} {selectedDate}, &nbsp; {selectedYear}</h2>
                <p className="time-slot">{selectedTime} - {endTime}</p>
              </div>
            </div>

            <div className="card-divider"></div>

            {/* Bottom Section: Description and Button */}
            <div className="card-bottom">
              <p className="info-text">
                A half an hour call to verify your profile and help us know you better.
              </p>

              <button className="confirm-final-btn" onClick={() => navigate('/home')}>
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Background Decorative Dashed Line */}
        <div className="bg-decoration">
          <svg width="100%" height="150" viewBox="0 0 400 150" preserveAspectRatio="none">
             <path d="M0,130 Q100,100 200,130 T400,130" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

      </div>
    </AppLayout>
  );
};

export default ScheduleVideoCall;