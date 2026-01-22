import React, { useState, useRef, useEffect } from 'react';
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
      const cardWidth = scrollRef.current.offsetWidth * 0.75; // Card width reference
      const index = Math.round(scrollLeft / cardWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <AppLayout>
      <div className="matches-main-container">
        
        {/* DOTS PAGINATION - Exact Image Match */}
        <div className="custom-pagination">
          {profiles.map((_, idx) => (
            <span 
              key={idx} 
              className={`pg-dot ${activeIndex === idx ? 'pg-active' : ''}`}
            ></span>
          ))}
        </div>

        {/* HEADER */}
        <header className="matches-nav-header">
          <button className="nav-back" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <div className="nav-center-text">
             <h1 className="nav-title-main">Matches</h1>
             <p className="nav-subtitle-main">Request a call and see where things go</p>
          </div>
          <div className="nav-icons-right">
             <Bell size={26} color="#5a3c6d" />
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="matches-content-body slide-up">
          
          <div className="section-title-area">
            <h2 className="title-bold">Your profiles for the day</h2>
            <div className="instruction-row">
               <Target size={16} color="#1a1a1a" />
               <p>Favourites will stay while new matches roll in</p>
            </div>
          </div>

          {/* 3D TILTED SLIDER */}
          <div 
            className="perspective-slider-container" 
            ref={scrollRef} 
            onScroll={handleScroll}
          >
            {profiles.map((profile, index) => {
              // Calculate rotation based on index
              let rotationClass = "";
              if (index < activeIndex) rotationClass = "tilt-left";
              else if (index > activeIndex) rotationClass = "tilt-right";
              else rotationClass = "active-center";

              return (
                <div 
                  key={profile.id} 
                  className={`match-card-wrapper ${rotationClass}`}
                  onClick={() => navigate('*')}
                >
                  <div className="profile-card-inner">
                      <img src={matchImg} alt={profile.name} className="card-image" />
                      
                      <div className="badge-heart-row">
                         <div className="compat-badge">{profile.compat} Compatible</div>
                         <button className="heart-btn" onClick={(e) => e.stopPropagation()}>
                            <Heart size={24} color="#fff" strokeWidth={2.5} />
                         </button>
                      </div>

                      <div className="profile-info-overlay">
                         <div className="text-info">
                            <h3 className="name-age">{profile.name}, {profile.age}</h3>
                            <div className="loc-info">
                               <MapPin size={16} fill="#fff" color="#fff" />
                               <span>{profile.city}</span>
                            </div>
                         </div>
                         
                         <button className="call-btn-square" onClick={(e) => e.stopPropagation()}>
                            <Phone size={22} fill="#5a3c6d" color="#5a3c6d" />
                         </button>
                      </div>
                  </div>
                </div>
              );
            })}
            <div className="scroll-end-spacer"></div>
          </div>

        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Matches;