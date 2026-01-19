import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const text = "WingMann";
  const [displayText, setDisplayText] = useState("");

  // Smooth Typewriter Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 150); // slightly faster for smoothness

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      {/* Splash Container */}
      <div className="w-full h-full sm:w-[390px] bg-[#4b3152] flex items-center justify-center animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          {/* LOGO */}
          <svg
            width="120"
            height="80"
            viewBox="0 0 100 60"
            fill="none"
            className="text-white logo-draw"
          >
            <path
              d="M20 40C20 20 35 20 35 40C35 60 50 60 50 40C50 20 65 20 65 40C65 60 80 60 80 40"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* TYPEWRITER TEXT WITHOUT CURSOR */}
          <h1 className="text-4xl font-semibold tracking-wider text-white font-sans transition-all duration-200 ease-in-out">
            {displayText}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
