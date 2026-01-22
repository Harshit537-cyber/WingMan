import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, AlignRight, ChevronRight } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import './AccountSetting.css';

const AccountSetting = () => {
  const navigate = useNavigate();
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);

  return (
    <AppLayout>
      <div className="account-settings-main">
        
        {/* HEADER */}
        <header className="settings-top-nav">
          <button className="nav-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <h1 className="settings-nav-title">Account Setting</h1>
          <div className="nav-right-icon">
             <AlignRight size={26} color="#5a3c6d" />
          </div>
        </header>

        <div className="settings-body-content slide-up-animation">
          
          <h2 className="settings-group-label">Account Settings</h2>

          <div className="settings-options-list">
            
            {/* Edit Profile Item */}
            <div className="settings-row" onClick={() => navigate('/edit-profile')}>
              <span className="settings-label-text">Edit profile</span>
              <ChevronRight size={24} color="#1a1a1a" />
            </div>

            {/* Change Password Item */}
            <div className="settings-row" onClick={() => navigate('/change-password')}>
              <span className="settings-label-text">Change password</span>
              <ChevronRight size={24} color="#1a1a1a" />
            </div>

            {/* Push Notifications Toggle Item */}
            <div className="settings-row no-click">
              <span className="settings-label-text">Push notifications</span>
              <label className="ui-toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isNotificationsOn} 
                  onChange={() => setIsNotificationsOn(!isNotificationsOn)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

          </div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default AccountSetting;