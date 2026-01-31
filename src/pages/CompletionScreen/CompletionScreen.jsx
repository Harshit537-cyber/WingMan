import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompletionScreen.css';

// Images Import
import characterImg from '../../assets/img9/Character.png';
import confettiImg from '../../assets/img9/Confetti.png';

const Completion = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const targetPercentage = 60; // Aapka percentage yahan change kar sakte hain

    useEffect(() => {
        // Counter Animation Logic (0 to 60)
        let start = 0;
        const duration = 2000; // 2 seconds animation
        const increment = targetPercentage / (duration / 20);

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetPercentage) {
                setCount(targetPercentage);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="comp-screen-wrapper">
            <div className="comp-card-container">
                
                {/* Background Confetti Animation Layer */}
                <div className="confetti-rain">
                    <img src={confettiImg} alt="confetti" className="confetti-piece layer-1" />
                    <img src={confettiImg} alt="confetti" className="confetti-piece layer-2" />
                </div>

                {/* Main Content */}
                <div className="comp-content-area">
                    <div className="text-anim-box">
                        <h1 className="comp-main-text">You have</h1>
                        <h2 className="comp-percent-text">
                            completed <span className="count-number">{count}%</span>
                        </h2>
                        <h1 className="comp-main-text">of the quiz.</h1>
                    </div>
                </div>

                {/* Character Animation at Bottom */}
                <div className="comp-char-box">
                    <img src={characterImg} alt="Trumpet Character" className="comp-trumpet-man" />
                </div>

                {/* Hidden click area to proceed */}
                <div className="comp-click-overlay" onClick={() => navigate('/pick-card')}></div>
                
            </div>
        </div>
    );
};

export default Completion;