import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';

// Assets
import characterImg from '../../assets/img9/Character.png';
import confettiImg from '../../assets/img9/Confetti.png';
import successAudio from '../../assets/img9/audio.mp3'; // <--- Import your audio file here
import './SharingSuccess.css';

const SharingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name || "Friend";

    useEffect(() => {
        // 1. Play Audio Logic
        const audio = new Audio(successAudio);
        audio.volume = 0.6; // Adjust volume (0.0 to 1.0)
        
        // Browsers allow autoplay if user has interacted with the site (which they did by typing their name)
        audio.play().catch(err => console.log("Playback interaction required", err));

        // 2. Navigation Logic
        const timer = setTimeout(() => {
            navigate('/home', { state: { ...location.state } });
        }, 4000); // Increased slightly so audio can finish

        // Cleanup: stop audio if user leaves page early
        return () => {
            audio.pause();
            audio.currentTime = 0;
            clearTimeout(timer);
        };
    }, [navigate, location.state]);

    return (
        <AppLayout>
            <div className="sharing-screen-wrapper">
                <div className="sharing-card-container">
                    
                    <div className="confetti-rain-layer">
                        <img src={confettiImg} alt="confetti" className="rain-piece r-layer-1" />
                        <img src={confettiImg} alt="confetti" className="rain-piece r-layer-2" />
                    </div>

                    <div className="sharing-content-area">
                        <div className="text-anim-box">
                            <h1 className="sharing-main-title">
                                Perfect, <br /> 
                                Thanks for sharing <br />
                                <span className="user-dynamic-name">{userName}</span>
                            </h1>
                        </div>
                    </div>

                    {/* Character is now smaller via CSS */}
                    <div className="sharing-char-box">
                        <img src={characterImg} alt="Trumpet Character" className="sharing-trumpet-man" />
                    </div>

                    <div className="skip-overlay" onClick={() => navigate('/next-step')}></div>
                    
                </div>
            </div>
        </AppLayout>
    );
};

export default SharingSuccess;