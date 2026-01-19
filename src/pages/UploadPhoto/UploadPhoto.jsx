import React from 'react';
import './UploadPhoto.css';
import { useNavigate } from 'react-router-dom';

const UploadPhoto = () => {
    const navigate = useNavigate();
    const photoSlots = [1, 2, 3, 4, 5, 6];

    return (
        <div className="web-container">
            <div className="upload-screen animate-fade-in">
                
                {/* Header: Back Button + Progress Bar */}
                <div className="top-nav-bar">
                    <div className="back-arrow" onClick={() => navigate(-1)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </div>
                    <div className="header-progress-container">
                        <div className="header-progress-fill"></div>
                    </div>
                </div>

                <div className="scrollable-content">
                    {/* Title Section */}
                    <div className="text-header">
                        <h1 className="upload-title">Upload Your Photo</h1>
                        <p className="upload-subtext">
                            We'd love to see you. Upload a photo for your dating journey.
                        </p>
                    </div>

                    {/* 2x3 Photo Grid */}
                    <div className="photo-upload-grid">
                        {photoSlots.map((slot) => (
                            <div key={slot} className="photo-upload-box">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5d3d63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                    <circle cx="12" cy="13" r="4"></circle>
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Decorative Wave (Dotted) */}
                <div className="bottom-wave-container">
                    <svg viewBox="0 0 400 100" width="100%">
                        <path 
                            d="M-10,80 C100,20 250,120 410,40" 
                            fill="none" 
                            stroke="#E0E0E0" 
                            strokeWidth="3" 
                            strokeDasharray="8,8"
                        />
                    </svg>
                </div>

                {/* Fixed Bottom Action Button */}
                <div className="action-nav">
                    <div className="outer-circle-ring" onClick={() => navigate('/next-page')}>
                        <div className="inner-solid-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UploadPhoto;