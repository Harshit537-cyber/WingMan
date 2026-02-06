import React, { useState } from 'react';
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
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAjpwhp-RgMlzJCM_8KGHtejxRyIfVaNHI" 
  });

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '20px',
    marginBottom: '20px',
  };

  // --- UPDATED API FUNCTION ---
  const syncLocationWithBackend = async (lat, lng) => {
    try {
      // AGAR APKI API TAYYAR HAI TO YE CODE CHALAYEIN:
      /*
      const response = await fetch('https://your-api-url.com/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          userId: location.state?.userId // example
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      */

      // TESTING KE LIYE (Simulating API Delay):
      console.log("Syncing with backend...", { lat, lng });
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second wait

      // Success hone par next page par bhej rahe hain
      navigate('/LocationSuccess', { 
        state: { ...location.state, lat, lng } 
      });

    } catch (error) {
      console.error("API Error:", error);
      // Agar API fail bhi ho jaye, tab bhi testing ke liye agle page par bhejna chahte hain toh navigate yahan bhi rakh sakte hain
      alert("API Error: Make sure your URL is correct. Moving to next screen for demo.");
      navigate('/LocationSuccess', { state: { ...location.state, lat, lng } });
    }
  };

  const handleAllowAccess = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCoords = { lat: latitude, lng: longitude };
          
          setCoords(newCoords);
          setShowMap(true);

          // API call function call kar rahe hain
          syncLocationWithBackend(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          alert("Permission Denied: Please enable location in your browser settings.");
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
      {!showMap ? (
        <div className="illustration-wrapper fade-in-down">
          <img src={locationImg} alt="Location Access" className="location-main-img" />
        </div>
      ) : (
        <div className="map-wrapper fade-in">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coords}
              zoom={15}
              options={{ disableDefaultUI: true, zoomControl: true }}
            >
              <MarkerF position={coords} />
            </GoogleMap>
          ) : (
            <div className="map-loading">Loading Map...</div>
          )}
        </div>
      )}

      <div className="text-section">
        <h1 className="title slide-up">
          {showMap ? "Location Found!" : "Enable Your Location"}
        </h1>
        <p className="subtitle slide-up-delay">
          {showMap 
            ? "Syncing your coordinates with your profile..." 
            : "To discover meaningful connections near by"}
        </p>
      </div>

      <div className="button-group fade-in-up">
        <button 
          className="allow-btn" 
          onClick={handleAllowAccess} 
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {loading ? (
            <><Loader2 className="spinner-icon" size={20} /> Processing...</>
          ) : (
            showMap ? "Verified" : "Allow Location Access"
          )}
        </button>
        
        <button 
          className="manual-btn" 
          onClick={() => navigate('/ManualLocation', { state: { ...location.state } })}
        >
          Enter Location Manually
        </button>
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