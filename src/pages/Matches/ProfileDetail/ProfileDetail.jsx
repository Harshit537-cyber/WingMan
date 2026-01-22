import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Phone, Globe, PersonStanding, 
  Moon, Wine, Cigarette, Languages, Accessibility, 
  Film, Coffee, X, PhoneCall 
} from 'lucide-react';
import AppLayout from '../../../components/AppLayout/AppLayout';
import BottomNav from '../../../components/BottomNav/BottomNav';
import profileHero from '../../../assets/match-profile.jpg'; 
import './ProfileDetail.css';

const ProfileDetail = () => {
  const navigate = useNavigate();
  const [showCallModal, setShowCallModal] = useState(false);

  // Background scroll lock
  useEffect(() => {
    if (showCallModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCallModal]);

  const openModal = () => setShowCallModal(true);
  const closeModal = () => setShowCallModal(false);
  const handleGalleryClick = () => navigate('/gallery-preview'); // Dummy route

  return (
    <AppLayout>
      <div className="detail-main-container">
        
        {/* HERO SECTION */}
        <div className="hero-section">
          <img src={profileHero} alt="Jessica" className="hero-img" />
          <button className="top-back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#5a3c6d" />
          </button>
          <button className="top-fav-heart">
            <Heart size={28} color="#fff" />
          </button>
          <div className="hero-compat-badge">90% Compatible</div>
        </div>

        <div className={`detail-scroll-content ${showCallModal ? 'blur-content' : ''}`}>
          
          {/* INTRO & CALL TRIGGER */}
          <div className="profile-intro-row">
            <div className="intro-text">
              <h1 className="user-name-age">Jessica Parker, 23</h1>
              <p className="user-profession">Software Developer</p>
            </div>
            <button className="call-action-square" onClick={openModal}>
              <Phone size={24} color="#5a3c6d" fill="#5a3c6d" />
            </button>
          </div>

          <div className="info-block">
            <div className="block-header">
              <h3 className="block-title">Location</h3>
              <span className="dist-badge">1 km</span>
            </div>
            <p className="block-desc">Chicago, IL United States</p>
          </div>

          <div className="info-block">
            <h3 className="block-title">About me</h3>
            <div className="chips-grid">
              <div className="info-chip"><Globe size={16} /> Bengaluru, India</div>
              <div className="info-chip"><PersonStanding size={16} /> Regularly</div>
              <div className="info-chip"><Moon size={16} /> Hindu</div>
              <div className="info-chip"><Wine size={16} /> ocasionally</div>
              <div className="info-chip"><Cigarette size={16} /> Rarely</div>
              <div className="info-chip"><Languages size={16} /> English</div>
            </div>
          </div>

          <div className="info-block">
            <h3 className="block-title">My Story</h3>
            <p className="story-text">
              My name is Jessica Parker and I enjoy meeting new people... 
              <span className="read-more">Read more</span>
            </p>
          </div>

          <div className="info-block">
            <h3 className="block-title">Interests</h3>
            <div className="chips-grid">
              <div className="interest-chip"><Accessibility size={16} color="#f1c40f" /> Yoga</div>
              <div className="interest-chip"><Film size={16} /> Film lover</div>
              <div className="interest-chip"><Coffee size={16} color="#d35400" /> Matcha</div>
            </div>
          </div>

          {/* GALLERY SECTION (CLICKABLE) */}
          <div className="gallery-section">
            <div className="block-header">
              <h3 className="block-title">Gallery</h3>
              <span className="see-all" onClick={handleGalleryClick}>See all</span>
            </div>
            <div className="gallery-grid">
              <div className="gal-big clickable" onClick={handleGalleryClick}><img src={profileHero} alt="g1" /></div>
              <div className="gal-big clickable" onClick={handleGalleryClick}><img src={profileHero} alt="g2" /></div>
              <div className="gal-small clickable" onClick={handleGalleryClick}><img src={profileHero} alt="g3" /></div>
              <div className="gal-small clickable" onClick={handleGalleryClick}><img src={profileHero} alt="g4" /></div>
              <div className="gal-small clickable" onClick={handleGalleryClick}><img src={profileHero} alt="g5" /></div>
            </div>
          </div>

          {/* REQUEST BUTTON (CALL TRIGGER) */}
          <div className="request-btn-container">
            <button className="request-btn" onClick={openModal}>Request For Call</button>
          </div>

          <div className="footer-spacer"></div>
        </div>

        <BottomNav />

        {/* REQUEST FOR CALL MODAL */}
        {showCallModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content slide-up-modal" onClick={(e) => e.stopPropagation()}>
              
              <button className="modal-close-x" onClick={closeModal}>
                <X size={24} color="#5a3c6d" />
              </button>

              <div className="modal-inner">
                <div className="call-icon-illustration">
                   <PhoneCall size={60} color="#4A90E2" strokeWidth={1.5} />
                </div>

                <h2 className="modal-title">Request for a call</h2>
                <p className="modal-subtitle">
                  For safety reasons we suggest not to share personal information too early. Don't rush trust.
                </p>

                <button className="modal-primary-btn" onClick={closeModal}>
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ProfileDetail;