import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, AlignRight, Pencil, UserPlus, 
  Settings2, Settings, LifeBuoy, Trash2, Share2, X 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import profileImg from '../../../assets/profile-user.png'; 
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); 

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (75 / 100) * circumference;

  // Updated Menu Items with specific routes
  const menuItems = [
    { id: 1, label: 'Edit Profile', icon: <Pencil size={22} />, action: () => navigate('/edit-profile') },
    { id: 2, label: 'Invite Friends', icon: <UserPlus size={22} />, action: () => setActiveModal('invite') },
    { id: 3, label: 'Preferences', icon: <Settings2 size={22} />, action: () => navigate('/preferences') },
    { id: 4, label: 'Settings', icon: <Settings size={22} />, action: () => navigate('/settings') },
    { id: 5, label: 'Support / Feedback', icon: <LifeBuoy size={22} />, action: () => navigate('/feedback') },
    { id: 6, label: 'Delete Account', icon: <Trash2 size={22} />, action: () => setActiveModal('delete') },
  ];

  const closeModal = () => setActiveModal(null);

  // Function to handle "Share" button inside Invite Modal
  const handleInviteRoute = () => {
    closeModal();
    navigate('/invite');
  };

  return (
    <AppLayout>
      <div className="profile-main-container">
        
        {/* HEADER */}
        <header className="top-nav-bar">
          <button className="back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="nav-title">{activeModal === 'invite' ? 'Invite Friends' : 'Profile'}</h1>
          <div className="nav-right">
             <div className="bell-box" onClick={() => navigate('/request')}>
                <Bell size={26} color="#5a3c6d" />
                <span className="dot"></span>
             </div>
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className={`scroll-content ${activeModal ? 'blur-bg' : ''}`}>
          
          {/* PROFILE RING SECTION */}
          <div className="profile-header-section slide-up">
            <div className="ring-box">
              <span className="perc-label">75%</span>
              <svg className="svg-ring" width="120" height="120">
                <circle 
                   className="ring-path" 
                   cx="60" cy="60" r={radius} 
                   strokeDasharray={circumference}
                   style={{ strokeDashoffset: strokeDashoffset }}
                />
              </svg>
              <div className="user-avatar">
                <img src={profileImg} alt="user" />
              </div>
            </div>
            <div className="user-meta">
               <h2>GFXAgency</h2>
               <p>UI UX DESIGN</p>
            </div>
          </div>

          {/* MENU CARDS */}
          <div className="menu-cards-list">
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="custom-menu-card staggered-up"
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={item.action}
              >
                <div className="card-icon">{item.icon}</div>
                <span className="card-text">{item.label}</span>
              </div>
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <div className="logout-container slide-up-delay">
            <button className="logout-outline-btn" onClick={() => setActiveModal('logout')}>
              Logout
            </button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />

        {/* POPUP MODALS */}
        {activeModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content slide-up-modal" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button (X) */}
              <button className="modal-close-btn" onClick={closeModal}>
                <X size={24} color="#5a3c6d" />
              </button>

              {activeModal === 'logout' && (
                <div className="modal-inner">
                  <h2 className="modal-title">Log Out</h2>
                  <button className="modal-primary-btn" onClick={() => navigate('/')}>Continue</button>
                </div>
              )}

              {activeModal === 'invite' && (
                <div className="modal-inner">
                  <div className="modal-icon-container">
                     <Share2 size={60} color="#5a3c6d" strokeWidth={1.5} />
                  </div>
                  <h2 className="modal-title">Share with Friend</h2>
                  {/* Navigating to Invite Screen on click */}
                  <button className="modal-primary-btn" onClick={handleInviteRoute}>Share</button>
                </div>
              )}

              {activeModal === 'delete' && (
                <div className="modal-inner">
                  <div className="modal-icon-container">
                     <X size={60} color="#ff4d4d" strokeWidth={3} />
                  </div>
                  <h2 className="modal-title">Delete Account</h2>
                  <p className="modal-subtitle">Do you want to permanently delete your Account ?</p>
                  <button className="modal-primary-btn" onClick={closeModal}>Continue</button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;