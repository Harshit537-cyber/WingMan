import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, AlignRight, Heart, 
  MapPin, Phone, Target 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import matchImg from '../../../assets/match-profile.jpg'; 
import './Matches.css';

const Matches = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const profiles = [
    { id: 1, name: "Nikita", age: 28, city: "California", compat: "90%" },
    { id: 2, name: "Nikita", age: 28, city: "California", compat: "90%" },
    { id: 3, name: "Nikita", age: 28, city: "California", compat: "90%" },
    { id: 4, name: "Nikita", age: 28, city: "California", compat: "90%" },
    { id: 5, name: "Nikita", age: 28, city: "California", compat: "90%" },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardFullWidth = 315; // card width (300) + gap (15)
      const index = Math.round(scrollLeft / cardFullWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <AppLayout>
      <div className="matches-main-container">
        
        {/* DOTS PAGINATION */}
        <div className="pagination-dots-wrap">
          {profiles.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot-item ${activeIndex === idx ? 'dot-active' : ''}`}
            ></span>
          ))}
        </div>

        {/* HEADER */}
        <header className="matches-header-nav">
          <button className="back-btn-match" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <div className="title-stack">
             <h1 className="main-match-title">Matches</h1>
             <p className="sub-match-title">Request a call and see where things go</p>
          </div>
          <div className="header-icons">
              <div
                className="bell-box"
                onClick={() => navigate('/request')}
                style={{ cursor: 'pointer' }}
              >
                <Bell size={26} color="#5a3c6d" />
                <span className="dot"></span>
              </div>
              <button className="menu-btn" onClick={() => navigate('/settings')}>
                <AlignRight size={28} color="#5a3c6d" />
              </button>
          </div>
        </header>

        <div className="matches-body-content slide-up">
          
          <div className="heading-group">
            <h2 className="title-day">Your profiles for the day</h2>
            <div className="note-row">
               <Target size={16} color="#1a1a1a" />
               <p>Favourites will stay while new matches roll in</p>
            </div>
          </div>

          {/* HORIZONTAL CAROUSEL */}
          <div 
            className="cards-carousel-container" 
            ref={scrollRef} 
            onScroll={handleScroll}
          >
            {profiles.map((profile, index) => {
              // Center card stays straight, side cards tilt away
              let rotateValue = 0;
              let scaleValue = 1;
              if (index < activeIndex) {
                 rotateValue = 6.75; 
                 scaleValue = 0.9;
              } else if (index > activeIndex) {
                 rotateValue = -6.75; 
                 scaleValue = 0.9;
              }

              return (
                <div 
                  key={profile.id} 
                  className="card-anchor"
                  onClick={() => navigate('/matches/profile-details')}
                  style={{
                    transform: `rotate(${rotateValue}deg) scale(${scaleValue})`,
                    zIndex: activeIndex === index ? 10 : 1
                  }}
                >
                  <div className="actual-match-card">
                      <img src={matchImg} alt={profile.name} className="match-img-bg" />
                      
                      <div className="card-top-ui">
                         <div className="match-badge">{profile.compat} Compatible</div>
                         <button className="heart-icon-btn" onClick={(e) => e.stopPropagation()}>
                            <Heart size={24} color="#fff" strokeWidth={2.5} />
                         </button>
                      </div>

                      <div className="card-bottom-ui">
                         <div className="info-wrap">
                            <h3 className="name-label">{profile.name}, {profile.age}</h3>
                            <div className="loc-wrap">
                               <MapPin size={16} fill="#fff" color="#fff" />
                               <span>{profile.city}</span>
                            </div>
                         </div>
                         
                         <button className="call-btn-fixed" onClick={(e) => e.stopPropagation()}>
                            <Phone size={22} fill="#5a3c6d" color="#5a3c6d" />
                         </button>
                      </div>
                  </div>
                </div>
              );
            })}
            <div className="carousel-end-spacer"></div>
          </div>

        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Matches;