import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Bell, AlignRight, Pencil, 
  Mail, Lock, EyeOff, Eye 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import profileImg from '../../../assets/profile-user.png'; 
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Profile Ring Calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (75 / 100) * circumference;

  return (
    <AppLayout>
      <div className="edit-profile-container">
        
        {/* HEADER */}
        <header className="edit-top-nav">
          <button className="nav-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="edit-nav-title">Edit Profile</h1>
          <div className="edit-nav-right">
             <div className="bell-wrapper">
                <Bell size={26} color="#5a3c6d" />
                <span className="orange-dot"></span>
             </div>
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="edit-scroll-content slide-up">
          
          {/* PROFILE IMAGE SECTION WITH EDIT BUTTON */}
          <div className="edit-avatar-section">
            <div className="ring-container">
              <span className="perc-tag">75%</span>
              <svg className="svg-ring-edit" width="120" height="120">
                <circle 
                   className="ring-path-edit" 
                   cx="60" cy="60" r={radius} 
                   strokeDasharray={circumference}
                   style={{ strokeDashoffset: strokeDashoffset }}
                />
              </svg>
              <div className="avatar-main">
                <img src={profileImg} alt="user" />
                {/* Small Pencil Edit Icon */}
                <button className="small-edit-btn">
                  <Pencil size={14} color="#fff" fill="#fff" />
                </button>
              </div>
            </div>
            <div className="user-info-text">
               <h2>GFXAgency</h2>
               <p>UI UX DESIGN</p>
            </div>
          </div>

          {/* FORM FIELDS */}
          <div className="edit-form">
            
            {/* Email Field */}
            <div className="input-field-group">
              <label>Your Email</label>
              <div className="input-with-icon">
                <Mail className="prefix-icon" size={22} color="#1a1a1a" />
                <input type="email" placeholder="xxx@gmail.com" />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-field-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="prefix-icon" size={22} color="#1a1a1a" />
                <input type={showPassword ? "text" : "password"} placeholder="xxx@gmail.com" />
                <button 
                  className="suffix-toggle" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                </button>
              </div>
            </div>

            {/* About Field */}
            <div className="input-field-group">
              <label>About</label>
              <textarea 
                className="about-textarea" 
                placeholder="About ......." 
                rows="5"
              ></textarea>
            </div>

          </div>

          {/* SAVE BUTTON */}
          <div className="save-btn-container">
            <button className="save-changes-btn" onClick={() => navigate('/profile')}>
              Save Changes
            </button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default EditProfile;