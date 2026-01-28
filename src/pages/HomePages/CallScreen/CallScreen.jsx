import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mic, Volume2, MicOff } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import profileImg from '../../../assets/match-profile.jpg'; // Nikita/John Michel image
import './CallScreen.css';

const CallScreen = () => {
  const navigate = useNavigate();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleHangup = () => {
    navigate(-1); // Back to previous screen
  };

  const handleAccept = () => {
    setIsAccepted(true);
  };

  return (
    <AppLayout>
      <div className="call-screen-wrapper">
        
        {/* WAVE PATTERN BACKGROUND DECORATION */}
        <div className="bg-wavy-overlay">
           <div className="wave-circle c1"></div>
           <div className="wave-circle c2"></div>
           <div className="wave-circle c3"></div>
        </div>

        {/* TOP CONTENT: PROFILE INFO */}
        <div className="call-top-content">
          <div className="caller-avatar-frame">
            <img src={profileImg} alt="John Michel" className="caller-img" />
          </div>
          <div className="caller-meta">
            <h1 className="caller-name">John Michel <Mic size={20} className="inline-mic" /></h1>
            <p className="caller-profession">Student</p>
          </div>
        </div>

        {/* CENTER STATUS */}
        <div className="call-status-area">
          <p className="status-text">Incoming call...</p>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="call-actions-footer">
          
          {!isAccepted ? (
            // STATE 1: INCOMING (Green & Red Buttons)
            <div className="action-row-incoming">
              <button className="btn-call accept" onClick={handleAccept}>
                <Phone size={32} fill="white" color="white" />
              </button>
              <button className="btn-call hangup" onClick={handleHangup}>
                <Phone size={32} fill="white" color="white" className="rotate-hangup" />
              </button>
            </div>
          ) : (
            // STATE 2: ACCEPTED (Mic, Speaker & Red Buttons)
            <div className="action-row-active">
              <button 
                className={`btn-action-circle ${isMuted ? 'active-mute' : ''}`} 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              
              <button className="btn-action-circle">
                <Volume2 size={24} />
              </button>
              
              <button className="btn-call hangup" onClick={handleHangup}>
                <Phone size={32} fill="white" color="white" className="rotate-hangup" />
              </button>
            </div>
          )}

        </div>

      </div>
    </AppLayout>
  );
};

export default CallScreen;