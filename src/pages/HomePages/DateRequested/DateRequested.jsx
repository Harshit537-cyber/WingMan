import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, X } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './DateRequested.css';

const DateRequested = () => {
  const navigate = useNavigate();
  
  // Selection States
  const [selectedDate, setSelectedDate] = useState(null); 
  const [completedPairs, setCompletedPairs] = useState([]); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dates = [
    { day: 'Fri', id: '16' }, { day: 'Sat', id: '17' }, { day: 'Sun', id: '18' },
    { day: 'Mon', id: '19' }, { day: 'Tue', id: '20' }, { day: 'Wed', id: '21' }, { day: 'Sat', id: '22' },
  ];

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
  ];

  const handleTimeSelect = (time) => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }

    // Check if date already has a time assigned
    if (completedPairs.find(p => p.date === selectedDate)) {
        alert("This date is already assigned. Please pick another date.");
        return;
    }

    const newPair = { date: selectedDate, time: time };
    const updatedPairs = [...completedPairs, newPair];
    setCompletedPairs(updatedPairs);

    // Reset selection for next round
    setSelectedDate(null);

    // If 3 pairs are done, show modal
    if (updatedPairs.length === 3) {
      setShowSuccessModal(true);
    }
  };

  return (
    <AppLayout>
      <div className="date-requested-screen">
        
        {/* Main Content Area */}
        <div className={`date-req-inner ${showSuccessModal ? 'is-blurred' : ''}`}>
          
          <header className="top-nav-bar">
            <button className="back-circle" onClick={() => navigate(-1)}>
              <ChevronLeft size={28} color="#5a3c6d" />
            </button>
            <h1 className="nav-title">Date Requested</h1>
            <div className="nav-right">
               <Bell size={26} color="#5a3c6d" onClick={() => navigate('/notifications')} />
               <AlignRight size={26} color="#5a3c6d" />
            </div>
          </header>

          <div className="req-scroll-body">
            
            <div className="selection-counter">
              Selected: <span>{completedPairs.length} / 3</span>
            </div>

            {/* DATE SECTION */}
            <section className="req-section">
              <h2 className="section-h2">Choose Dates</h2>
              <p className="section-p">Select a date as per your availability.</p>
              <div className="date-picker-row">
                {dates.map((item) => {
                  const isDone = completedPairs.find(p => p.date === item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`date-node ${selectedDate === item.id ? 'active' : ''} ${isDone ? 'disabled' : ''}`}
                      onClick={() => !isDone && setSelectedDate(item.id)}
                    >
                      <span className="node-day-text">{item.day}</span>
                      <span className="node-date-num">{item.id}</span>
                      {selectedDate === item.id && <div className="active-bar-indicator"></div>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TIME SECTION */}
            <section className="req-section">
              <h2 className="section-h2">Choose Time</h2>
              <p className="section-p">Select 1 time slot for selected date</p>
              <div className="time-grid-4col">
                {timeSlots.map((slot) => (
                  <div 
                    key={slot} 
                    className="time-slot-card"
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.split(' ')[0]}<br/>{slot.split(' ')[1]}
                  </div>
                ))}
              </div>
            </section>

            <div className="bottom-spacer-box"></div>
          </div>

          <BottomNav />
        </div>

        {/* POPUP MODAL - Position Fixed for center opening */}
        {showSuccessModal && (
          <div className="modal-fixed-overlay">
            <div className="success-popup-card slide-up-modal">
              <div className="popup-icon-square">
                <X size={35} strokeWidth={1.5} color="#1a1a1a" />
              </div>
              <h2 className="popup-title">Your date request is sent</h2>
              <p className="popup-subtitle">We’ll notify you once the user confirms.</p>
              <button className="popup-okay-btn" onClick={() => navigate('/home')}>Okay</button>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default DateRequested;