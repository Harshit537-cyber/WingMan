import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "./LandingPage.css";
import datingImg from "../../assets/image.svg";
import AppLayout from "../../components/AppLayout/AppLayout";
import { getFCMToken } from "../../firebase";
import { saveFCMTokenAPI } from "../../api/notificationApi"; // 👈 Naya Import

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleLogin = async () => {
    setLoading(true);

    try {
      // 🔐 Google Login
      const user = await signInWithGoogle();

      if (!user) {
        setLoading(false);
        return;
      }



      // userId save
      localStorage.setItem("userId", user.uid);

      // 🔥 FCM token
      const fcmToken = await getFCMToken();

      if (fcmToken) {
        localStorage.setItem("fcmToken", fcmToken);

        try {
          await saveFCMTokenAPI(user.uid, fcmToken);
         
        } catch {
          console.log("❌ Token save failed");
        }
      }

      if (user.email) {
        localStorage.setItem("email", user.email);
      }

      // redirect
      navigate("/AskMobileNumber", {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="landing-container">
        <div className="illustration-box fade-in-down">
          <img src={datingImg} alt="Dating" className="illustration-img" />
        </div>

        <div className="text-box fade-in-up">
          <h1 className="landing-title">
            Ready to stop <br />
            <span>swiping and start</span> <br />
            dating with intent?
          </h1>
        </div>

        <div className="button-box fade-in-up-delay">
          <button
            className="google-login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <span className="loader"></span> : "Continue to Google"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
