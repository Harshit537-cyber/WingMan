import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  Phone,
  Globe,
  PersonStanding,
  Moon,
  Wine,
  Cigarette,
  Languages,
  Accessibility,
  Film,
  Coffee,
  X,
  PhoneCall,
} from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import axiosInstance from "../../../api/axiosInstance";
import "./ProfileDetail.css";
import { useUser } from "../../../context/userinfo";

const ProfileDetail = () => {
  const { callrequest, fetchUser, requestedDateSend } = useUser();

  const location = useLocation();
  const [userdata, setUserdata] = useState(null);
  const profile = location.state?.profile  || userdata;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showCallModal, setShowCallModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // State for heart fill
  const request = callrequest?.find(
    (value) => value.receiverId?.toString() === profile?._id?.toString(),
  );

  const user = JSON.parse(localStorage.getItem("user"));

  const isRequestSend = requestedDateSend.some(
    (value) => value.receiverId?.toString() === user._id?.toString(),
  );
  console.log('profile : ', profile)

  useEffect(() => {
    const profilecallId = location?.state?.receverId;

    if (profilecallId) {
      const fetchData = async () => {
        try {
          setLoading(true); // START LOADING

          const res = await axiosInstance.get(
            `/user-profile-for-notify/${profilecallId}`,
          );

          setUserdata(res.data.data);
        } catch (err) {
          console.error("Error fetching user:", err);
        } finally {
          setLoading(false); // STOP LOADING
        }
      };

      fetchData();
    }
  }, [location?.state?.receverId]);

  const buttonText = !request
    ? "Send Call Request"
    : request.status === "accepted"
      ? isRequestSend
        ? "Date Request Submitted"
        : "Send Date Request"
      : "Call Request Submitted";

  const disabled = request && request.status !== "accepted";

  // Background scroll lock logic
  useEffect(() => {
    if (showCallModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showCallModal]);

  const openModal = () => setShowCallModal(true);
  const closeModal = () => setShowCallModal(false);
  const handleGalleryClick = () => navigate("/gallery");
  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleSendRequest = async () => {
    // closeModal();
    // navigate("/date-preferences", {
    //   state: { receiverId: profile?._id },
    // });
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("User not found. Please login again.");
        return;
      }
      const payload = {
        senderId: user._id,
        receiverId: profile?._id,
        requestType: "call request",
      };
      const res = await axiosInstance.post("/call-request/create", payload);

      closeModal();
      fetchUser();
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

  if (loading || !profile) {
    return (
      <AppLayout>
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

 
  return (
    <AppLayout>
      <div className="detail-main-container">
        {/* Everything inside this div will scroll together */}
        <div
          className={`detail-scroll-area ${showCallModal ? "blur-content" : ""}`}
        >
          {/* HERO SECTION - Now inside scroll area */}
          <div className="hero-section">
            {/* <img src={profileHero} alt="Jessica" className="hero-img animate-zoom" /> */}
            <img
              src={
                profile?.profilephoto ||
                "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
              }
              alt="user"
              className="hero-img animate-zoom"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/150?img=12";
              }}
            />
            <button
              className="top-back-btn pop-in"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={24} color="#5a3c6d" />
            </button>

            {/* Heart Icon with Toggle Logic */}
            <button
              className="top-fav-heart pop-in-delay"
              onClick={toggleFavorite}
            >
              <Heart
                size={28}
                color={isFavorite ? "rgb(90, 60, 109)" : "#fff"}
                fill={isFavorite ? "rgb(90, 60, 109)" : "none"}
                className={isFavorite ? "heart-pop" : ""}
              />
            </button>

            <div className="hero-compat-badge slide-right">90% Compatible</div>
          </div>

          <div className="detail-content-padding">
            {/* INTRO SECTION */}
            <div className="profile-intro-row slide-up staggered-1">
              <div className="intro-text">
                <h1 className="user-name-age">{profile?.name}</h1>
                <p className="user-profession">{profile?.story}</p>
              </div>

              <>
                {request && request.status === "accepted" && (
                  <button
                    className="call-action-square"
                    onClick={() =>
                      navigate("/call", {
                        state: {
                          isCaller: true, // 👈 important
                          userId:profile?._id
                        },
                      })
                    }
                  >
                    <Phone size={24} color="#5a3c6d" fill="#5a3c6d" />
                  </button>
                )}
              </>
            </div>

            {/* LOCATION */}
            <div className="info-block slide-up staggered-2">
              <div className="block-header">
                <h3 className="block-title">Location</h3>
                <span className="dist-badge">1 km</span>
              </div>
              <p className="block-desc">{profile?.state || "Bihar"}</p>
            </div>

            {/* ABOUT ME */}
            <div className="info-block slide-up staggered-3">
              <h3 className="block-title">About me</h3>
              <div className="chips-grid">
                {Object?.entries(profile?.preferences || {}).map(
                  ([key, value]) => (
                    <div key={key} className="ep-tag-chip">
                      <span key={key} className="tag">
                        {key}: {formatValue(value)}
                        {/* {formatValue(value)} */}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* STORY */}
            <div className="info-block slide-up staggered-4">
              <h3 className="block-title">My Story</h3>
              <p className="story-text">
                {profile?.story}
                <span className="read-more">Read more</span>
              </p>
            </div>

            {/* INTERESTS */}
            <div className="info-block slide-up staggered-5">
              <h3 className="block-title">Interests</h3>
              <div className="chips-grid">
                <div className="interest-chip">
                  <Accessibility size={16} color="#f1c40f" /> Yoga
                </div>
                <div className="interest-chip">
                  <Film size={16} /> Film lover
                </div>
                <div className="interest-chip">
                  <Coffee size={16} color="#d35400" /> Matcha
                </div>
              </div>
            </div>

            {/* GALLERY */}
            <div className="gallery-section slide-up staggered-6">
              <div className="block-header">
                <h3 className="block-title">Gallery</h3>

                {profile?.photos?.length > 0 && (
                  <span className="see-all" onClick={handleGalleryClick}>
                    See all
                  </span>
                )}
              </div>

              <div className="gallery-grid">
                <div className="gal-big clickable">
                  {profile?.photos?.length > 0 ? (
                    profile.photos.map((value, i) => (
                      <div key={i} className="ep-photo-slot">
                        <img src={value} alt="slot" />
                      </div>
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </div>
              </div>
            </div>

            {/* REQUEST BUTTON */}
            <div className="request-btn-container slide-up staggered-7">
              <button
                className="request-btn"
                disabled={disabled || isRequestSend}
                onClick={
                  buttonText === "Send Date Request"
                    ? () =>
                        navigate("/date-preferences", {
                          state: { receiverId: profile?._id },
                        })
                    : openModal
                }
              >
                {buttonText}
              </button>
            </div>

            <div className="footer-spacer"></div>
          </div>
        </div>

        <BottomNav />

        {/* MODAL SECTION */}
        {showCallModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content slide-up-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close-x" onClick={closeModal}>
                <X size={24} color="#5a3c6d" />
              </button>
              <div className="modal-inner">
                <div className="call-icon-illustration animate-pulse-slow">
                  <PhoneCall size={60} color="#4A90E2" strokeWidth={1.5} />
                </div>
                <h2 className="modal-title">Request for a call</h2>
                <p className="modal-subtitle">
                  For safety reasons we suggest not to share personal
                  information too early. Don't rush trust.
                </p>
                <button
                  className="modal-primary-btn"
                  onClick={handleSendRequest}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ProfileDetail;
