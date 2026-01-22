import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SayHy.css';

// Images import karein
import confettiImg from '../../assets/confetti.png'; // Jo image aapne abhi di
import maleImg from '../../assets/male-wingman.png'; 
import femaleImg from '../../assets/female-wingman.png';

const SayHy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name || "User";
  const gender = location.state?.gender || "female";

  useEffect(() => {
  const timer = setTimeout(() => {
    navigate('/birthday'); // 3 second baad Birthday page pe jayega
  }, 3000);
  return () => clearTimeout(timer);
}, [navigate]);

  return (
    <div className="say-hy-container">
      {/* Celebration Confetti Animation */}
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

      {/* Center Text Section */}
      <div className="centered-content">
        <h1 className="hy-title fade-in-up">
          Hey <span className="highlight-name">{name}</span>,
        </h1>
        <h2 className="hy-subtitle fade-in-up-delay">
          I’m your WingMann,
        </h2>
        <p className="hy-tagline fade-in-slow">let’s find you a great date!</p>
      </div>

      {/* Character Image at Bottom */}
      <div className="illustration-container slide-up-char">
        <img 
          src={gender === 'male' ? maleImg : femaleImg} 
          alt="WingMann" 
          className="wingman-img"
        />
      </div>
    </div>
  );
};

export default SayHy;