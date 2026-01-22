import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight, EyeOff, Eye } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './ChangePassword.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  
  // States for toggling password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <AppLayout>
      <div className="change-pass-container">
        
        {/* HEADER */}
        <header className="change-pass-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="header-title">Change Password</h1>
          <div className="header-right">
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="change-pass-content slide-up">
          
          {/* Current Password Field */}
          <div className="input-group">
            <label className="input-label">Current Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showCurrent ? "text" : "password"} 
                placeholder="********" 
                className="pass-input"
              />
              <button 
                className="eye-toggle" 
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? <Eye size={22} color="#666" /> : <EyeOff size={22} color="#666" />}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="input-group">
            <label className="input-label">New Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showNew ? "text" : "password"} 
                placeholder="********" 
                className="pass-input"
              />
              <button 
                className="eye-toggle" 
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <Eye size={22} color="#666" /> : <EyeOff size={22} color="#666" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password Field */}
          <div className="input-group">
            <label className="input-label">Confirm New Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showConfirm ? "text" : "password"} 
                placeholder="********" 
                className="pass-input"
              />
              <button 
                className="eye-toggle" 
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye size={22} color="#666" /> : <EyeOff size={22} color="#666" />}
              </button>
            </div>
          </div>

        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default ChangePassword;