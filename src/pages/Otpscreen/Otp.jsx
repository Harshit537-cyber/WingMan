import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../../components/AppLayout/AppLayout";

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
      <div style={{ padding: 20 }}>
        <h2>Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          style={{
            padding: 12,
            fontSize: 18,
            width: "100%",
            marginTop: 20,
          }}
        />

        <button
          onClick={handleVerify}
          style={{
            marginTop: 20,
            padding: 12,
            width: "100%",
            background: "#6c47ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </AppLayout>
  );
};

export default Otp;
