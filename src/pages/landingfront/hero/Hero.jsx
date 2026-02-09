import React from 'react';
import './Hero.css';

// Images import karein (Apne assets folder ke hisaab se path change karein)
import LeftSilhouettes from '../../../assets/landingimg/left-people.svg';
import RightSilhouettes from '../../../assets/landingimg/right-people.svg';
//import CenterCharacters from '../../../assets/landingimg/center-chars.svg';//

const HeroSection = () => {
  return (
    <section className="hero-container">
      {/* Background Silhouettes */}
      <div className="side-image left-side fade-in-left">
        { <img src={LeftSilhouettes} alt="people swiping" />}
      </div>
      
      <div className="side-image right-side fade-in-right">
        { <img src={RightSilhouettes} alt="right-bubble" />}
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <h1 className="hero-title slide-up" style={{ animationDelay: '0.2s' }}>
          Everyone is swiping.
        </h1>
        <h1 className="hero-title slide-up" style={{ animationDelay: '0.4s' }}>
          Everyone is chatting.
        </h1>
        <h1 className="hero-title highlight slide-up" style={{ animationDelay: '0.6s' }}>
          Almost no one is actually <br /> meeting.
        </h1>

        <div className="hero-subtitle slide-up" style={{ animationDelay: '0.8s' }}>
          <p>WingMann exists because modern dating is loud, fast, and strangely lonely.</p>
          <p className="scroll-text">Scroll. There's a better way.</p>
        </div>

        {/* Center Character Illustration */}
        <div className="center-illustration zoom-in">
    
           {/* Niche dotted lines ke liye aap SVG use kar sakte ho */}
           <div className="dotted-path"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;