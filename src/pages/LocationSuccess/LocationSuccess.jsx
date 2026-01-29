import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';
import confettiImg from '../../assets/confetti.png'; 
import workingImg from '../../assets/working-char.png'; 
import './LocationSuccess.css';

const LocationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pichle page se city ka naam nikaalna
  const city = location.state?.manualAddress || "Banglore";

  useEffect(() => {
    const timer = setTimeout(() => {
      // 3.5 second baad home par move karega
      navigate('/Native', { state: { ...location.state } });
    }, 3500); 
    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <AppLayout>
      <div className="loc-success-screen-wrapper">
        
        {/* Confetti Animation Layer */}
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

        {/* Center Content - Perfectly Centered */}
        <div className="success-centered-text">
          <h1 className="city-name-title fade-in-up">{city}</h1>
          <div className="tagline-wrap fade-in-up-delay">
            <p className="success-tagline">
              Sweet — the city of <br /> startups and <br /> filter coffee
            </p>
            {/* Curved decoration */}
            <svg className="svg-text-curve" viewBox="0 0 100 20">
              <path d="M10,10 Q50,20 90,10" fill="transparent" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Bottom Illustration */}
        <div className="success-illustration-container slide-up-char">
          <img src={workingImg} alt="Working" className="working-char-img" />
        </div>

      </div>
    </AppLayout>
  );
};

export default LocationSuccess;