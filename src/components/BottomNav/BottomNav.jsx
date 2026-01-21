import React, { useState } from 'react';
import { Home, Calendar, MessageCircleHeart, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <nav className="bottom-nav">
      <div className="nav-content">
        
        {/* Home */}
        <div 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => setActiveTab('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </div>

        {/* Dates */}
        <div 
          className={`nav-item ${activeTab === 'dates' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dates')}
        >
          <Calendar size={24} />
          <span>Dates</span>
        </div>

        {/* Central Floating Button */}
        <div className="nav-center-container">
          <div className="center-raised-btn" onClick={() => setActiveTab('match')}>
             <div className="heart-icons">
                <div className="heart-large"></div>
                <div className="heart-small"></div>
             </div>
          </div>
        </div>

        {/* Requests */}
        <div 
          className={`nav-item ${activeTab === 'requests' ? 'active' : ''}`} 
          onClick={() => setActiveTab('requests')}
        >
          <div className="icon-badge-wrapper">
            <MessageCircleHeart size={24} />
            <span className="badge-dot"></span>
          </div>
          <span>Requests</span>
        </div>

        {/* Profile */}
        <div 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} 
          onClick={() => setActiveTab('profile')}
        >
          <User size={24} />
          <span>Profile</span>
        </div>

      </div>
    </nav>
  );
};

export default BottomNav;