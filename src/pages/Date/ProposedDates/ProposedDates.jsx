import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight, Heart } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './ProposedDates.css';

const ProposedDates = () => {
  const navigate = useNavigate();

  // Dummy data based on image
  const proposedList = [
    { id: 1, name: 'Emelie', distance: '10km away', img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <AppLayout>
      <div className="proposed-dates-container">
        
        {/* --- HEADER --- */}
        <header className="proposed-header">
          <button className="back-btn-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#5a3c6d" />
          </button>
          <h1 className="proposed-title">Proposed Dates</h1>
          <button className="menu-filter-btn">
            <AlignRight size={28} color="#5a3c6d" />
          </button>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="proposed-scroll-area">
          <div className="list-wrapper">
            {proposedList.map((item, index) => (
              <div 
                key={item.id} 
                className="proposed-card staggered-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Left Side: Avatar with Heart Badge */}
                <div className="avatar-wrapper">
                  <div className="avatar-ring-purple">
                    <img src={item.img} alt={item.name} />
                  </div>
                  {/* Small Heart Badge on Profile Pic */}
                  <div className="avatar-heart-badge">
                     <Heart size={10} fill="#FF748D" color="#FF748D" />
                  </div>
                </div>

                {/* Middle: Details */}
                <div className="user-info">
                  <h3 className="name-val">{item.name}</h3>
                  <p className="dist-val">{item.distance}</p>
                </div>

                {/* Right Side: View Button */}
                <button className="view-plan-btn" onClick={() => navigate('/*')}>
                  View Plan
                </button>
              </div>
            ))}
          </div>
          
          <div className="nav-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default ProposedDates;