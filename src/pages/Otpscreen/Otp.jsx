import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";
import OnboardingHeader from "../../components/OnboardingHeader/OnboardingHeader";
const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Enter valid OTP");
      return;
    }

    setLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      console.log("✅ OTP Verified User:", user);

      // 👉 Save user id
      localStorage.setItem("uid", user.uid);

      // 👉 Next screen
      navigate("/gender");

    } catch (error) {
      console.error("❌ OTP verify error:", error);
      alert("Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="m-auto" style={{ padding: 20 }}>
         <div className="mobile-header-section pt-2 ">
          <OnboardingHeader
            title="Enter OTP"
            description=""
          />
        </div>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          value={otp}
          className="border border-gray-200 mx-5.5"
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          style={{
            padding: 12,
            fontSize: 18,
            width: "90%",
            
          }}
        />

        <button
  onClick={handleVerify}
  className="-mt-2  mx-5.5"
  disabled={otp.length !== 6 || loading}
  style={{
    marginTop: 20,
    padding: 12,
    width: "90%",
    background: otp.length === 6 ? "#5a3c6d" : "#8B6FA8", // faded color
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
