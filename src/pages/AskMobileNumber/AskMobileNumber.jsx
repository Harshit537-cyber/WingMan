import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import StepProgressButton from "../../components/StepProgressButton/StepProgressButton";
import "./AskMobileNumber.css";

import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const AskMobileNumber = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state)

  // ✅ Start with 91
  const [mobile, setMobile] = useState("91");

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    console.log("🔧 Creating NEW RecaptchaVerifier");

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
    const value = e.target.value.replace(/\D/g, "");

    // prevent removing 91
    if (!value.startsWith("91")) return;

    if (value.length <= 12) {
      setMobile(value);
    }
  };

  const handleNext = async () => {
    if (mobile.length === 12) {
      const phoneNumber = `+${mobile}`;

      const success = await sendOTP(phoneNumber);

      if (!success) return;

      navigate("/Otp", {
        state: {
          ...location.state,
          mobile: mobile,
        },
      });
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
            <input
              type="tel"
              inputMode="numeric"
              className="custom-mobile-field"
              placeholder="99999 99999"
              value={mobile}
              onChange={handleChange}
              autoFocus
              maxLength={12}
            />
          </div>
        </div>

        <div className="mobile-footer-action">
          <div className="footer-wavy-decoration"></div>

          <StepProgressButton
            currentStep={3}
            totalSteps={20}
            disabled={mobile.length !== 12}
            onClick={handleNext}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default AskMobileNumber;
