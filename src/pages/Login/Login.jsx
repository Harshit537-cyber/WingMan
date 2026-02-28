import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppLayout from "../../components/AppLayout/AppLayout";
import "./Login.css";
import axiosInstance from "../../api/axiosInstance";

import { useUser } from "../../context/userinfo";
const LoginPage = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = useUser();


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
        <h1 className="login-title">Welcome Back</h1>

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
