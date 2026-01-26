import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin } from 'lucide-react'; 
import AppLayout from '../../components/AppLayout/AppLayout';
import './LocationAccess.css';

const LocationAccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAllowAccess = () => {
    console.log("Location Access Granted");
    // navigate('/next-page', { state: { ...location.state } });
  };

  const handleManualEntry = () => {
    navigate('/ManualLocation', { state: { ...location.state } });
  };

  return (
    <AppLayout>
      <div className="location-screen-container">
        
        {/* MIDDLE SECTION: Illustration & Text */}
        <div className="location-body-content">
          
          {/* Pins Illustration Section */}
          <div className="pins-visual-container">
            {/* Background Circles/Pins */}
            <div className="pin-dot small p1"></div>
            <div className="pin-item-fade small p2">
               <MapPin size={35} fill="#E2E2E2" stroke="none" />
            </div>
            
            {/* Main Center Purple Pin */}
            <div className="pin-item-main">
               <MapPin size={90} fill="#5a3c6d" stroke="none" />
            </div>

            <div className="pin-item-fade small p3">
               <MapPin size={45} fill="#E2E2E2" stroke="none" />
            </div>
            <div className="pin-dot large p4"></div>
          </div>

          {/* Text Wrapper */}
          <div className="location-text-block">
            <h1 className="loc-title-text slide-up">Enable Your Location</h1>
            <p className="loc-subtitle-text fade-in">
              Choose your location to start find people around you
            </p>
          </div>

        </div>

        {/* BOTTOM SECTION: Actions & Decoration */}
        <div className="location-footer-action">
          <div className="footer-wavy-decoration"></div>
          
          <div className="loc-btn-stack slide-up-delayed">
            <button className="loc-allow-btn" onClick={handleAllowAccess}>
              Allow Location Access
            </button>
            <button className="loc-manual-link" onClick={handleManualEntry}>
              Enter Location Manually
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default LocationAccess;