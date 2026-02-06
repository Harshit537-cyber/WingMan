import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react'; 
import locationImg from '../../assets/location.svg';
import './AccessLocation.css';

const AccessLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: 30.2831, lng: 77.9921 }); // Default value

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAjpwhp-RgMlzJCM_8KGHtejxRyIfVOOO" 
  });

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '20px',
  };

  // Sync aur Navigate logic
  const handleSyncAndNavigate = async (lat, lng) => {
    console.log("Syncing with backend...", { lat, lng });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    console.log("Navigating with:", { lat, lng });
    navigate('/LocationSuccess', { 
      state: { ...location.state, lat, lng } 
    });
  };

  const handleAllowAccess = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setShowMap(true); // Map ko show karenge display toggle se
          
          handleSyncAndNavigate(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          alert("Location access denied. Please enable it in browser settings.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
      alert("Geolocation not supported.");
    }
  };

  return (
    <div className="location-container">
      
      {/* VISUAL AREA: Dono elements hamesha DOM mein rahenge, bas hide/show honge */}
      <div className="visual-display-area" style={{ minHeight: '320px', position: 'relative' }}>
        
        {/* Illustration: Hidden when showMap is true */}
        <div 
          className="illustration-wrapper fade-in" 
          style={{ display: showMap ? 'none' : 'block' }}
        >
          <img src={locationImg} alt="Location" className="location-main-img" />
        </div>

        {/* Map: Hidden when showMap is false */}
        <div 
          className="map-wrapper fade-in" 
          style={{ display: showMap ? 'block' : 'none' }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coords}
              zoom={15}
              options={{ 
                disableDefaultUI: true,
                gestureHandling: 'none' 
              }}
            >
              <MarkerF position={coords} />
            </GoogleMap>
          )}
        </div>
      </div>

      <div className="text-section">
        <h1 className="title">
          {showMap ? "Location Found!" : "Enable Your Location"}
        </h1>
        <p className="subtitle">
          {showMap 
            ? "Your coordinates are being synced..." 
            : "To discover meaningful connections near by"}
        </p>
      </div>

      <div className="button-group">
        <button 
          className="allow-btn" 
          onClick={handleAllowAccess} 
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {loading ? (
            <><Loader2 className="spinner-icon" size={20} /> Processing...</>
          ) : (
             "Allow Location Access"
          )}
        </button>
        
        {!loading && (
          <button 
            className="manual-btn" 
            onClick={() => navigate('/ManualLocation', { state: { ...location.state } })}
          >
            Enter Location Manually
          </button>
        )}
      </div>

      <div className="location-footer">
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