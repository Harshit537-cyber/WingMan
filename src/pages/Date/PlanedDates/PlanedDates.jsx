import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './PlanedDates.css';

const PlanedDates = () => {
  const navigate = useNavigate();

  // Dummy data (Same as image)
  const plannedList = [
    { id: 1, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 4, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <AppLayout>
      <div className="planed-dates-container">
        
        {/* Header Section */}
        <header className="planed-header">
          <button className="back-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#5a3c6d" />
          </button>
          <h1 className="planed-title">Planed Dates</h1>
          <button className="filter-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        {/* Scrollable List Area */}
        <div className="planed-scroll-view">
          <div className="dates-list-wrapper">
            {plannedList.map((item, index) => (
              <div 
                key={item.id} 
                className="plan-item-card staggered-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Left Side: Avatar with Purple Border */}
                <div className="avatar-outer">
                  <div className="avatar-inner-ring">
                    <img src={item.img} alt={item.name} />
                  </div>
                </div>

                {/* Middle: Text Info */}
                <div className="info-section">
                  <h3 className="name-text">{item.name}</h3>
                  <p className="dist-text">{item.distance}</p>
                </div>

                {/* Right Side: Action Button */}
                <button className="view-btn" onClick={() => navigate('/date-planned')}>
                  View Plan
                </button>
              </div>
            ))}
          </div>
          
          {/* Padding so bottom navigation doesn't overlap cards */}
          <div className="nav-bottom-spacer"></div>
        </div>

        {/* Bottom Navigation Component */}
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default PlanedDates;