import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './LandingPage.css';
import datingImg from '../../assets/image.svg'; 
import AppLayout from '../../components/AppLayout/AppLayout';

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    
    navigate('/gender'); 
  };

  return (
    <AppLayout> 
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
        {/* 3. Button pe onClick handler lagayein */}
        <button className="google-login-btn" onClick={handleLogin}>
          Connect to Google
        </button>
      </div>
    </div>
    </AppLayout>
  );
};

export default LandingPage;