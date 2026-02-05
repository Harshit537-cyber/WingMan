import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import datingImg from '../../assets/image.svg'; 
import AppLayout from '../../components/AppLayout/AppLayout';
import { getFCMToken } from '../../firebase'; // 👈 Import function check kar lena path sahi ho

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // 🔥 FCM Token Generate Start
    const fcmToken = await getFCMToken();
    
    if (fcmToken) {
      console.log("📲 FCM Token for Wingmann:", fcmToken);
      // Token ko storage mein save kar lo taaki backend ko bhej sako
      localStorage.setItem("fcmToken", fcmToken);
    }

    // Login logic / Navigation
    setTimeout(() => {
      navigate('/gender'); 
    }, 1500);
  };

  return (
    <AppLayout> 
      <div className="landing-container">
        <div className="illustration-box fade-in-down">
          <img src={datingImg} alt="Dating" className="illustration-img" />
        </div>

        <div className="text-box fade-in-up">
          <h1 className="landing-title">
            Ready to stop <br /> 
            <span>swiping and start</span> <br /> 
            dating with intent?
          </h1>
        </div>

        <div className="button-box fade-in-up-delay">
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