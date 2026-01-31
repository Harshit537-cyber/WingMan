import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import confettiImg from '../../assets/confetti.png'; 
import rightHandImg from '../../assets/wellcome/hand-right.svg';
import leftHandImg from '../../assets/wellcome/hand-left.svg'; 
import './HonestySuccess.css';

const HonestySuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/uploads', { state: { ...location.state } });
    }, 3500); 
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <AppLayout>
      <div className="honesty-success-wrapper">
        <div className="confetti-overlay">
          {[...Array(12)].map((_, i) => (
            <img 
              key={i}
              src={confettiImg} 
              className={`confetti-bit p${i}`} 
              alt="confetti"
            />
          ))}
        </div>

        <div className="success-centered-text">
          <h1 className="honesty-title fade-in-up">
            Appreciate your <br /> honesty
          </h1>
        </div>

        <div className="handshake-container">
            <img src={leftHandImg} alt="Left Hand" className="hand hand-left" />
            <img src={rightHandImg} alt="Right Hand" className="hand hand-right" />
        </div>
      </div>
    </AppLayout>
  );
};

export default HonestySuccess;