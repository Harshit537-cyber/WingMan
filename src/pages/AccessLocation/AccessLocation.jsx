import React, { useState } from 'react'; // Added useState for loading feedback
import { useNavigate, useLocation } from 'react-router-dom';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import locationImg from '../../assets/location.svg'; 
import './AccessLocation.css';

const AccessLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isFetching, setIsFetching] = useState(false);

  // ✅ Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "AIzaSyAjpwhp-RgMlzJCM_8KGHtejxRyIfVaNHI";

  const handleAllowAccess = () => {
    if (navigator.geolocation) {
      setIsFetching(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // ✅ Fetch Real Address from Google Maps API
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();

            let readableAddress = "Unknown Location";
            if (data.status === "OK" && data.results.length > 0) {
              // Extracting a shorter city/area name for the "Success" screen
              const addressComponents = data.results[0].address_components;
              const city = addressComponents.find(comp => comp.types.includes("locality"))?.long_name || 
                           addressComponents.find(comp => comp.types.includes("administrative_area_level_2"))?.long_name ||
                           data.results[0].formatted_address;
              
              readableAddress = city;
            }

            console.log("Location Access Granted:", readableAddress);

            // ✅ Navigate with real address and coordinates
            navigate('/LocationSuccess', {
              state: {
                ...location.state,
                location: {
                  address: readableAddress, 
                  coordinates: {
                    lat: latitude,
                    lng: longitude
                  }
                }
              }
            });
          } catch (error) {
            console.error("Error fetching address:", error);
            // Fallback if API fails
            navigate('/LocationSuccess', {
              state: { ...location.state, location: { address: "Current Location", coordinates: { lat: latitude, lng: longitude } } }
            });
          } finally {
            setIsFetching(false);
          }
        },
        (error) => {
          setIsFetching(false);
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
        <button className="allow-btn" onClick={handleAllowAccess} disabled={isFetching}>
          {isFetching ? "Fetching..." : "Allow Location Access"}
        </button>
        <button className="manual-btn" onClick={() => navigate('/ManualLocation', { state: { ...location.state } })}>
          Enter Location Manually
        </button>
      </div>

      {/* Progress Footer */}
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