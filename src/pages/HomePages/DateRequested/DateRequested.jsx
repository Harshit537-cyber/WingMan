import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, X } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './DateRequested.css';

const DateRequested = () => {
  const navigate = useNavigate();
  
  // Selection Logic States
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

    const newPair = { date: selectedDate, time: time };
    const updatedPairs = [...completedPairs, newPair];
    setCompletedPairs(updatedPairs);

    // Reset current date selection to allow next pair
    setSelectedDate(null);

    // After 3 pairs, trigger modal
    if (updatedPairs.length === 3) {
      setShowSuccessModal(true);
    }
  };

  return (
    <AppLayout>
      <div className="date-requested-container">
        
        {/* Is div ko blur karenge jab modal open hoga */}
        <div className={`main-content-wrapper ${showSuccessModal ? 'apply-blur' : ''}`}>
          
          {/* HEADER */}
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
            
            <div className="selection-status">
              Selected: <span>{completedPairs.length} / 3 slots</span>
            </div>

            {/* DATE SECTION */}
            <section className="ui-card-section">
              <h2 className="section-h2">Choose Dates</h2>
              <p className="section-p">Select a date as per your availability.</p>
              
              <div className="date-picker-card">
                {dates.map((item) => {
                  const isAlreadyDone = completedPairs.find(p => p.date === item.id);
                  return (
                    <div 
                      key={item.id} 
                      className={`date-node ${selectedDate === item.id ? 'active' : ''} ${isAlreadyDone ? 'done' : ''}`}
                      onClick={() => !isAlreadyDone && setSelectedDate(item.id)}
                    >
                      <span className="node-day">{item.day}</span>
                      <span className="node-date">{item.id}</span>
                      {selectedDate === item.id && <div className="purple-underline-bar"></div>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* TIME SECTION */}
            <section className="ui-card-section">
              <h2 className="section-h2">Choose Time</h2>
              <p className="section-p">Select 1 time slot for the selected date</p>
              
              <div className="time-grid-layout">
                {timeSlots.map((slot) => (
                  <div 
                    key={slot} 
                    className="time-slot-item"
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot.split(' ')[0]}<br/>{slot.split(' ')[1]}
                  </div>
                ))}
              </div>
            </section>

            <div className="bottom-spacer"></div>
          </div>

          {/* User's BottomNav Component - Unchanged */}
          <BottomNav />
        </div>

        {/* POPUP MODAL - Fixed and Centered */}
        {showSuccessModal && (
          <div className="fixed-modal-overlay">
            <div className="success-modal-box slide-up-animation">
              <div className="modal-icon-square">
                <X size={35} strokeWidth={1.5} color="#1a1a1a" />
              </div>
              <h2 className="modal-title-text">Your date request is sent</h2>
              <p className="modal-subtitle-text">We’ll notify you once the user confirms.</p>
              <button className="modal-action-btn" onClick={() => navigate('/matches')}>
                Okay
              </button>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};

export default DateRequested;