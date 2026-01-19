import React from 'react';
import './Appreciate.css';
import bgImage from '../../assets/Frame (2).jpg'; 

const Appreciate = () => {
    return (
        <div className="web-container">
            {/* Center Strip (390px on Desktop) */}
            <div className="appreciate-screen animate-fade-in">
                
                {/* Background Image (Handshake at bottom) */}
                <img 
                    src={bgImage} 
                    alt="background" 
                    className="bg-image" 
                />

                {/* Text Content */}
                <div className="content-overlay">
                    <div className="text-style">
                        <h1>
                            Appreciate your <br />
                            honesty
                        </h1>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Appreciate;