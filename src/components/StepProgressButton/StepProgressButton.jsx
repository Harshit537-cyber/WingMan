import React, { useState, useEffect } from "react";
import "./StepProgressButton.css";

const StepProgressButton = ({
  currentStep = 0,
  totalSteps = 10,
  disabled,
  onClick,
  resetKey,
}) => {
  const [hasClicked, setHasClicked] = useState(false);

  const progressPercent = (currentStep / totalSteps) * 100;

  const handleClick = async () => {
    if (disabled || hasClicked) return;

    setHasClicked(true);

    try {
      await onClick();
    } finally {
      setHasClicked(false); // ✅ allow re-click
      console.log("✅ Button clicked, executing onClick handler");
    }
  };
  // 🔥 RESET button when question changes
  useEffect(() => {
    setHasClicked(false);
  }, [resetKey]);

  // 🔑 ENTER KEY SUPPORT (AS REQUESTED — NOT REMOVED)
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [hasClicked, disabled]);

  return (
    <div className={`step-btn-container ${disabled ? "opacity-50" : ""}`}>
      <div className="outer-card-wrapper">
        <svg className="progress-svg" viewBox="0 0 65.45 65.45">
          <circle
            cx="32.725"
            cy="32.725"
            r="30.725"
            fill="none"
            stroke="#FFEDF5"
            strokeWidth="4"
          />
          <circle
            cx="32.725"
            cy="32.725"
            r="30.725"
            fill="none"
            stroke="#5B3765"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            style={{
              strokeDashoffset: 100 - progressPercent,
              transition: "stroke-dashoffset 0.5s ease-in-out",
            }}
            transform="rotate(-90 32.725 32.725)"
          />
        </svg>

        <button
          className="inner-card-btn"
          onClick={handleClick}
          disabled={disabled || hasClicked}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepProgressButton;
