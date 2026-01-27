import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FullView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Gallery se aayi hui images aur starting index nikalna
  const images = location.state?.images || [];
  const initialIndex = location.state?.index || 0;

  // State to track current photo
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Wapas pehli photo par (Loop)
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1); // Wapas aakhri photo par (Loop)
    }
  };

  return (
    <div className="app-viewport-wrapper font-sans overflow-hidden">
      <div className="mobile-container-main h-[100svh] overflow-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 pt-12 pb-4 shrink-0">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-black/5 p-1 rounded-full -ml-2"
          >
            <ChevronLeft size={30} strokeWidth={2.5} className="text-black" />
          </button>
          <h1 className="text-[24px] font-bold text-black tracking-tight">
            Gallery
          </h1>
        </header>

        {/* Main Slider Content */}
        <main className="flex-1 relative px-6 pb-6 flex items-center justify-center overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 z-10 p-2 text-black active:scale-90 transition-transform"
          >
            <ChevronLeft size={40} strokeWidth={1.2} />
          </button>

          {/* Image Display */}
          <div className="w-full h-full rounded-[32px] overflow-hidden shadow-sm border border-black/5">
            <img
              key={currentIndex} // 'key' helps with smooth transition when image changes
              src={images[currentIndex]}
              alt="Full View"
              className="w-full h-full object-cover animate-in fade-in duration-300"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 z-10 p-2 text-black active:scale-90 transition-transform"
          >
            <ChevronRight size={40} strokeWidth={1.2} />
          </button>
        </main>

        <div className="h-4 shrink-0" />
      </div>
    </div>
  );
};

export default FullView;
