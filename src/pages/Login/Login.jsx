import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "../../components/AppLayout/AppLayout";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";
import axiosInstance from "../../api/axiosInstance";
import { loginWithGoogle } from '../../firebase.js'
import { useUser } from "../../context/userinfo";
import { useRecommendedProfiles } from "../../context/userprofileRecomm";
import { useCallRequests } from "../../context/callanddate";
import { auth } from "../../firebase.js";
import {  getFCMToken } from '../../firebase.js'
const LoginPage = () => {

  const navigate = useNavigate();
  const { user, fetchUser } = useUser();
  const { fetchRecommendedProfiles } = useRecommendedProfiles();
  const { fetchCallRequests } = useCallRequests();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const isProfileComplete = (user) => {
    if (!user) return false;

    // ✅ photo check
    const hasPhoto = user.photos && user.photos.length > 0;

    const prefs = user.preferences || {};

    let filledCount = 0;

    if (prefs.age?.min && prefs.age?.max) filledCount++;
    if (prefs.height?.min && prefs.height?.max) filledCount++;
    if (prefs.religion) filledCount++;
    if (prefs.ethnicity) filledCount++;
    if (prefs.spoken_language?.length > 0) filledCount++;
    const hasEnoughPreferences = filledCount >= 3;

    return hasPhoto && hasEnoughPreferences;
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await axiosInstance.post("/user/login", {
  //       email: formData.email,
  //     });

  //     if (res.data.success) {
  //       const loggedInUser = res.data.user;

  //       localStorage.setItem("token", res.data.token);
  //       localStorage.setItem("user", JSON.stringify(loggedInUser));

  //       fetchUser();
  //       fetchRecommendedProfiles();
  //       fetchCallRequests();

  //       if (isProfileComplete(loggedInUser)) {
  //         navigate("/home");
  //       } else {
  //         navigate("/uploads");
  //       }
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleGoogleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const email = user.email;

    let res;

    try {
      // 🔐 Backend login
      res = await axiosInstance.post("/user/login", { email });
    } catch (err) {
      // ✅ HANDLE 401 HERE
      if (err.response?.status === 401) {
        alert("User not registered. Please sign up first.");
        navigate('/')
        await auth.signOut();
        return;
      } else {
        throw err;
      }
    }

    const loggedInUser = res.data.user;

    // ✅ Save auth data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("userId", loggedInUser._id);

    // 🔥 FCM TOKEN
    try {
      const fcmToken = await getFCMToken();

      if (fcmToken) {
        const oldToken = localStorage.getItem("fcmToken");

        if (oldToken !== fcmToken) {
          await axiosInstance.put(
            `/update-fcm-token/${loggedInUser._id}`,
            { fcmToken }
          );

          localStorage.setItem("fcmToken", fcmToken);
        }
      }
    } catch (err) {
      console.log("❌ FCM Error:", err.message);
    }

    // ✅ Save email
    if (user.email) {
      localStorage.setItem("email", user.email);
    }

    // ✅ Load data
    await fetchUser();
    await fetchRecommendedProfiles();
    await fetchCallRequests();

    // ✅ Navigation
    if (isProfileComplete(loggedInUser)) {
      navigate("/home");
    } else {
      navigate("/uploads");
    }

  } catch (error) {
    console.error("❌ Google Login Error:", error);
    alert("Something went wrong during login");
  } finally {
    setLoading(false);
  }
};

const handleMobileLogin = async (e)=>{
 navigate('/login-AskMobileNumber');

}
  return (
    <AppLayout>
      <div className="login-container">
        <img
          src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?semt=ais_rp_progressive&w=740&q=80"
          alt=""
        />
        <h1 className="login-title">Welcome Back</h1>
        <h3 className="text-[#2D1B31] mb-10">Login to access more </h3>

        {/* <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? <span className="loader"></span> : "Login"}
          </button>
        </form> */}

        <div className=" mx-auto ">
         
          <div className="button-box fade-in-up ">
            <button
              className="google-login-btn px-4"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                "Continue with Google"
              )}
            </button>
          </div>

         
          <div className="divider fade-in-up-delay">
            <span>OR</span>
          </div>

          
          <div className="button-box fade-in-up-delay ">
            <button className="Mobile-login-btn" onClick={handleMobileLogin}>
              Continue with Mobile Number
            </button>
          </div>
        </div>
        <p className="mx-auto pt-3">
          Don't have an account?{" "}
          <span
            className="text-[#5a2761] underline"
            onClick={() => navigate("/")}
          >
            Sign up
          </span>
        </p>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
