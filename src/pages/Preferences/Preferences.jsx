import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import { savePreferences } from "../../api/onboarding.api"; // ✅ Import API
import "./Preferences.css";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useUser } from '../../context/userinfo'
const Preferences = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const location = useLocation();
  const photos = location.state?.photos || {};
  const userId = location?.state?.userId
  const { fetchUser } = useUser();
  console.log(location.state?.photos)


  // States for Sliders
  const [ageRange, setAgeRange] = useState({ min: 18, max: 50 });
  const [heightRange, setHeightRange] = useState({ min: 4, max: 6 });

  // States for Dropdowns
  const [religion, setReligion] = useState("Hindu");
  const [ethnicity, setEthnicity] = useState("Tamil Nadu");
  const [language, setLanguage] = useState("Hindi");

  const handleContinue = async () => {
    setLoading(true);
    localStorage.setItem('userId', userId);

    try {
      const heightMinCm = Math.round(heightRange.min * 30.48);
      const heightMaxCm = Math.round(heightRange.max * 30.48);

      const formData = new FormData();

      const existingPhotos = [];
      const newPhotos = [];

      Object.values(photos).forEach((item) => {
        if (item instanceof File) {
          newPhotos.push(item);
        } else if (typeof item === "string") {
          existingPhotos.push(item);
        }
      });

      newPhotos.forEach((file) => {
        formData.append("photos", file);
      });

      formData.append("existingPhotos", JSON.stringify(existingPhotos));

      const preferences = {
        age: {
          min: ageRange.min,
          max: ageRange.max,
        },
        height: {
          min: heightMinCm,
          max: heightMaxCm,
        },
        religion,
        ethnicity,
        spoken_language: [language],
      };

      formData.append("preferences", JSON.stringify(preferences));

      // ✅ ONLY this API now
      await axiosInstance.post(
        `/uploadPhotosAndPreferences/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchUser();
      navigate("/sharingSuccess");

    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Logic for Slider UI positioning
  const ageMinPercent = ((ageRange.min - 18) / (60 - 18)) * 100;
  const ageMaxPercent = ((ageRange.max - 18) / (60 - 18)) * 100;

  const heightMin = 4;
  const heightMax = 8;

  const heightMinPercent =
    ((heightRange.min - heightMin) / (heightMax - heightMin)) * 100;

  const heightMaxPercent =
    ((heightRange.max - heightMin) / (heightMax - heightMin)) * 100;

  return (
    <AppLayout>
      <div className="pref-screen-container">
        <div className="native-header-section">
          <OnboardingHeader
            title="What's your preferences?"
            description="Help us find the best match for you."
          />
        </div>

        <div className="pref-body-content">
          <div className="fields-stack">
            <div className="slider-group">
              <div className="pref-label-row">
                <label className="pref-field-label">Age</label>
                <span className="pref-value-display">
                  {ageRange.min} - {ageRange.max} yrs
                </span>
              </div>

              <div className="dual-slider-wrapper">
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={ageRange.min}
                  onChange={(e) =>
                    setAgeRange({
                      ...ageRange,
                      min: Math.min(parseInt(e.target.value), ageRange.max - 1),
                    })
                  }
                  className="thumb"
                />

                <input
                  type="range"
                  min="18"
                  max="60"
                  value={ageRange.max}
                  onChange={(e) =>
                    setAgeRange({
                      ...ageRange,
                      max: Math.max(parseInt(e.target.value), ageRange.min + 1),
                    })
                  }
                  className="thumb"
                />

                <div className="slider-track-bg"></div>

                <div
                  className="slider-track-fill"
                  style={{
                    left: `${ageMinPercent}%`,
                    right: `${100 - ageMaxPercent}%`,
                  }}
                ></div>

                <div
                  className="range-circle"
                  style={{ left: `${ageMinPercent}%` }}
                >
                  {ageRange.min}
                </div>

                <div
                  className="range-circle"
                  style={{ left: `${ageMaxPercent}%` }}
                >
                  {ageRange.max}
                </div>
              </div>
            </div>

            <div className="slider-group">
              <div className="pref-label-row">
                <label className="pref-field-label">Height</label>
                <span className="pref-value-display">
                  {heightRange.min} - {heightRange.max} ft
                </span>
              </div>

              <div className="dual-slider-wrapper">
                <input
                  type="range"
                  min="4"
                  max="8"
                  step="0.1"
                  value={heightRange.min}
                  onChange={(e) =>
                    setHeightRange({
                      ...heightRange,
                      min: Math.min(
                        parseFloat(e.target.value),
                        heightRange.max - 0.1,
                      ),
                    })
                  }
                  className="thumb"
                />

                <input
                  type="range"
                  min="4"
                  max="8"
                  step="0.1"
                  value={heightRange.max}
                  onChange={(e) =>
                    setHeightRange({
                      ...heightRange,
                      max: Math.max(
                        parseFloat(e.target.value),
                        heightRange.min + 0.1,
                      ),
                    })
                  }
                  className="thumb"
                />

                <div className="slider-track-bg"></div>

                <div
                  className="slider-track-fill"
                  style={{
                    left: `${heightMinPercent}%`,
                    right: `${100 - heightMaxPercent}%`,
                  }}
                ></div>

                <div
                  className="range-circle"
                  style={{ left: `${heightMinPercent}%` }}
                >
                  {heightRange.min}
                </div>

                <div
                  className="range-circle"
                  style={{ left: `${heightMaxPercent}%` }}
                >
                  {heightRange.max}
                </div>
              </div>
            </div>

            <div className="pref-dropdown-item">
              <label className="pref-field-label">Religion</label>
              <div className="pref-select-box">
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                >
                  <option value="Hinduism">Hinduism</option>
                  <option value="Islam">Islam</option>
                  <option value="Sikhism">Sikhism</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Jainism">Jainism</option>
                  <option value="Buddhism">Buddhism</option>
                  <option value="Judaism">Judaism</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <span className="pref-arrow">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5D326F"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="pref-dropdown-item">
              <label className="pref-field-label">Ethnicity</label>
              <div className="pref-select-box">
                <select
                  value={ethnicity}
                  onChange={(e) => setEthnicity(e.target.value)}
                >
                  <option value="">Select State</option>

                  <option>Andhra Pradesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Goa</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>West Bengal</option>
                </select>
                <span className="pref-arrow">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5D326F"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>

            <div className="pref-dropdown-item">
              <label className="pref-field-label">Language Spoken</label>
              <div className="pref-select-box">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="">Select Language</option>

                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Marathi</option>
                  <option>Gujarati</option>
                  <option>Punjabi</option>
                  <option>Bengali</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                  <option>Odia</option>
                  <option>Assamese</option>
                  <option>Urdu</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
                <span className="pref-arrow">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5D326F"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pref-footer-action">
          <button
            onClick={handleContinue}
            className="pref-continue-btn"
            disabled={loading} // ✅ Disable while saving
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Preferences;
