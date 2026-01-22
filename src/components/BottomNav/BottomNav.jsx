import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BottomNav.css';

// Assets Icons Import
import homeIcon from '../../assets/home.png';
import datesIcon from '../../assets/dates.png';
import heartActionIcon from '../../assets/center-heart.png'; 
import requestsIcon from '../../assets/requests.png';
import profileIcon from '../../assets/profile.png';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="nav-wrapper">
      <nav className="bottom-nav-bar">
        
        {/* Home */}
        <div 
          className={`nav-item ${isActive('/home') ? 'active' : ''}`} 
          onClick={() => navigate('/home')}
        >
          <img src={homeIcon} alt="Home" className="nav-icon" />
          <span>Home</span>
        </div>

        {/* Dates */}
        <div 
          className={`nav-item ${isActive('/dates') ? 'active' : ''}`} 
          onClick={() => navigate('/dates')}
        >
          <img src={datesIcon} alt="Dates" className="nav-icon" />
          <span>Dates</span>
        </div>

        {/* Central Floating Action Button */}
        <div className="center-btn-container">
          <div 
            className="raised-gradient-btn" 
            onClick={() => navigate('/matches')}
          >
            <img src={heartActionIcon} alt="Action" className="center-heart-img" />
          </div>
        </div>

        {/* Requests */}
        <div 
          className={`nav-item ${isActive('/request') || isActive('/requests') ? 'active' : ''}`} 
          onClick={() => navigate('/request')}
        >
          <img src={requestsIcon} alt="Requests" className="nav-icon" />
          <span>Requests</span>
        </div>

        {/* Profile */}
        <div 
          className={`nav-item ${isActive('/profile') ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          <img src={profileIcon} alt="Profile" className="nav-icon" />
          <span>Profile</span>
        </div>

      </nav>
    </div>
  );
};

export default BottomNav;