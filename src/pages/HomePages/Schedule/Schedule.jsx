import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './Schedule.css';

const Schedule = () => {
  const navigate = useNavigate();
  
  // States for selection
  const [selectedDate, setSelectedDate] = useState(18); // Default 18
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  // Dummy Data for Dates
  const dates = [
    { day: 'Fri', date: 16, disabled: false },
    { day: 'Sat', date: 17, disabled: false },
    { day: 'Sun', date: 18, disabled: false },
    { day: 'Mon', date: 19, disabled: true }, // Disabled date
    { day: 'Tue', date: 20, disabled: false },
    { day: 'Wed', date: 21, disabled: false },
    { day: 'Sat', date: 22, disabled: false },
  ];

  // Dummy Data for Times
  const timeSlots = [
    { time: '10:00 AM', disabled: false },
    { time: '11:00 AM', disabled: false },
    { time: '12:00 PM', disabled: false },
    { time: '01:00 PM', disabled: false },
    { time: '02:00 PM', disabled: false },
    { time: '03:00 PM', disabled: false },
    { time: '04:00 PM', disabled: true }, // Disabled time
    { time: '05:00 PM', disabled: false },
    { time: '06:00 PM', disabled: false },
    { time: '07:00 PM', disabled: false },
    { time: '08:00 PM', disabled: false },
    { time: '09:00 PM', disabled: false },
  ];

  return (
    <AppLayout>
      <div className="schedule-container">
        
        {/* Header Section */}
        <header className="schedule-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} />
          </button>
          <h1 className="header-title">Availability Of The <br /> Wingmann Executive</h1>
        </header>

        <div className="schedule-content">
          
          {/* Date Picker Section */}
          <section className="date-section slide-up">
            <h2 className="label-text">Select Date</h2>
            <div className="date-scroll-wrapper">
              {dates.map((item) => (
                <div 
                  key={item.date} 
                  className={`date-card ${selectedDate === item.date ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                  onClick={() => !item.disabled && setSelectedDate(item.date)}
                >
                  <span className="day">{item.day}</span>
                  <span className="date-num">{item.date}</span>
                  {selectedDate === item.date && <div className="active-line"></div>}
                </div>
              ))}
            </div>
          </section>

          {/* Time Picker Section */}
          <section className="time-section slide-up delay-1">
            <h2 className="label-text">Choose Time</h2>
            <p className="sub-label">Select at least 3 different time slots</p>
            
            <div className="time-grid">
              {timeSlots.map((item) => (
                <button 
                  key={item.time}
                  className={`time-slot ${selectedTime === item.time ? 'selected' : ''} ${item.disabled ? 'is-disabled' : ''}`}
                  onClick={() => !item.disabled && setSelectedTime(item.time)}
                  disabled={item.disabled}
                >
                  {item.time.split(' ')[0]} <br />
                  <small>{item.time.split(' ')[1]}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Action Button */}
        <div className="confirm-btn-wrapper fade-in-up">
  <button 
    className="confirm-schedule-btn" 
    onClick={() => {
      // Data pass karte hue navigate karein
      navigate('/schedule-video-call', { 
        state: { 
          date: selectedDate, 
          month: 'January', // Aap isse dynamic bhi bana sakte hain
          year: '2025', 
          time: selectedTime 
        } 
      });
    }}
  >
    Confirm Schedule
  </button>
</div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Schedule;