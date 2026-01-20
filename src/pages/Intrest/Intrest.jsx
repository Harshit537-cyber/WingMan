import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
// Icons ke naam update kiye hain jo stable hain
import { 
  ArrowLeft, Book, Camera, Gamepad2, Music, Plane, 
  Palette, Gavel, Heart, Utensils, PawPrint, Trophy, Shirt 
} from 'lucide-react';
import StepProgressButton from '../../components/StepProgressButton/StepProgressButton';
import './Intrest.css';

const Intrest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState([]);

  // Icons list updated
  const interests = [
    { id: 1, label: 'Reading', icon: <Book size={18} /> },
    { id: 2, label: 'Photography', icon: <Camera size={18} /> },
    { id: 3, label: 'Gaming', icon: <Gamepad2 size={18} /> },
    { id: 4, label: 'Music', icon: <Music size={18} /> },
    { id: 5, label: 'Travel', icon: <Plane size={18} /> },
    { id: 6, label: 'Painting', icon: <Palette size={18} /> },
    { id: 7, label: 'Politics', icon: <Gavel size={18} /> }, // Scale ki jagah Gavel
    { id: 8, label: 'Charity', icon: <Heart size={18} /> },
    { id: 9, label: 'Cooking', icon: <Utensils size={18} /> },
    { id: 10, label: 'Pets', icon: <PawPrint size={18} /> },
    { id: 11, label: 'Sports', icon: <Trophy size={18} /> }, // Basketball ki jagah Trophy
    { id: 12, label: 'Fashion', icon: <Shirt size={18} /> },
  ];

  const toggleInterest = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter(item => item !== label));
    } else {
      // Limit to 3 only
      if (selected.length < 3) {
        setSelected([...selected, label]);
      }
    }
  };

  const handleNext = () => {
    navigate('/Acesslocation', { 
      state: { ...location.state, interests: selected } 
    });
  };

  return (
    <div className="interest-container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={28} />
        </button>
      </div>

      <div className="content-wrapper">
        <h1 className="title slide-in-top">Select Up To 3 Interest</h1>
        <p className="subtitle fade-in">Tell us what piques your curiosity and passions</p>

        <div className="interests-grid">
          {interests.map((item, index) => (
            <div 
              key={item.id}
              className={`interest-chip pop-in ${selected.includes(item.label) ? 'selected' : ''}`}
              onClick={() => toggleInterest(item.label)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="chip-icon">{item.icon}</span>
              <span className="chip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button Step 5 of 20 */}
      <StepProgressButton 
        currentStep={5} 
        totalSteps={20} 
        disabled={selected.length < 3} 
        onClick={handleNext} 
      />
    </div>
  );
};

export default Intrest;