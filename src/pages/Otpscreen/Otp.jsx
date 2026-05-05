import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
import { ChevronLeft } from "lucide-react";
import { useUser } from "../../context/userinfo";
import { useRecommendedProfiles } from "../../context/userprofileRecomm";
import { useCallRequests } from "../../context/callanddate";
import loginImg from "../../assets/login.png";
import { getFCMToken } from '../../firebase.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState(30);

  const { fetchUser } = useUser();
  const { fetchRecommendedProfiles } = useRecommendedProfiles();
  const { fetchCallRequests } = useCallRequests();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);


  const setupRecaptcha = async () => {
    try {
      // ✅ Clear existing verifier before recreating
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      // ✅ Reset the container so reCAPTCHA can inject fresh DOM
      const container = document.getElementById("recaptcha-container");
      if (container) container.innerHTML = "";

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("✅ Recaptcha solved");
          },
        }
      );

      await window.recaptchaVerifier.render();

      return window.recaptchaVerifier;
    } catch (error) {
      console.log("❌ Recaptcha Setup Error:", error);
    }
  };
  const resendOTP = async () => {
    try {
      const phoneNumber = location.state?.phoneNumber;

      if (!phoneNumber) {
        alert("Phone number missing");
        return;
      }

      const appVerifier = await setupRecaptcha();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmationResult;

      setTimer(30);

      alert("OTP resent successfully");
    } catch (error) {
      console.log("❌ Resend OTP Error:", error);

      alert(error.message);
    }
  };

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      console.log("✅ OTP Verified User:", user);

      if (location?.state?.login === "fromLogin") {
        const res = await axiosInstance.post("/user/login-phoneNumber", {
          phoneNumber: user.phoneNumber
        });

        if (!res.data.success) {
          alert("User not found");
          return;
        }

        const loggedInUser = res.data.user;

        // ✅ Save auth data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("userId", loggedInUser._id);

        // 🔥🔥 ADD THIS BLOCK (FCM TOKEN)
        try {
          const fcmToken = await getFCMToken();

          if (fcmToken) {
            const oldToken = localStorage.getItem("fcmToken");

            // ✅ update only if changed
            if (oldToken !== fcmToken) {
              console.log("📲 Updating FCM Token:", fcmToken);

              await axiosInstance.put(`/update-fcm-token/${loggedInUser._id}`, {
                fcmToken,
              });

              localStorage.setItem("fcmToken", fcmToken);
            }
          }
        } catch (err) {
          console.log("❌ FCM Error:", err.message);
        }

        // ✅ Load data
        await fetchUser();
        await fetchRecommendedProfiles();
        await fetchCallRequests();

        navigate("/home");
      } else {
        const existingData = location.state || {};

        const updatedData = {
          ...existingData,
          phonenumber: user?.phoneNumber,
        };

        navigate("/gender", {
          state: {
            ...location.state,
            ...updatedData,
          },
        });
      }
    } catch (error) {
      // console.error("❌ OTP verify error:", error);

      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AppLayout>
      <div id="recaptcha-container"></div>
      <div className="m-auto" style={{ padding: 20 }}>
        <div className="mobile-header-section pt-2 ">
          <ChevronLeft
            onClick={() => navigate(-1)}
            size={30}
            strokeWidth={2.5}
            className="text-[#523461] absolute mt-2 "
          />
          <img src={loginImg} alt="" className="my-2" />
          {/* <OnboardingHeader title="Enter OTP" description="" /> */}
        </div>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          value={otp}
          className="custom-mobile-field border border-gray-200 mx-5.5"
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          style={{
            padding: 12,
            fontSize: 18,
            width: "90%",
          }}
        />
        <button
          disabled={timer > 0}
          onClick={resendOTP}
          className={`flex justify-center items-center mt-2 mx-5.5 w-[90%] py-1.5 rounded-lg border transition-all duration-200
    ${timer > 0
              ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-[#5B3765] text-white border-[#5B3765] hover:bg-[#4a2c53] cursor-pointer"
            }`}
        >
          {timer > 0
            ? `Resend OTP in ${timer}s`
            : "Resend OTP"}
        </button>

        <button
          onClick={handleVerify}
          className="-mt-2  mx-5.5"
          disabled={otp.length !== 6 || loading}
          style={{
            marginTop: 20,
            padding: 12,
            width: "90%",
            background: otp.length === 6 ? "#5B3765" : "#664270", // faded color
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: otp.length === 6 ? "pointer" : "not-allowed",
            opacity: otp.length === 6 ? 1 : 0.6,
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </AppLayout>
  );
};

export default Otp;
