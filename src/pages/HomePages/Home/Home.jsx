import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, AlignRight, ShieldAlert } from "lucide-react";
// import axios from 'axios'; // API abhi ke liye band kar rahe hain
import AppLayout from "../../../components/AppLayout/AppLayout";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./Home.css";
import { useUser } from "../../../context/userinfo";
import calculateProfileCompletion from "../../../utils/Homefunc";
const Home = () => {
  const navigate = useNavigate();
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user, loading } = useUser();
  const completion = calculateProfileCompletion(user);

  useEffect(() => {
    // --- TESTING MODE START ---
    // Jab tak backend connect nahi karte, is part ko use karo:

    // Fake User Data set kar rahe hain UI check karne ke liye
    setUserData({
      firstName: `${user?.name}`,
      profileComplete: true,
      isVerified: false, // Isko true karke verify wala UI check kar lena
    });

    setIsQuizSubmitted(false); // Isko change karke quiz status check kar lena

    // --- ORIGINAL CODE (Backend wala) ---
    // Jab backend ready ho jaye, tab upar wala part hata dena aur neeche wala uncomment karna:

    /*
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [quizRes, userRes] = await Promise.all([
          axios.get('https://wingmann.onrender.com/api/quiz/my-quizzes', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://wingmann.onrender.com/api/auth/me', { 
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (quizRes.data.totalAttempted >= 5) {
          setIsQuizSubmitted(true);
        } else {
            setIsQuizSubmitted(false);
        }

        setUserData(userRes.data.user || userRes.data);

      } catch (error) {
        console.error("Dashboard error:", error);
        // if (error.response?.status === 401) navigate('/login');
      }
    };

    fetchDashboardData();
    */
    // --- TESTING MODE END ---
  }, [navigate]);

  return (
    <AppLayout>
      <div className="home-screen-container">
        {/* --- HEADER SECTION --- */}
        <header className="home-header">
          <div className="welcome-text">
            <h1>Good Evening, {userData?.firstName || "User"}</h1>
            <p>Let's find you a date!</p>
          </div>
          <div className="header-icons">
            <div className="bell-box" onClick={() => navigate("/request")}>
              <Bell size={26} color="#5a3c6d" />
              <span className="dot"></span>
            </div>
            <button className="menu-btn" onClick={() => navigate("/settings")}>
              <AlignRight size={28} color="#5a3c6d" />
            </button>
          </div>
        </header>

        <div className="home-scroll-content">
          {/* Dashboard Section */}
          <section className="section-wrapper">
            <h2 className="section-title">Your Dashboard</h2>
            <div className="dashboard-grid">
              <div className="dash-card" onClick={() => navigate("/profile")}>
                <span>Profile</span>

                <h3>{completion}%</h3>

                <div className="progress-container">
                  <div
                    className="progress-bar filled"
                    style={{ width: `${completion}%` }}
                  ></div>
                </div>
              </div>
              <div className="dash-card">
                <span>Compatibility Quiz</span>
                <h3>{isQuizSubmitted ? "100%" : "10%"}</h3>
                <div className="progress-container">
                  <div
                    className={`progress-bar ${isQuizSubmitted ? "filled" : "partial"}`}
                    style={{ width: isQuizSubmitted ? "100%" : "10%" }}
                  ></div>
                </div>
              </div>
            </div>
          </section>

          {/* Verification Section */}
          <section className="section-wrapper">
            <h2 className="section-title">Verification</h2>
            <div className="verification-card">
              <div className="verification-header">
                <ShieldAlert color="#c9a66b" size={32} />
                <div className="v-text">
                  <h4>
                    {userData?.isVerified ? "Verified" : "Verification Pending"}
                  </h4>
                  <p>
                    {userData?.isVerified
                      ? "Wingmate Verified"
                      : "Pending Wingmate Verification"}
                  </p>
                </div>
              </div>
              {!userData?.isVerified && (
                <div className="verification-body">
                  <p className="restricted-title">Restricted access:</p>
                  <ul>
                    <li>Cannot take matches</li>
                    <li>Cannot show matches</li>
                  </ul>
                  <button
                    className="action-purple-btn"
                    onClick={() => navigate("/verify-profile")}
                  >
                    Take Action
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Quiz Section - Only shows if NOT submitted */}
          {!isQuizSubmitted && (
            <section className="section-wrapper">
              <h2 className="section-title">Know Your Type</h2>
              <button
                className="outline-purple-btn"
                onClick={() => navigate("/quiz-world")}
              >
                Take A Quiz
              </button>
            </section>
          )}

          {/* Attracted To Section */}
          <section className="section-wrapper">
            <h2 className="section-title">
              Let Us Know Who You Are Attracted To.
            </h2>
            <button
              className="outline-purple-btn curate-btn"
              onClick={() => navigate("/curate-vibe")}
            >
              Curate Your Vibe
            </button>
          </section>

          <div className="bottom-spacer"></div>
        </div>

        {/* Bottom Nav Included */}
        <BottomNav />
      </div>
    </AppLayout>
  );
};

export default Home;
