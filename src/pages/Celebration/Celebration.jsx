import React from 'react';
import './Celebration.css';
import trumpetImg from '../../assets/trumpet.png'; 
import confettiImg from '../../assets/Confetti.png';

const Celebration = ({ userName = "User" }) => {
  return (
    <div className="web-container-celebration">
      <div className="celebration-card-screen">
        
        {/* Background Confetti */}
        <div className="confetti-wrapper">
          <img src={confettiImg} alt="" className="confetti-gfx c1" />
          <img src={confettiImg} alt="" className="confetti-gfx c2" />
          <img src={confettiImg} alt="" className="confetti-gfx c3" />
        </div>

        {/* Content Area - Isme humne alignment bottom rakhi hai */}
        <div className="content-area-celebration">
          
          {/* Text Section - Ab ye image ke upar aur niche ki taraf rahega */}
          <div className="text-section-bottom">
            <h1 className="main-msg-bottom">
              Perfect, <br />
              Thanks for sharing <br />
              <span className="user-highlight-bottom">{userName}</span>
            </h1>
          </div>

          {/* Trumpet Illustration - Bottom se attached */}
          <div className="illustration-section-bottom">
            <img 
              src={trumpetImg} 
              alt="Trumpet Player" 
              className="trumpet-img-bottom" 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Celebration;