import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "../../components/AppLayout/AppLayout";
import "./Login.css";
import axiosInstance from "../../api/axiosInstance";

import { useUser } from "../../context/userinfo";
import { useRecommendedProfiles} from '../../context/userprofileRecomm'
import {useCallRequests} from '../../context/callanddate'
const LoginPage = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useUser();
  const {fetchRecommendedProfiles} = useRecommendedProfiles()
  const {fetchCallRequests} = useCallRequests()


  const [formData, setFormData] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/user/login", {
        email: formData.email,
      });

      if (res.data.success) {
        const loggedInUser = res.data.user;

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        fetchUser();
        fetchRecommendedProfiles();
        fetchCallRequests()

        if (isProfileComplete(loggedInUser)) {
          navigate("/home");
        } else {
          navigate("/uploads");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="login-container">
        <img src="https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg?semt=ais_rp_progressive&w=740&q=80" alt="" />
        <h1 className="login-title">Welcome Back</h1>
        <h3 className="text-[#2D1B31] mb-10">Login to access more </h3>

        <form className="login-form" onSubmit={handleLogin}>
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
        </form>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
