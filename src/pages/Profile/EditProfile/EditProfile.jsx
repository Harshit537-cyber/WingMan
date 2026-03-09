import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Plus, MapPin, ChevronLeft } from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./EditProfile.css";
import { useUser } from "../../../context/userinfo";
// Dummy Image (Replace with your actual asset path)
import userImg from "../../../assets/profile-user.png";
import axiosInstance from "../../../api/axiosInstance";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
   console.log(name, location)
  const [interest, setInterest] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [about, setAbout] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setOccupation(user?.career_info);
      setLocation(user?.location?.address);
      setInterest(user?.interest);
      setPhoto(user?.photos);
      setAbout(user?.preferences);
    }
   
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const uploadUserImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilephoto", file);

    try {
      const res = await axiosInstance.post(
        `/user-profile-image/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(res.data);
      if (res.data.success == true) {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    if (typeof value === "object" && value !== null) {
      return `${value.min} - ${value.max}`;
    }

    return value;
  };

  return (
    <AppLayout>
      <div className="ep-screen-wrapper">
        {/* TOP STATUS BAR SPACE */}
        <div className="ep-status-bar-mock"></div>

        <div className="ep-scroll-view">
          {/* --- PROFILE HEADER --- */}
          <div className="ep-header">
            <div className="ep-avatar-box">
              <img
                src={
                  preview ||
                  user?.profilephoto ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt="user"
                className="ep-main-i"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/150?img=12";
                }}
              />

              <div
                className="ep-camera-btn"
                onClick={() => fileInputRef.current.click()}
              >
                <Camera size={22} color="white" fill="currentColor" />
              </div>
            </div>
            {preview && (
              <button
                onClick={uploadUserImage}
                className="ep-change-photo-text"
              >
                {success ? "Uploaded Successfully" : "Upload Image"}
              </button>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
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
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="ep-dist-tag">1km</div>
              </div>
            </div>

            <div className="ep-divider"></div>

            {/* About Me Section inside the same card */}
            <div className="ep-section-header">About me</div>
            <div className="ep-tags-grid">
              {Object.entries(about).map(([key, value]) => (
                <div key={key} className="ep-tag-chip">
                  <span key={key} className="tag">
                    {key}: {formatValue(value)}
                    {/* {formatValue(value)} */}
                  </span>
                </div>
              ))}
              <div className="ep-add-tag-circle">
                <Plus size={18} color="#D1BBD8" strokeWidth={3} />
              </div>
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
              {photo.map((value, i) => (
                <div key={i} className="ep-photo-slot">
                  <img src={value} alt="slot" />
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
