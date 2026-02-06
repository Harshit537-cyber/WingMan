import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import locationImg from '../../assets/location.svg'; // Make sure the name matches your file
import './AccessLocation.css';

const AccessLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAllowAccess = () => {
    // Browser location permission logic
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location Access Granted");
          // Navigate with previous state + location
          // ✅ Replace your current navigate block with this
          navigate('/SelectState', {
            state: {
              ...location.state,
              location: {
                address: "Current Location", // Placeholder for now
                coordinates: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
              }
            }
          });
        },
        (error) => {
          alert("Please enable location in settings");
        }
      );
    }
  };

  return (
    <div className="location-container">
      {/* Top Illustration */}
      <div className="illustration-wrapper fade-in-down">
        <img
          src={locationImg}
          alt="Location Access"
          className="location-main-img"
        />
      </div>

      {/* Text Section */}
      <div className="text-section">
        <h1 className="title slide-up">Enable Your Location</h1>
        <p className="subtitle slide-up-delay">
          To discover meaningful connections near by
        </p>
      </div>

      {/* Buttons */}
      <div className="button-group fade-in-up">
        <button className="allow-btn" onClick={handleAllowAccess}>
          Allow Location Access
        </button>
        <button className="manual-btn" onClick={() => navigate('/ManualLocation', { state: { ...location.state } })}>
          Enter Location Manually
        </button>
      </div>

      {/* Progress Footer */}
      <div className="location-footer">
        {/* Background Dashed Line */}
        <div className="curved-path">
          <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none">
            <path d="M0,40 Q100,10 200,40 T400,40" fill="none" stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>


      </div>
    </div>
  );
};

export default AccessLocation;