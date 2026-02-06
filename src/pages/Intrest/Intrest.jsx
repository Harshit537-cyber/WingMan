import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Updated icons to match the image variety
import {
  Book, Camera, Gamepad2, Music, Plane, Palette, Gavel, Heart,
  Utensils, PawPrint, Trophy, Shirt, Music2, Mic2, Activity,
  Theater, ShoppingCart, Compass, Leaf, Brush
} from 'lucide-react';

import AppLayout from '../../components/AppLayout/AppLayout';
import OnboardingHeader from '../../components/OnboardingHeader/OnboardingHeader';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';

import './Intrest.css';

const Intrest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState([]);

  // Updated list to match the image items
  const interests = [
    { id: 1, label: 'Reading', icon: <Book size={18} /> },
    { id: 2, label: 'Photography', icon: <Camera size={18} /> },
    { id: 3, label: 'Gaming', icon: <Gamepad2 size={18} /> },
    { id: 4, label: 'Music', icon: <Music size={18} /> },
    { id: 5, label: 'Travel', icon: <Plane size={18} /> },
    { id: 6, label: 'Painting', icon: <Palette size={18} /> },
    { id: 7, label: 'Politics', icon: <Gavel size={18} /> },
    { id: 8, label: 'Charity', icon: <Heart size={18} /> },
    { id: 9, label: 'Cooking', icon: <Utensils size={18} /> },
    { id: 10, label: 'Pets', icon: <PawPrint size={18} /> },
    { id: 11, label: 'Sports', icon: <Trophy size={18} /> },
    { id: 12, label: 'Fashion', icon: <Shirt size={18} /> },
    { id: 13, label: 'Dancing', icon: <Activity size={18} /> },
    { id: 14, label: 'Singing', icon: <Mic2 size={18} /> },
    { id: 15, label: 'Yoga', icon: <Activity size={18} /> },
    { id: 16, label: 'Fitness', icon: <Activity size={18} /> },
    { id: 17, label: 'Theatre', icon: <Theater size={18} /> },
    { id: 18, label: 'Shopping', icon: <ShoppingCart size={18} /> },
    { id: 19, label: 'Adventure', icon: <Compass size={18} /> },
    { id: 20, label: 'Gardening', icon: <Leaf size={18} /> },
    { id: 21, label: 'Arts & craft', icon: <Brush size={18} /> },
  ];

  const toggleInterest = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter(item => item !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  const handleNext = () => {
    // Ensuring we have at least 3 interests selected
    if (selected.length >= 3) {
      navigate('/About', {
        state: {
          ...location.state,
          // ✅ Converting to lowercase to match your target JSON example exactly
          interests: selected.map(item => item.toLowerCase())
        }
      });
    }
  };

  return (
    <AppLayout>
      <div className="interest-screen-container">

        {/* Background Animation Graphic */}
        <div className="bg-line-animation">
          <svg viewBox="0 0 400 600" fill="none">
            <path d="M-50,550 C100,500 350,500 350,350 C350,200 100,200 100,350 C100,450 250,500 450,450"
              stroke="#E2D8E8" strokeWidth="2" strokeDasharray="8 8" />
          </svg>
        </div>

        <div className="interest-content-wrapper">
          {/* Centered Header Section */}
          <div className="centered-header">
            <OnboardingHeader
              title="Select Up To 3 Interest"
              description="Tell us what piques your curiosity and passions"
            />
          </div>

          {/* Centered Interests Grid */}
          <div className="interests-grid slide-up-delay">
            {interests.map((item, index) => (
              <div
                key={item.id}
                className={`interest-chip ${selected.includes(item.label) ? 'selected' : ''}`}
                onClick={() => toggleInterest(item.label)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <span className="chip-icon">{item.icon}</span>
                <span className="chip-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="interest-footer-action">
          <div className="footer-wavy-decoration"></div>
          <StepProgressButton
            currentStep={13}
            totalSteps={15}
            disabled={selected.length < 3}
            onClick={handleNext}
          />
        </div>

      </div>
    </AppLayout>
  );
};

export default Intrest;