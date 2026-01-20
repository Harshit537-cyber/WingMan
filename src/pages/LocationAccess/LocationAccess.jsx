import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react'; // Standard pin icon
import './LocationAccess.css';

const LocationAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAllowAccess = () => {
    // browser location permission logic yahan aa sakta hai
    console.log("Location Access Granted");
    // navigate('/next-page', { state: { ...location.state } });
  };

  return (
    <div className="location-page-container">
      {/* Background Dashed Line */}
      <div className="bg-dashed-path">
        <svg width="100%" height="150" viewBox="0 0 400 150" fill="none" preserveAspectRatio="none">
          <path 
            d="M0,120 Q100,80 200,120 T400,120" 
            stroke="#E2D8E8" 
            strokeWidth="2" 
            strokeDasharray="8 8" 
          />
        </svg>
      </div>

      <div className="location-content">
        {/* Animated Illustration Section */}
        <div className="pins-illustration">
          <div className="pin-circle small grey p1"></div>
          <div className="pin-item small grey p2">
             <MapPin size={30} fill="#E2E2E2" stroke="none" />
          </div>
          
          {/* Main Large Pin */}
          <div className="pin-item main-purple">
             <MapPin size={80} fill="#5a3c6d" stroke="none" />
          </div>

          <div className="pin-item small grey p3">
             <MapPin size={40} fill="#E2E2E2" stroke="none" />
          </div>
          <div className="pin-circle small grey p4"></div>
        </div>

        {/* Text Section */}
        <div className="text-wrapper">
          <h1 className="loc-title slide-up">Enable Your Location</h1>
          <p className="loc-subtitle slide-up-delay">
            Choose your location to start find people around you
          </p>
        </div>

        {/* Buttons Section */}
        <div className="button-group fade-in-up">
          <button className="allow-btn" onClick={handleAllowAccess}>
            Allow Location Access
          </button>
          <button className="manual-btn">
            Enter Location Manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationAccess;