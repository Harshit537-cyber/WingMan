import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import profileHero from '../../../assets/match-profile.jpg'; 
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

  // Mock array for images (Asli app mein yahan URLs honge)
  const galleryImages = [profileHero, profileHero, profileHero, profileHero, profileHero, profileHero];

  const handlePhotoClick = (index) => {
    // Index bhej rahe hain state mein
    navigate('/FullView', { state: { index, images: galleryImages } }); 
  };

  return (
    <AppLayout>
      <div className="gallery-page-container">
        <header className="gallery-header">
          <button className="back-btn-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#000" strokeWidth={2.5} />
          </button>
          <h1 className="gallery-page-title">Gallery</h1>
        </header>

        <div className="gallery-scroll-area slide-up">
          <div className="photos-grid">
            {galleryImages.map((imgSrc, index) => (
              <div 
                key={index} 
                className="photo-card" 
                onClick={() => handlePhotoClick(index)}
              >
                <div className="photo-inner">
                  <img src={imgSrc} alt={`Gallery ${index}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="footer-spacer-small"></div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Gallery;