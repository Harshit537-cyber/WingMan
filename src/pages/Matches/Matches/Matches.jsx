import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from './util'
import {
  ChevronLeft,
  Bell,
  AlignRight,
  Heart,
  MapPin,
  Phone,
  Target,
  EllipsisVertical,
} from "lucide-react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import matchImg from "../../../assets/match-profile.jpg";
import "./Matches.css";
import { useRecommendedProfiles } from "../../../context/userprofileRecomm";
import { useUser } from "../../../context/userinfo";



const CallButton = ({ profile, callrequest }) => {
  const navigate = useNavigate();

  const request = callrequest?.find(
    (value) =>
      value.receiverId?.toString() ===
      profile?.userInfo?._id?.toString() ||
      value.senderId?.toString() ===
      profile?.userInfo?._id?.toString()
  );

  if (request?.status !== "accepted") return null;

  return (
    <button
      className="call-action-square"
      onClick={() =>
        navigate("/call", {
          state: {
            isCaller: true,
            userId: profile?.userInfo?._id,
          },
        })
      }
    >
      <Phone size={24} color="#5a3c6d" fill="#5a3c6d" />
    </button>
  );
};

const Matches = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCallPopup, setShowCallPopup] = useState(false);
  const { profiles, fetchRecommendedProfiles, quizComplete } =
    useRecommendedProfiles();

  const { callrequest, profileStatus } = useUser();


  // const profilesWithCall = profiles.map((profile) => {
  //   // const request = callrequest?.find(
  //   //   (value) =>
  //   //     value.receiverId?.toString() === profile?._id?.toString() &&
  //   //     value.status === "accepted",
  //   // );


  //   return {
  //     ...profile,
  //     call: !!request,
  //   };
  // });

 
  const request = callrequest?.find(
    (value) =>
      value.receiverId?.toString() === profiles?.userInfo?._id?.toString() ||
      value.senderId?.toString() === profiles?.userInfo?._id?.toString()
  );
 


  const [favorites, setFavorites] = useState({});
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    fetchRecommendedProfiles();
  }, []);

  // const profiles = [
  //   { id: 1, name: "Nikita", age: 28, city: "California", compat: "90%" },
  //   { id: 2, name: "Nikita", age: 28, city: "California", compat: "90%" },
  //   { id: 3, name: "Nikita", age: 28, city: "California", compat: "90%" },
  //   { id: 4, name: "Nikita", age: 28, city: "California", compat: "90%" },
  //   { id: 5, name: "Nikita", age: 28, city: "California", compat: "90%" },
  // ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardFullWidth = 315; // card width (300) + gap (15)
      const index = Math.round(scrollLeft / cardFullWidth);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  return (
    <AppLayout>
      <div className="matches-main-container">
        {/* DOTS PAGINATION */}
        <div className="pagination-dots-wrap">
          {profiles.map((_, idx) => (
            <span
              key={idx}
              className={`dot-item ${activeIndex === idx ? "dot-active" : ""}`}
            ></span>
          ))}
        </div>

        {/* HEADER */}
        <header className="matches-header-nav">
          <button className="back-btn-match" onClick={() => navigate(-1)}>
            <ChevronLeft size={28} color="#5a3c6d" />
          </button>
          <div className="title-stack">
            <h1 className="main-match-title">Matches</h1>
            <p className="sub-match-title">
              Request a call and see where things go
            </p>
          </div>
          <div className="header-icons">
            <div
              className="bell-box"
              onClick={() => navigate("/request")}
              style={{ cursor: "pointer" }}
            >
              <Bell size={26} color="#5a3c6d" />
              <span className="dot"></span>
            </div>
            <button className="menu-btn" onClick={() => navigate("/settings")}>
              <AlignRight size={28} color="#5a3c6d" />
            </button>
          </div>
        </header>

        <div className="matches-body-content slide-up">
          <div className="heading-group ">
            <h2 className="title-day">Your profiles for the day</h2>
            <div className="note-row">
              <Target size={16} color="#1a1a1a" />
              <p>Favourites will stay while new matches roll in</p>
            </div>
          </div>

          {/* HORIZONTAL CAROUSEL */}
          <div
            className="cards-carousel-container "
            ref={scrollRef}
            onScroll={handleScroll}
          >
            {
              (profiles?.length > 0 ? (
                <>
                  {
                    profiles.slice(0, 5)?.map((profile, index) => {
                      // Center card stays straight, side cards tilt away
                      let rotateValue = 0;
                      let scaleValue = 1;
                      if (index < activeIndex) {
                        rotateValue = 6.75;
                        scaleValue = 0.9;
                      } else if (index > activeIndex) {
                        rotateValue = -6.75;
                        scaleValue = 0.9;
                      }

                      return (
                        <div
                          key={profile.id}
                          className="card-anchor"
                          onClick={() => {
                            if (profileStatus === "verified") {
                              navigate("/matches/profile-details", {
                                state: {
                                  profile: profile?.userInfo || profile,
                                  profilescore:
                                    profile?.score || profile?.matchCount * 10,
                                },
                              });
                            } else {
                              alert("Please wait for your profile to be verified");
                            }
                          }}
                          style={{
                            transform: `rotate(${rotateValue}deg) scale(${scaleValue})`,
                            zIndex: activeIndex === index ? 10 : 1,
                          }}
                        >
                          <div className="actual-match-card">
                            {/* <img
                      src={matchImg}
                      alt={profile.name}
                      className="match-img-bg"
                    /> */}
                            <img
                              src={
                                profile?.userInfo?.profilephoto || profile?.profilephoto ||
                                "https://i.pravatar.cc/150?img=12"
                              }
                              alt="profile"
                              className="match-img-bg"
                              onError={(e) => {
                                e.target.src =
                                  "https://i.pravatar.cc/150?img=12";
                              }}
                            />

                            <div className="card-top-ui">
                              <div className="match-badge">
                                {profile?.score || profile?.matchCount * 10}% Compatible
                              </div>
                              <button
                                className="heart-icon-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(profile.id);
                                }}
                              >
                                {/* <Heart
                                  size={24}
                                  strokeWidth={2.5}
                                  color={
                                    favorites[profile.id] ? "#612E70" : "#fff"
                                  }
                                  fill={
                                    favorites[profile.id] ? "#612E70" : "none"
                                  }
                                /> */}
                              </button>
                            </div>

                            <div className="card-bottom-ui">
                              <div className="info-wrap">
                                <h3 className="name-label">
                                  {profile?.userInfo?.name || profile?.name}, {calculateAge(profile?.userInfo?.DOB || profile?.DOB)} yr
                                </h3>
                                <div className="loc-wrap">
                                  <MapPin size={16} fill="#fff" color="#fff" />
                                  <span>{profile?.userInfo?.state || profile?.state}</span>
                                </div>
                              </div>

                              {/* {profile.call && (
                                <>
                                  <button
                                    className="call-btn-fixed"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowCallPopup(true);
                                    }}
                                  >
                                    <Phone
                                      size={22}
                                      fill="#5a3c6d"
                                      color="#5a3c6d"
                                    />
                                  </button>
                                </>
                              )} */}
                              <>
                                <CallButton
                                  profile={profile}
                                  callrequest={callrequest}
                                />
                              </>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  }
                </>
              ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  No profile to recommend. Please wait some time.
                </p>
              ))}

            {/* {!quizComplete && (
              <div className="flex my-auto -ml-3 justify-center w-full  pl-8 items-center mt-6">
                <div className="  rounded-2xl p-3 text-center max-w-xl w-full ">
                  <h2 className="text-lg font-semibold text-gray-800 mb-0.5">
                    Complete Your Quiz
                  </h2>

                  <p className="text-sm text-gray-500 mb-4">
                    Submit the quiz to unlock personalized profile
                    recommendations.
                  </p>

                  <button
                    onClick={() => navigate("/quiz-world")}
                    className="bg-[#5A3C6D] hover:bg-[#5A3C6D] text-white px-5 py-2 rounded-lg transition duration-200"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            )} */}
            <div className="carousel-end-spacer"></div>
          </div>
        </div>

        {showCallPopup && (
          <div
            className="call-popup-overlay"
            onClick={() => setShowCallPopup(false)}
          >
            <div
              className="call-popup-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="popup-close-btn"
                onClick={() => setShowCallPopup(false)}
              >
                ✕
              </button>

              <div className="popup-icon"></div>

              <h2 className="popup-title">Request for a call</h2>

              <p className="popup-desc">
                For safety reasons we suggest not to share personal information
                too early. Don't rush trust.
              </p>

              <button
                className="popup-primary-btn"
                onClick={() => setShowCallPopup(false)}
              >
                Send Request
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Matches;
