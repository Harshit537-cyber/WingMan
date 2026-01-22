import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, AlignRight, Pencil, UserPlus, 
  Settings2, Settings, LifeBuoy, Trash2 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import profileImg from '../../../assets/profile-user.png'; 
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  // Progress Ring Calculation (75% circle)
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (75 / 100) * circumference;

  const menuItems = [
    { id: 1, label: 'Edit Profile', icon: <Pencil size={22} />, path: '/edit-profile' },
    { id: 2, label: 'Invite Friends', icon: <UserPlus size={22} />, path: '/invite' },
    { id: 3, label: 'Preferences', icon: <Settings2 size={22} />, path: '/preferences' },
    { id: 4, label: 'Settings', icon: <Settings size={22} />, path: '/settings' },
    { id: 5, label: 'Support / Feedback', icon: <LifeBuoy size={22} />, path: '/support' },
    { id: 6, label: 'Delete Account', icon: <Trash2 size={22} />, path: '/delete' },
  ];

  return (
    <AppLayout>
      <div className="profile-main-container">
        
        {/* HEADER */}
        <header className="top-nav-bar">
          <button className="back-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="nav-title">Profile</h1>
          <div className="nav-right">
             <div className="bell-box">
                <Bell size={26} color="#5a3c6d" />
                <span className="dot"></span>
             </div>
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="scroll-content">
          
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

          {/* MENU CARDS - EXACT UI MATCH */}
          <div className="menu-cards-list">
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="custom-menu-card staggered-up"
                style={{ animationDelay: `${index * 0.07}s` }}
                onClick={() => navigate(item.path)}
              >
                <div className="card-icon">{item.icon}</div>
                <span className="card-text">{item.label}</span>
              </div>
            ))}
          </div>

          {/* LOGOUT BUTTON */}
          <div className="logout-container slide-up-delay">
            <button className="logout-outline-btn" onClick={() => navigate('/')}>
              Logout
            </button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Profile;