import React, { useState } from 'react';
import './Request.css';
// Path check kar lena apne project ke hisaab se
import BottomNav from '../../components/BottomNav/BottomNav'; 
import { Bell, Menu, ChevronLeft, X } from 'lucide-react';

const Request = () => {
  const [activeTab, setActiveTab] = useState('Call'); // 'Call' ya 'Date'

  // Image mein 6 cards dikh rahe hain
  const requestsData = [1, 2, 3, 4, 5, 6]; 

  return (
    <div className="requests-page-container">
      {/* 1. Status Bar */}
      <div className="ios-status-bar">
    
      </div>

      {/* 2. Top Navigation */}
      <header className="top-nav-header">
        <button className="nav-icon-trigger"><ChevronLeft size={28} color="#5a3c6d" /></button>
        <div className="right-nav-group">
          <button className="nav-icon-trigger"><Bell size={24} color="#5a3c6d" /></button>
          <button className="nav-icon-trigger"><Menu size={24} color="#5a3c6d" /></button>
        </div>
      </header>

      {/* 3. Segmented Tab Control */}
      <div className="tab-control-section">
        <div className="segmented-control">
          <button 
            className={`control-btn ${activeTab === 'Call' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('Call')}
          >
            Call Request
          </button>
          <button 
            className={`control-btn ${activeTab === 'Date' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('Date')}
          >
            Date Request
          </button>
        </div>
      </div>

      {/* 4. Scrollable Content Area */}
      <div className="requests-scroll-list">
        {requestsData.map((_, index) => (
          <div key={index} className="ui-request-card">
            <div className="card-left-content">
              <div className="avatar-wrapper">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="User" 
                  className="profile-img" 
                />
              </div>
              <div className="user-meta">
                <h4 className="user-name">Nikita</h4>
                <p className="request-type-text">
                  {activeTab === 'Call' ? 'Requested for call' : 'Asked you out'}
                </p>
              </div>
            </div>

            <div className="card-right-actions">
              <button className="confirm-action-btn">Confirm</button>
              <button className="cancel-icon-btn">
                <X size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Fixed Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Request;