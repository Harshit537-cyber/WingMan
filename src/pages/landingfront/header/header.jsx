import React from "react";
// 1. Apne logo ko import karein
import myLogo from "../../../../src/assets/img7/logo.png";


export const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#5d316a", // Purple background
        height: "80px",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* WingMann Text */}
      <div
        style={{
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        WingMann
      </div>

      {/* 2. Photo (Logo) yahan lagegi */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <img
          src={myLogo}
          alt="Logo"
          style={{
            height: "80px", // Aap height apne hisaab se kam-zyada kar sakte hain
            width: "auto",
            display: "block",
          }}
        />
      </div>
    </header>
  );
};

export default Header;
