import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import confettiImg from '../../assets/confetti.png'; 
import workingImg from '../../assets/working-char.png'; // Bottom wali illustration
import './LocationSuccess.css';

const LocationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pichle page se city ka naam nikaalna
  const city = location.state?.manualAddress || "Banglore";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/next-step', { state: { ...location.state } });
    }, 3500); // 3.5 seconds pause
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <AppLayout>
      <div className="loc-success-container">
        
        {/* Confetti Animation (Reused) */}
        <div className="confetti-wrapper">
          {[...Array(12)].map((_, i) => (
            <img 
              key={i}
              src={confettiImg} 
              className={`confetti-piece p${i}`} 
              alt="confetti"
            />
          ))}
        </div>

        {/* Center Content */}
        <div className="success-text-content">
          <h1 className="city-name fade-in-up">{city}</h1>
          <div className="tagline-container fade-in-up-delay">
            <p className="tagline">
              Sweet — the city of <br /> startups and <br /> filter coffee
            </p>
            {/* Curved line under text */}
            <svg className="text-curve" viewBox="0 0 100 20">
              <path d="M10,10 Q50,20 90,10" fill="transparent" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="working-illustration slide-up-char">
          <img src={workingImg} alt="Working at computer" className="char-img" />
        </div>

      </div>
    </AppLayout>
  );
};

export default LocationSuccess;