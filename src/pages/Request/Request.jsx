import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, X } from 'lucide-react';
import AppLayout from '../../components/AppLayout/AppLayout';
import BottomNav from '../../components/BottomNav/BottomNav';
import './Request.css';

const Request = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Call'); // 'Call' ya 'Date'

  // Image mein 6 cards hain
  const requestsData = [1, 2, 3, 4, 5, 6]; 

  return (
    <AppLayout>
      <div className="requests-page-main">
        
        {/* TOP NAVIGATION */}
        <header className="request-header">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <div className="right-nav-icons">
            <button className="nav-icon-btn"><Bell size={24} color="#5a3c6d" /></button>
            <button className="nav-icon-btn"><AlignRight size={24} color="#5a3c6d" /></button>
          </div>
        </header>

        {/* SEGMENTED TAB CONTROL */}
        <div className="tab-container-wrap">
          <div className="segmented-control-bar">
            <button 
              className={`control-tab-btn ${activeTab === 'Call' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('Call')}
            >
              Call Request
            </button>
            <button 
              className={`control-tab-btn ${activeTab === 'Date' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('Date')}
            >
              Date Request
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="requests-scroll-area slide-up">
          {requestsData.map((_, index) => (
            <div key={index} className="ui-request-card-item">
              <div className="card-left-part">
                <div className="avatar-circle">
                  <img 
                    src={`https://randomuser.me/api/portraits/women/${44 + index}.jpg`} 
                    alt="User" 
                  />
                </div>
                <div className="user-details-box">
                  <h4 className="user-name-text">Nikita</h4>
                  <p className="request-sub-text">
                    {activeTab === 'Call' ? 'Requested for call' : 'Asked you out'}
                  </p>
                </div>
              </div>

              <div className="card-right-part">
                <button className="confirm-purple-btn">Confirm</button>
                <button className="cancel-x-btn">
                  <X size={24} strokeWidth={3} color="#5a3c6d" />
                </button>
              </div>
            </div>
          ))}
          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Request;