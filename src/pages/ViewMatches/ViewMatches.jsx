import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewMatches.css';

// Image Import (Aapke folder structure ke hisaab se)
import matchIllustration from '../../assets/img16/Frame 1874.png';

const ViewMatches = () => {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    // Trigger animations after mount
    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className="vm-screen-wrapper">
            <div className="vm-container">
                {/* Header (Back Button Only) */}
                <header className="vm-header">
                    <button className="vm-back-btn" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#432C51" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                </header>

                {/* Main Content */}
                <main className="vm-main-content">
                    
                    {/* Floating Illustration */}
                    <div className={`vm-image-container ${animate ? 'anim-float' : ''}`}>
                        <img src={matchIllustration} alt="Matches" className="vm-illustration" />
                    </div>

                    {/* Robot & Speech Bubble Wrapper */}
                    <div className={`vm-message-wrapper ${animate ? 'anim-pop-in' : ''}`}>
                        
                        {/* Robot Icon (Custom SVG) */}
                   

                        {/* Speech Bubble
                        <div className="vm-speech-bubble">
                            <p className="vm-bubble-text">Let’s view your matches</p>
                        </div> */}
                    </div>

                </main>

                {/* Footer Button */}
                <footer className={`vm-footer ${animate ? 'anim-slide-up' : ''}`}>
                    <button className="vm-primary-btn" onClick={() => navigate('/match')}>
                        View Matches
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ViewMatches;