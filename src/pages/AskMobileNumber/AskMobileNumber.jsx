import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./AskMobileNumber.css";

import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axiosInstance from "../../api/axiosInstance";

const AskMobileNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ✅ Start with 91
  const [mobile, setMobile] = useState("91");

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

  

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("✅ Recaptcha verified");
        },
        "expired-callback": () => {
          console.log("⚠️ Recaptcha expired");
        },
      },
    );
  };

  // 🔥 Send OTP
  const sendOTP = async (phoneNumber) => {
    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier,
      );

      window.confirmationResult = confirmationResult;

      console.log("✅ OTP sent successfully");
      return true;
    } catch (error) {
      console.error("❌ OTP error:", error);
      return false;
    }
  };

  // ✅ Handle input (keep starting 91)
  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    // Always ensure it starts with 91
    if (!value.startsWith("91")) {
      value = "91";
    }

    // Limit length (91 + 10 digits)
    value = value.slice(0, 13);

    // Format: 91 98765 43210
    let formatted = value;

    if (value.length > 2) {
      formatted = value.slice(0, 2) + " " + value.slice(2);
    }

    if (value.length > 7) {
      formatted =
        value.slice(0, 2) + " " + value.slice(2, 7) + " " + value.slice(7);
    }

    setMobile(formatted);
  };


  const checkUserExists = async (phoneNumber) => {
    try {
      const res = await axiosInstance.post("/user/login-phoneNumber", { phoneNumber });
  
      const data = await res.data
      console.log("✅ User exists check:", data);
      return data.exists;
    } catch (err) {
      console.error("❌ Error checking user:", err);
      return false;
    }
  };

  const handleNext = async () => {
    if (mobile.length === 14) {
      setLoading(true);
      const phoneNumber = `+${mobile}`;
      // ✅ 1. Check DB first
      const userExists = await checkUserExists(phoneNumber);

      if (userExists) {
        alert("this mobile number is already registered");
        setLoading(false);
        return;
      }

      const success = await sendOTP(phoneNumber);

      if (!success) return;

      navigate("/Otp", {
        state: {
          ...location.state,
          mobile: mobile,
        },
      });
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="mobile-screen-container">
        <div id="recaptcha-container"></div>

        <div className="mobile-header-section">
          <OnboardingHeader
            title="What's your number?"
            description="We'll send a code to verify it."
          />
        </div>

        <div className="mobile-body-content">
          <div className="mobile-input-box slide-up">
            {/* <input
              type="tel"
              inputMode="numeric"
              className="custom-mobile-field"
              placeholder="99999 99999"
              value={mobile}
              onChange={handleChange}
              autoFocus
              maxLength={12}
            /> */}
            <input
              type="tel"
              inputMode="numeric"
              className="custom-mobile-field"
              placeholder="99999 99999"
              value={mobile}
              onChange={handleChange}
              autoFocus
              maxLength={14}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mobile-footer-action">
          <div className="footer-wavy-decoration"></div>

          <StepProgressButton
            currentStep={3}
            totalSteps={20}
            disabled={mobile.length !== 14 || loading === true}
            onClick={handleNext}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default AskMobileNumber;
