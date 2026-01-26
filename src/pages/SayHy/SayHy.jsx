import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import './SayHy.css';

// Images import
import confettiImg from '../../assets/confetti.png'; 
import maleImg from '../../assets/male-wingman.png'; 
import femaleImg from '../../assets/female-wingman.png';

const SayHy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name || "User";
  const gender = location.state?.gender || "female";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/birthday', { state: { ...location.state } }); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <AppLayout>
      <div className="say-hy-screen-wrapper">
        
        {/* Confetti Animation Layer */}
        <div className="confetti-container">
          {[...Array(12)].map((_, i) => (
            <img 
              key={i}
              src={confettiImg} 
              className={`confetti-item c${i}`} 
              alt="confetti"
            />
          ))}
        </div>

        {/* Center Text Content */}
        <div className="hy-text-content">
          <h1 className="hy-title-main fade-in-up">
            Hey <span className="name-highlight">{name}</span>,
          </h1>
          <h2 className="hy-subtitle-main fade-in-up-delay">
            I’m your WingMann,
          </h2>
          <p className="hy-tagline-main fade-in-slow">
            let’s find you a great date!
          </p>
        </div>

        {/* Bottom Illustration */}
        <div className="wingman-illustration-wrap slide-up-char">
          <img 
            src={gender === 'male' ? maleImg : femaleImg} 
            alt="WingMann" 
            className="wingman-character"
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default SayHy;