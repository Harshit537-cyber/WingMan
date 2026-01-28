import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './LandingPage.css';
import datingImg from '../../assets/image.svg'; 
import AppLayout from '../../components/AppLayout/AppLayout';

const LandingPage = () => {
  const navigate = useNavigate(); // 2. Hook ko initialize karein

  const handleLogin = () => {
    // Yaha aap logic add kar sakte hain (jaise Google Auth) 
    // Uske baad niche wali line se navigate hoga
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
          dating with intent?
        </h1>
      </div>

      {/* Button Section */}
      <div className="button-box fade-in-up-delay">
        {/* 3. Button pe onClick handler lagayein */}
        <button className="google-login-btn" onClick={handleLogin}>
          Let Start
        </button>
      </div>
    </div>
    </AppLayout>
  );
};

export default LandingPage;