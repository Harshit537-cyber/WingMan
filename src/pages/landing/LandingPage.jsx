import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import './LandingPage.css';
import datingImg from '../../assets/image.svg'; 
import AppLayout from '../../components/AppLayout/AppLayout';

const LandingPage = () => {
  const navigate = useNavigate();

  // 👇 YE LINE YAHAN PASTE KARO
  const [loading, setLoading] = useState(false);


  const handleLogin = () => {
  setLoading(true); // loader ON

  setTimeout(() => {
    navigate('/gender'); // next page
  }, 2000);
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
        <button
  className="google-login-btn"
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? <span className="loader"></span> : 'Continue to Google'}
</button>

      </div>
    </div>
    </AppLayout>
  );
};

export default LandingPage;