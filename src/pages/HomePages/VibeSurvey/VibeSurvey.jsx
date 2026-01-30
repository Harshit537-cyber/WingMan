import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import './VibeSurvey.css';

const VibeSurvey = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // 6 Photos as per your requirement
  const photos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400' },
    { id: 2, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { id: 3, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400' },
    { id: 4, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { id: 5, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
    { id: 6, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setSelectedPhoto(null);
    } else {
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedPhoto(null);
    } else {
      navigate(-1);
    }
  };

  const getHeaderTitle = () => step === 1 ? "Curate Your Vibe" : "Facial Attractiveness";
  const getMainHeading = () => step === 1 ? "Let Us Know Who You Are Attracted To" : "Facial Attractiveness";
  const getSubHeading = () => step === 1 ? "Choose One Photo" : "Choose Within One Photo";
  const getButtonText = () => step === 3 ? "Finish" : "Next";

  return (
    <AppLayout>
      <div className="vibe-main-container">
        
        {/* HEADER */}
        <header className="vibe-header-nav">
          <button className="vibe-back-btn" onClick={handleBack}>
            <ChevronLeft size={24} color="#000" />
          </button>
          <h1 className="vibe-nav-title">{getHeaderTitle()}</h1>
          <div className="header-right-empty"></div>
        </header>

        {/* CONTENT AREA */}
        <div className="vibe-body-scroll">
          
          <div className="vibe-info-text">
            <h2 className="vibe-h1-main">{getMainHeading()}</h2>
            <p className="vibe-p-sub">{getSubHeading()}</p>
          </div>

          <div className="vibe-photo-grid-fixed">
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className={`vibe-image-card ${selectedPhoto === photo.id ? 'vibe-selected' : ''}`}
                onClick={() => setSelectedPhoto(photo.id)}
              >
                <img src={photo.url} alt="vibe-option" />
              </div>
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <div className="vibe-footer-sticky">
          <button 
            className="vibe-btn-action" 
            disabled={!selectedPhoto}
            onClick={handleNext}
          > 
            {getButtonText()}
          </button>
        </div>

      </div>
    </AppLayout>
  );
};

export default VibeSurvey;