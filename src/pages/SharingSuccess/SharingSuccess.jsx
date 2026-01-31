import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout/AppLayout';

// Images Import - Using the paths from your example
import characterImg from '../../assets/img9/Character.png';
import confettiImg from '../../assets/img9/Confetti.png';
import './SharingSuccess.css';

const SharingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Pulling name from AskName screen state
    const userName = location.state?.name || "Friend";

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to next screen after 4 seconds
            navigate('/home', { state: { ...location.state } });
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigate, location.state]);

    return (
        <AppLayout>
            <div className="sharing-screen-wrapper">
                <div className="sharing-card-container">
                    
                    {/* Continuous Confetti Rain Animation */}
                    <div className="confetti-rain-layer">
                        <img src={confettiImg} alt="confetti" className="rain-piece r-layer-1" />
                        <img src={confettiImg} alt="confetti" className="rain-piece r-layer-2" />
                    </div>

                    {/* Main Content Area */}
                    <div className="sharing-content-area">
                        <div className="text-anim-box">
                            <h1 className="sharing-main-title">
                                Perfect, <br /> 
                                Thanks for sharing <br />
                                <span className="user-dynamic-name">{userName}</span>
                            </h1>
                        </div>
                    </div>

                    {/* Character Animation at Bottom */}
                    <div className="sharing-char-box">
                        <img src={characterImg} alt="Trumpet Character" className="sharing-trumpet-man" />
                    </div>

                    {/* Click anywhere to skip/proceed manually */}
                    <div className="skip-overlay" onClick={() => navigate('/home')}></div>
                    
                </div>
            </div>
        </AppLayout>
    );
};

export default SharingSuccess;