import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlignRight, ShieldAlert, Home as HomeIcon, Calendar, MessageCircleHeart, User } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Button click placeholder
  const handleAction = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate('*'); // As per your requirement
  };

  return (
    <AppLayout>
      <div className="home-screen-container">
        
        {/* --- HEADER SECTION --- */}
        <header className="home-header fade-in">
          <div className="welcome-text">
            <h1>Good Evening, Rajesh</h1>
            <p>Let's find you a date!</p>
          </div>
          <div className="header-icons">
            <div className="icon-badge-container" onClick={() => handleAction('*')}>
              <Bell size={26} color="#5a3c6d" />
              <span className="notification-dot"></span>
            </div>
            <button className="menu-btn" onClick={() => handleAction('*')}>
              <AlignRight size={28} color="#5a3c6d" />
            </button>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="home-scroll-content">
          
          {/* Dashboard Section */}
          <section className="section-wrapper slide-up">
            <h2 className="section-title">Your Dashboard</h2>
            <div className="dashboard-grid">
              <div className="dash-card">
                <span>Profile</span>
                <h3>100%</h3>
                <div className="progress-container">
                  <div className="progress-bar filled" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="dash-card">
                <span>Compatibility Quiz</span>
                <h3>10%</h3>
                <div className="progress-container">
                  <div className="progress-bar partial" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Section */}
          <section className="section-wrapper slide-up delay-1">
            <h2 className="section-title">Verification</h2>
            <div className="verification-card">
              <div className="verification-header">
                <ShieldAlert color="#c9a66b" size={32} />
                <div className="v-text">
                   <h4>Verification Pending</h4>
                   <p>Pending Wingmate Verification</p>
                </div>
              </div>
              <div className="verification-body">
                <p className="restricted-title">Restricted access:</p>
                <ul>
                  <li>Cannot take matches</li>
                  <li>Cannot take facial attractiveness</li>
                  <li>Cannot show matches</li>
                </ul>
                <button className="action-purple-btn" onClick={() => handleAction('verify-profile')}>
                  Take Action
                </button>
              </div>
            </div>
          </section>

          {/* Know Your Type Section */}
          <section className="section-wrapper slide-up delay-2">
            <h2 className="section-title">Know Your Type</h2>
            <button className="outline-purple-btn" onClick={() => handleAction('*')}>
              Take A Quiz
            </button>
          </section>

          {/* Attracted To Section */}
          <section className="section-wrapper slide-up delay-3">
            <h2 className="section-title">Let Us Know Who You Are Attracted To.</h2>
            <button className="outline-purple-btn curate-btn" onClick={() => handleAction('*')}>
              Curate Your Vibe
            </button>
          </section>

          {/* Extra bottom padding so nav doesn't hide content */}
          <div className="bottom-spacer"></div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Home;