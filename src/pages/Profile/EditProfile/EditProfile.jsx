import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Plus, MapPin, ChevronLeft } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./EditProfile.css";
import { useUser } from "../../../context/userinfo";
// Dummy Image (Replace with your actual asset path)
import userImg from "../../../assets/profile-user.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState([]);
 

  useEffect(() => {
    if (user) {
      setName(user.name);
      setOccupation(user?.career_info);
      setLocation(user?.location?.address);
      setInterest(user?.interest);
    }
  }, [user]);

  return (
    <AppLayout>
      <div className="ep-screen-wrapper">
        {/* TOP STATUS BAR SPACE */}
        <div className="ep-status-bar-mock"></div>

        <div className="ep-scroll-view">
          {/* --- PROFILE HEADER --- */}
          <div className="ep-header">
            <div className="ep-avatar-box">
              <img src={userImg} alt="user" className="ep-main-img" />
              <div className="ep-camera-btn">
                <Camera size={22} color="white" fill="currentColor" />
              </div>
            </div>
            <button className="ep-change-photo-text">
              Change Profile Photo
            </button>
          </div>

          {/* --- MAIN INFO CARD --- */}
          <div className="ep-main-card">
            <div className="ep-field-row">
              <div className="ep-label-box">Name</div>
              <div className="ep-input-box">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="ep-age-val">23</span>
              </div>
            </div>

            <div className="ep-field-row">
              <div className="ep-label-box">Occupation</div>
              <div className="ep-input-box">
                <input type="text" defaultValue="Software Devloper" />
              </div>
            </div>

            <div className="ep-field-row">
              <div className="ep-label-box">Location</div>
              <div className="ep-input-box">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="ep-dist-tag">1km</div>
              </div>
            </div>

            <div className="ep-divider"></div>

            {/* About Me Section inside the same card */}
            <div className="ep-section-header">About me</div>
            <div className="ep-tags-grid">
              <div className="ep-tag-chip">🌍 Bengaluru, India</div>
              <div className="ep-tag-chip">Regularly 🏃‍♂️</div>
              <div className="ep-tag-chip">Hindu</div>
              <div className="ep-add-tag-circle">
                <Plus size={18} color="#D1BBD8" strokeWidth={3} />
              </div>
              <div className="ep-tag-chip">ocasionally 🍷</div>
              <div className="ep-tag-chip">Rarely 🚬</div>
            </div>
          </div>

          {/* --- INTERESTS CARD --- */}
          <div className="ep-main-card">
            <div className="ep-section-header">Interests</div>
            <div className="ep-tags-grid">
              {user?.interest?.map((item, index) => (
                <div key={index} className="ep-tag-chip">
                  {item}
                </div>
              ))}

              <div className="ep-add-tag-circle">
                <Plus size={18} color="#D1BBD8" strokeWidth={3} />
              </div>
            </div>
            <div className="ep-add-interest-btn">
              <Plus size={16} /> ADD Interest
            </div>
          </div>

          {/* --- PHOTO GRID CARD --- */}
          <div className="ep-main-card ep-photo-card">
            <div className="ep-photo-grid">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="ep-photo-slot">
                  <img src={userImg} alt="slot" />
                </div>
              ))}
              <div className="ep-photo-slot ep-add-slot">
                <Plus size={32} color="#5D326F" strokeWidth={2.5} />
                <span>Add Photo</span>
              </div>
            </div>
          </div>

          {/* --- UPDATE BUTTON --- */}
          <div className="ep-action-container">
            <button className="ep-update-btn">Update Profile</button>
          </div>

          <div className="ep-bottom-padding"></div>
        </div>

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default EditProfile;
