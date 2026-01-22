import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import profileHero from '../../../assets/match-profile.jpg'; // Using the same image for dummy
import './Gallery.css';

const Gallery = () => {
  const navigate = useNavigate();

  // Mock array for 6 gallery images
  const galleryImages = [1, 2, 3, 4, 5, 6];

  const handlePhotoClick = (id) => {
    console.log(`Photo ${id} clicked`);
    // navigate(`/photo-view/${id}`); // Dummy route
  };

  return (
    <AppLayout>
      <div className="gallery-page-container">
        
        {/* HEADER */}
        <header className="gallery-header">
          <button className="back-btn-circle" onClick={() => navigate(-1)}>
            <ChevronLeft size={30} color="#000" strokeWidth={2.5} />
          </button>
          <h1 className="gallery-page-title">Gallery</h1>
        </header>

        {/* SCROLLABLE GRID */}
        <div className="gallery-scroll-area slide-up">
          <div className="photos-grid">
            {galleryImages.map((item) => (
              <div 
                key={item} 
                className="photo-card" 
                onClick={() => handlePhotoClick(item)}
              >
                <div className="photo-inner">
                  <img src={profileHero} alt={`Gallery ${item}`} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom spacer for clean look */}
          <div className="footer-spacer-small"></div>
        </div>

      </div>
    </AppLayout>
  );
};

export default Gallery;