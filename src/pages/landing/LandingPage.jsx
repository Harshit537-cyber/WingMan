import React from 'react';
import './LandingPage.css';
import datingImg from '../../assets/image.png'; 

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Illustration Section */}
      <div className="illustration-box fade-in-down">
        <img 
          src={datingImg} 
          alt="Dating Illustration" 
          className="illustration-img"
        />
      </div>

      {/* Text Section */}
      <div className="text-box fade-in-up">
        <h1 className="landing-title">
          Ready to stop <br /> 
          <span>swiping and start</span> <br /> 
          meeting?
        </h1>
      </div>

      {/* Button Section */}
      <div className="button-box fade-in-up-delay">
        <button className="google-login-btn">
          Connect to Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;