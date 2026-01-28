import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mic, Volume2, MicOff } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import profileImg from '../../../assets/profile-user.png'; 
import './CallScreen.css';

const CallScreen = () => {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleHangup = () => {
    navigate(-1); 
  };

  const handleAccept = () => {
    setIsAccepted(true);
  };

  return (
    <AppLayout>
      <div className="call-screen-container">
        
        {/* WAVE PATTERN BACKGROUND */}
        <div className="call-bg-overlay">
           <div className="call-wave w1"></div>
           <div className="call-wave w2"></div>
           <div className="call-wave w3"></div>
        </div>

        {/* PROFILE INFO */}
        <div className="call-profile-section">
          <div className="call-avatar-wrapper">
            <img src={profileImg} alt="John Michel" className="call-avatar-img" />
          </div>
          <div className="call-user-info">
            <h1 className="call-user-name">
              John Michel <Mic size={20} className="mic-icon-inline" />
            </h1>
            <p className="call-user-sub">Student</p>
          </div>
        </div>

        {/* CALL STATUS */}
        <div className="call-status-middle">
          <p className="call-status-text">
            {isAccepted ? '00:05' : 'Incoming call...'}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="call-footer-actions">
          
          {!isAccepted ? (
            /* STATE: INCOMING */
            <div className="actions-incoming-row">
              <button className="call-btn-circle accept-bg" onClick={handleAccept}>
                <Phone size={32} fill="white" color="white" />
              </button>
              <button className="call-btn-circle hangup-bg" onClick={handleHangup}>
                <Phone size={32} fill="white" color="white" className="hangup-rotate" />
              </button>
            </div>
          ) : (
            /* STATE: ACTIVE CALL */
            <div className="actions-active-row">
              <button 
                className={`call-opt-circle ${isMuted ? 'muted-active' : ''}`} 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              
              <button className="call-opt-circle">
                <Volume2 size={24} />
              </button>
              
              <button className="call-btn-circle hangup-bg" onClick={handleHangup}>
                <Phone size={32} fill="white" color="white" className="hangup-rotate" />
              </button>
            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
};

export default CallScreen;