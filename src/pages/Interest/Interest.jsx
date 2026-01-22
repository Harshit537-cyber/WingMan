import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  Gamepad2,
  Music,
  Plane,
  Palette,
  User,
  Heart,
  UtensilsCrossed,
  Dog,
  Trophy,
  Shirt,
  Mic2,
  Clapperboard,
  ShoppingCart,
  Compass,
  Sprout,
  ArrowRight,
  Activity,
} from "lucide-react";
import "./Interest.css";

const Interest = () => {
  // Pattern according to your Figma/Image (2, 3, 2, 3...)
  const rows = [
    [
      { id: 1, label: "Reading", icon: <BookOpen size={18} /> },
      { id: 2, label: "Photography", icon: <Camera size={18} /> },
    ],
    [
      { id: 3, label: "Gaming", icon: <Gamepad2 size={18} /> },
      { id: 4, label: "Music", icon: <Music size={18} /> },
      { id: 5, label: "Travel", icon: <Plane size={18} /> },
    ],
    [
      { id: 6, label: "Painting", icon: <Palette size={18} /> },
      { id: 7, label: "Politics", icon: <User size={18} /> },
    ],
    [
      { id: 8, label: "Charity", icon: <Heart size={18} /> },
      { id: 9, label: "Cooking", icon: <UtensilsCrossed size={18} /> },
      { id: 10, label: "Pets", icon: <Dog size={18} /> },
    ],
    [
      { id: 11, label: "Sports", icon: <Activity size={18} /> },
      { id: 12, label: "Fashion", icon: <Shirt size={18} /> },
    ],
    [
      { id: 13, label: "Dancing", icon: <Activity size={18} /> },
      { id: 14, label: "Singing", icon: <Mic2 size={18} /> },
      { id: 15, label: "Yoga", icon: <Activity size={18} /> },
    ],
    [
      { id: 16, label: "Fitness", icon: <Activity size={18} /> },
      { id: 17, label: "Theatre", icon: <Clapperboard size={18} /> },
      { id: 18, label: "Shopping", icon: <ShoppingCart size={18} /> },
    ],
    [
      { id: 19, label: "Video gaming", icon: <Gamepad2 size={18} /> },
      { id: 20, label: "Adventure", icon: <Compass size={18} /> },
    ],
    [
      { id: 21, label: "Gardening", icon: <Sprout size={18} /> },
      { id: 22, label: "Arts & craft", icon: <Palette size={18} /> },
    ],
  ];

  // IDs selected based on your image
  const [selected, setSelected] = useState([1, 4, 6, 11, 13, 15, 17, 19, 22]);

  const toggleInterest = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="interest-page">
      {/* Top Bar with Time & Signal */}
      <div className="status-bar">
    
      </div>

      <button className="back-arrow-btn">
        <ArrowLeft size={26} strokeWidth={2.5} />
      </button>

      {/* Main Heading Section */}
      <div className="heading-container">
        <h1 className="main-title">Select Up To 3 Interest</h1>
        <p className="sub-title">
          Tell us what piques your curiosity and passions
        </p>
      </div>

      {/* Chips Rows */}
      <div className="all-rows-container">
        {rows.map((row, idx) => (
          <div key={idx} className="chips-row">
            {row.map((item) => (
              <button
                key={item.id}
                className={`interest-item ${selected.includes(item.id) ? "is-selected" : ""}`}
                onClick={() => toggleInterest(item.id)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Circular Progress Button */}
      <div className="bottom-nav">
        <div className="next-action-wrapper">
          <svg className="action-circle-svg" viewBox="0 0 100 100">
            <circle
              className="circle-path"
              cx="50"
              cy="50"
              r="46"
              fill="transparent"
              stroke="#5C3B6F"
              strokeWidth="2"
            />
          </svg>
          <button className="confirm-btn">
            <ArrowRight color="white" size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interest;
