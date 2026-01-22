import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, AlignRight, CircleDot } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './DosAndDonts.css';

const DosAndDonts = () => {
  const navigate = useNavigate();
  const [activeTab, setSelectedTab] = useState('dos');

  const dosData = [
    { title: "Be Yourself, Not Your Profile", desc: "Be genuine. people connect more with real energy than perfect stories." },
    { title: "Be On Time", desc: "Punctuality shows respect and sets the tone for a smooth start." },
    { title: "Listen More Than You Talk", desc: "Curiosity is attractive. Ask, listen, and show genuine interest." },
    { title: "Keep It Positive", desc: "Avoid rants or complaints — light, happy energy makes the best first impression." },
    { title: "Respect Boundaries", desc: "Go with the flow — emotional comfort matters more than chemistry at first glance." },
    { title: "End on a Good Note", desc: "Whether or not there's a spark, thank them for their time. Courtesy always leaves a lasting impression." }
  ];

  return (
    <AppLayout>
      <div className="dos-donts-container">
        
        {/* HEADER */}
        <header className="page-header">
          <button className="back-circle-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Date Planned</h1>
          <div className="header-right">
             <Bell size={26} color="#5a3c6d" />
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="content-scrollable">
          <h2 className="status-msg fade-in">Your date with Ruhi is all set!</h2>

          {/* INFO GRID - MATCHED TO DATEPLANNED PAGE */}
          <div className="info-grid slide-up">
            <div className="info-card light-purple">
               <span className="card-label">Date</span>
               <span className="card-value purple-text">10/10/25</span>
            </div>
            <div className="info-card dark-purple">
               <span className="card-label">Time</span>
               <span className="card-value">6:00 PM</span>
            </div>
            <div className="info-card dark-purple">
               <span className="card-label">Location</span>
               <span className="card-value">Cafe Mocha</span>
            </div>
            <div className="info-card light-purple">
               <span className="card-label">Match Score</span>
               <span className="card-value purple-text">93%</span>
            </div>
          </div>

          {/* TABS SECTION */}
          <div className="tab-section slide-up-delay">
            <p className="tab-desc">Do’s and don’ts of the 1st date.</p>
            <div className="tab-pill-box">
              <button 
                className={`tab-pill ${activeTab === 'dos' ? 'active' : ''}`}
                onClick={() => setSelectedTab('dos')}
              >Do's</button>
              <button 
                className={`tab-pill ${activeTab === 'donts' ? 'active' : ''}`}
                onClick={() => setSelectedTab('donts')}
              >Don'ts</button>
            </div>
          </div>

          {/* INCREASED WIDTH SCROLL CARDS */}
          <div className="horizontal-scroll-container slide-up-delay-2">
             <div className="scroll-track">
                {dosData.map((item, index) => (
                  <div key={index} className={`wide-scroll-card ${index % 2 !== 0 ? 'bg-dark' : 'bg-light'}`}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          <div className="nav-padding-bottom"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default DosAndDonts;